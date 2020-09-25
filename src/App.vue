<template>
  <div id="app">
    <div class="page d">
      <h1 class="banner">.Hack 💚 Vue</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
.page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.banner {
  font-size: 4em;
  animation: float 2s ease-in-out infinite alternate;
}
</style>
