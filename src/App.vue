<template>
<!-- 文件入口 -->
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
 
export default {
  name: "App",  
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  },
  mounted() {}
};
</script>

<style lang="sass" scoped>
  #app
    width: 100%
    height: 100%
    overflow: auto
</style>
