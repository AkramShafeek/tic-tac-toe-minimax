<template>
  <MainLayout />
</template>

<script>
import MainLayout from '@/layout/MainLayout'
export default {
  name: 'App',
  components: {
    MainLayout,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;  
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>
