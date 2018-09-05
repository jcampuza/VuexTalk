<template>
  <div>User</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("FETCH_USER", { id: this.$route.params.id });
  }
};
</script>

<style>
</style>
