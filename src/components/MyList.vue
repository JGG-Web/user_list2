<template>
    <div class="mylist" style="position: relative">
        <el-row>
            <el-button type="success" @click="addBtn">新建</el-button>
            <el-input v-model="keyword" placeholder="按关键字搜索" class="inputer"></el-input>
            <el-button type="warning" class="back" style="position: absolute; right:0">撤销</el-button>
        </el-row>

        <!-- 表格 -->
        <el-table :data="tableData.filter(data => !keyword || data.name.toLowerCase().includes(keyword.toLowerCase()))"
            style="width: 100%" :border="true" stripe :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ 'text-align': 'center' }" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>

            <el-table-column prop="age" label="年龄" width="120">
            </el-table-column>

            <el-table-column prop="sex" label="性别" width="120">
            </el-table-column>

            <el-table-column prop="phoneNumber" label="联系电话" width="120">
            </el-table-column>

            <el-table-column prop="address" label="详细地址" show-overflow-tooltip>
            </el-table-column>

            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row, scope.$index)">
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.$index)"></el-button>
                </template>
            </el-table-column>



        </el-table>

        <el-row>
            <el-button type="danger" @click="delAll">批量删除</el-button>
        </el-row>

        <!--添加用户对话框-->
        <el-dialog title="新建/编辑用户" :visible.sync="addDialogVisible" width="40%">
            <div>
                <el-form ref="form" :model="formAdd" label-width="69px">
                    <el-form-item label="姓名">
                        <el-input v-model="formAdd.name" class="input-m" placeholder="请输入姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="年龄">
                        <el-input v-model="formAdd.age" class="input-m" placeholder="请输入年龄"></el-input>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-select v-model="formAdd.sex" placeholder="请选择性别" style="width: 250px">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="号码">
                        <el-input v-model="formAdd.phoneNumber" class="input-m" placeholder="请输入正确电话号码"></el-input>
                    </el-form-item>

                    <el-form-item label="详细地址" label-width=“120px”>
                        <!-- <el-cascader v-model="formAdd.address.simpleAdd" :options="options"
                            :props="{ expandTrigger: 'hover' }">
                        </el-cascader> -->
                        <el-input v-model="formAdd.address" placeholder="请输入详细地址" class="input-m"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">保存</el-button>
            </span>
        </el-dialog>
        <!--编辑对话框 -->
        <el-dialog title="新建/编辑用户" :visible.sync="editDialogVisible" width="40%">
            <div>
                <el-form ref="form" :model="formEdit" label-width="69px">
                    <el-form-item label="姓名">
                        <el-input v-model="formEdit.name" class="input-m" placeholder="请输入姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="年龄">
                        <el-input v-model="formEdit.age" class="input-m" placeholder="请输入年龄"></el-input>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-select v-model="formEdit.sex" placeholder="请选择性别" style="width: 250px">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="号码">
                        <el-input v-model="formEdit.phoneNumber" class="input-m" placeholder="请输入正确电话号码"></el-input>
                    </el-form-item>

                    <el-form-item label="详细地址" label-width=“120px”>
                        <!-- <el-cascader v-model="formEdit.address.simpleAdd" :options="options"
                            :props="{ expandTrigger: 'hover' }">
                        </el-cascader> -->
                        <el-input v-model="formEdit.address" placeholder="请输入详细地址" class="input-m"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">保存</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>



//   本人  陆明君   联系电话  18269641661    求职  前端开发实习岗位





import Vue from 'vue'
import { MessageBox } from 'element-ui'

export default {
    name: 'MyList',
    data() {
        return {
            keyword: '',
            // tableData: [
            //     { id: '001', name: '张三', age: 18, sex: '男', phoneNumber: '13269641661', address: '四川省成都市武侯区' },
            //     { id: '002', name: '李四', age: 19, sex: '女', phoneNumber: '13265321661', address: '北京市朝阳区' },
            //     { id: '003', name: '王五', age: 20, sex: '女', phoneNumber: '13269746211', address: '上海市黄浦区' },
            //     { id: '004', name: '赵六', age: 21, sex: '男', phoneNumber: '17569649261', address: '广东省广州市天河区' }
            // ],
            tableData: JSON.parse(localStorage.getItem('tableData')) || [],
            formAdd: {
                // 表单姓名
                name: '',
                // 表单年龄
                age: '',
                // 表单性别
                sex: '',
                // 表单联系电话
                phoneNumber: '',
                // 表单地址
                address: ''
            },
            // 添加用户对话框
            addDialogVisible: false,
            // 编辑对话框
            editDialogVisible: false,
            // 编辑表单
            formEdit: {
                name: '',
                age: '',
                sex: '',
                phoneNumber: '',
                address: ''
            },
            userIndex: 0,
            options: [
                {
                    value: 'guangdong',
                    label: '广东省',
                    children: [{
                        value: 'guangzhou',
                        label: '广州市',
                        children: [{
                            value: 'panyu',
                            label: '番禺区'
                        }, {
                            value: 'yuexiu',
                            label: '越秀区'
                        }, {
                            value: 'huadu',
                            label: '花都区'
                        }, {
                            value: 'haizhu',
                            label: '海珠区'
                        }, {
                            value: 'tianhe',
                            label: '天河区'
                        }]
                    }]
                }
            ],
            // 存储选中的用户
            sels: []
        }
    },
    methods: {
        // 弹出对话框
        addBtn() {
            this.addDialogVisible = true
        },
        // 增添
        add() {
            if (!this.formAdd.name) {
                this.$message({
                    message: '请输入姓名',
                    type: 'warning'
                })
                return
            }
            if (!this.formAdd.age) {
                this.$message({
                    message: '请输入年龄',
                    type: 'warning'
                })
                return
            }
            if (!this.formAdd.sex) {
                this.$message({
                    message: '请选择性别',
                    type: 'warning'
                })
                return
            }
            if (!/^1[3456789]\d{9}$/.test(this.formAdd.phoneNumber)) {
                this.$message({
                    message: '请输入正确的号码',
                    type: 'warning'
                })
                return
            }
            if (!this.formAdd.address) {
                this.$message({
                    message: '请输入地址',
                    type: 'warning'
                });
                return;
            }
            this.tableData.push(this.formAdd)
            this.$message({
                message: '添加/修改用户成功!',
                type: 'success'
            })
            this.formAdd = {}
            //关闭对话框
            this.addDialogVisible = false

        },
        // 删除
        del(index) {
            MessageBox.confirm('此操作将永久删除该表单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData.splice(index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        // 修改
        edit(item, index) {
            this.editDialogVisible = true
            this.userIndex = index
            this.formEdit = {
                name: item.name,
                age: item.age,
                sex: item.sex,
                phoneNumber: item.phoneNumber,
                address: item.address
            }
        },
        confirm() {
            this.editDialogVisible = false
            Vue.set(this.tableData, this.userIndex, this.formEdit)
            this.$message({
                type: 'success',
                message: '修改成功!'
            })
        },
        handleSelectionChange(sels) {
            this.sels = sels
            // console.log("选中的值", sels.map(item => item.id))
        },
        delAll() {
        }

    },
    watch: {
        tableData: {
            deep: true,
            handler(value) {
                localStorage.setItem('tableData', JSON.stringify(value))
            }
        }

    }
}
</script>

<style scoped>
.inputer {
    width: 350px !important;
    margin-left: 20px !important;
}


.input-m {
    width: 250px !important;
}
</style>