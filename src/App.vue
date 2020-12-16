<template>
  <div id="app">
    <div id="nav">
      <button @click="go()">返回到主系统主页</button>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { qkObj} from '@/store/common'
  export default {
    setup() {
      const go = () => {
        qkObj.routeObj.push('/apps')
        //window.history.pushState(null, '/apps', '/apps')  //主页路由
      }
      return {
        go
      }
    }
  }
</script>


<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
