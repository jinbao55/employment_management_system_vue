<template>
  <div id="app">
    <router-view v-if="isShow"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    // 父组件中通过provide来提供变量，在子组件中通过inject接受
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    reload() {
      // reload方法首先将isShow设置为false，将router-view通过if判断取消
      this.isShow = false
      // Vue.nextTick用于延迟执行一段代码，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象。
      this.$nextTick(function() {
        // 在页面更新后再将isShow设置为true
        this.isShow = true
      })
    }
  }
}
</script>

<style>
html,
body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    widows: 100%;
    height: 100%;
}
</style>
