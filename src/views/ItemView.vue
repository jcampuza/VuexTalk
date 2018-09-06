<template>
  <div v-if="loading">Loading</div>
  <div v-else class="item-view">
    <div class="header">
      <h3 class="title"><a rel="noopener" target="blank" :href="item.url" class="title__link">{{item.title}}</a></h3>
      <p>{{item.score}} points | Created by <router-link :to="'/item/' + item.by">{{item.by}}</router-link> {{ item.time | timeAgo }} ago</p>
    </div>

    <div class="comments">
      <p class="comments-header">{{ commentText }}</p>
      <ul class="comments-list">
        <comment v-for="id of item.kids" :key="id" :id="id" />
      </ul>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";

export default {
  components: {
    Comment
  },

  data() {
    return {
      loading: true
    };
  },

  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id];
    },

    commentText() {
      if (!this.item) return "No Comments Found";

      if (this.item.kids) return `${this.item.descendants} Comments`;

      return "No comments yet";
    }
  },

  async created() {
    this.loading = true;
    const id = this.$route.params.id;
    await this.$store.dispatch("FETCH_ITEMS", { ids: [id] });

    if (this.item) {
      await this.$store.dispatch("FETCH_NESTED_ITEMS", { item: this.item });
    }

    this.loading = false;
  },

  methods: {}
};
</script>

<style scoped lang="scss">
.item-view {
  margin-top: 1rem;
  margin-bottom: 2rem;
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

.comments {
  margin-top: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.32);
  border-radius: 2px;
}

.comments-header {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem;
}

@media (max-width: 800px) {
  .item-view {
    margin-top: 0;
    margin-bottom: 0;
    box-shadow: none;
  }

  .header,
  .comments {
    box-shadow: none;
  }

  .comments {
    margin-top: 0;
  }
}
</style>
