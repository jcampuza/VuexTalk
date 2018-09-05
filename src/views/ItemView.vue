<template>
  <div v-if="loading">Loading</div>
  <div v-else class="item-view">
    <div class="header">
      <h3 class="title"><a rel="noopener" target="blank" :href="item.url" class="title__link">{{item.title}}</a></h3>
      <p>{{item.score}} points | Created by <router-link :to="'/item/' + item.by">{{item.by}}</router-link> {{ item.time | timeAgo }} ago</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },

  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id];
    }
  },

  async created() {
    this.loading = true;
    const id = this.$route.params.id;
    await this.$store.dispatch("FETCH_ITEMS", { ids: [id] });
    this.loading = false;
  }
};
</script>

<style scoped lang="scss">
.item-view {
  margin-top: 2rem;
}

.header {
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.32);
  border-radius: 2px;
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
</style>
