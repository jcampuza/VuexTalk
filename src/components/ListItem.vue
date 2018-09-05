<template>
  <li class="item">
    <span class="score">{{item.score}}</span>
    <div class="details">
      <div class="title">
        <template v-if="item.url">
          <a rel="noopener" target="blank" :href="item.url" class="title__link">{{item.title}}</a>
          <span>&nbsp;</span>
          <span class="host">({{ item.url | host }})</span>
        </template>
        <template v-else>
          <router-link :to="itemLink">{{item.title}}</router-link>
        </template>
      </div>
      <div class="info">
        Created by <router-link :to="'/users/' + item.by">{{item.by}}</router-link>
        <span> {{ item.time | timeAgo }} ago</span>
        | <router-link :to="itemLink">{{commentsText}}</router-link>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    itemLink() {
      return `/item/${this.item.id}`;
    },

    commentsText() {
      if (this.item.descendants) {
        return `${this.item.descendants} comments`;
      } else {
        return "discuss";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  display: flex;
  padding: 1.5rem 0;
  align-items: center;
}

.item a {
  color: #2b2b2b;
  text-decoration: none;

  &:hover {
    color: green;
    text-decoration: underline;
  }
}

.item:not(:last-child) {
  border-bottom: 1px solid #ccc;
}

.item .title {
  margin-bottom: 0.25rem;
}

.item .title__link {
  /* font-size: 1.2rem; */
  color: #1a1a1a;
  font-weight: 600;
}

.item .score {
  font-size: 1.5rem;
  text-align: center;
  color: green;
  font-weight: 600;
  width: 80px;
}

.item .info {
  opacity: 0.75;
}
</style>
