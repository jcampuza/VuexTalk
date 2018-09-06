<template>
  <div class="user-view">
    <template v-if="user">
      <h1>User: {{user.id}}</h1>

      <ul class="details">
        <li>Created: {{ user.created | timeAgo }} ago</li>
        <li>Karma: {{ user.karma }}</li>
      </ul>

      <div class="about">
        <p v-html="user.about"></p>
      </div>
    </template>
    <template v-else>
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("FETCH_USER", { id: this.$route.params.id });
  },

  computed: {
    user() {
      return this.$store.state.users[this.$route.params.id];
    }
  }
};
</script>

<style lang="scss" scoped>
.user-view {
  margin-top: 2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.32);
  padding: 1.5rem;
  border-radius: 2px;

  h1 {
    font-size: 1.4rem;
    font-weight: 600;
  }

  .details {
    margin: 1rem 0;
  }

  .about {
  }
}
</style>
