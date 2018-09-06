<template>
  <header class="navigation">
    <router-link to="/" tag="h1" exact>Hacker Vuex</router-link>
    <router-link to="/top">Top</router-link>
    <router-link to="/new">New</router-link>
    <router-link to="/best">Best</router-link>
    <router-link to="/ask">Ask</router-link>
    <router-link to="/show">Show</router-link>
    <router-link to="/job">Jobs</router-link>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  z-index: 9;
  background-color: #42b983;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 1px #aaa;
  padding: 0 1rem;
}

.navigation h1 {
  color: #fff;
  margin-right: 1.5rem;
  cursor: pointer;
}

.navigation a {
  transition: color 200ms ease-out;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }

  color: #dfdfdf;
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }

  &.router-link-active {
    color: #ffffff;
    font-weight: 600;
  }
}

.navigation__title {
  color: #fff;
  font-size: 1.2rem;
}
</style>
