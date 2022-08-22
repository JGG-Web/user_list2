<template>
  <div id="app">
    <header></header>
    <main>
      <MyList></MyList>
    </main>
  </div>
</template>

<script>
import MyList from './components/MyList.vue'

export default {
  name: 'App',
  components: {
    MyList
  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}

header {
  width: 100%;
  height: 100px;
  background-color: #ececec;
}

main {
  width: 80%;
  margin: 40px auto;
}
</style>
