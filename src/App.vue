<template>
  <div id="app">
    <nav-bar />
    <transition name="fade">
      <router-view class="view"/>
    </transition>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-y: scroll;
  margin: 0;
  padding-top: 60px;
  background-color: #fff;
  min-height: 100vh;
}

a {
  color: #2b2b2b;
  text-decoration: none;

  &:not(.disabled):hover {
    color: green;
    text-decoration: underline;
  }
}

.view {
  max-width: 800px;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 250ms ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
