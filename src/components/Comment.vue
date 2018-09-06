<template>
  <li class="comment" v-if="comment">
    <template v-if="comment.deleted">
      <div class="comment-header">
        <span>deleted {{comment.time | timeAgo }} ago</span>
      </div>
    </template>

    <template v-else>
      <div class="comment-header">
        <router-link :to="`/user/${comment.by}`">{{comment.by}}</router-link>
        <span> {{comment.time | timeAgo }} ago</span>
      </div>

      <p class="comment-body" v-html="comment.text" />
      <div class="comment-toggle" :class="{ isOpen }" v-if="comment.kids">
        <a @click="toggleOpen">{{isOpen ? '[-]' : `[+] ${comment.kids.length} comments hidden`}}</a>
      </div>

      <ul class="comment-nest" v-if="comment.kids" v-show="isOpen">
        <comment v-for="id of comment.kids" :key="id" :id="id" />
      </ul>
    </template>
  </li>
</template>

<script>
export default {
  name: "comment",
  props: ["id"],
  data() {
    return {
      isOpen: true
    };
  },
  computed: {
    comment() {
      return this.$store.state.items[this.id];
    }
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  border-top: 1px solid #ccc;

  .comment-nest {
    margin-left: 1.5rem;
  }

  .comment-body {
    overflow-wrap: break-word;
    margin: 1rem 0;
  }

  .comment-toggle {
    margin: 1rem 0;
    padding: 0.5rem;
    background-color: rgba(41, 199, 41, 0.1);

    &.isOpen {
      padding: 0;
      background-color: transparent;
      margin-bottom: -0.5rem;
    }

    a {
      cursor: pointer;
    }
  }

  .comment-header {
    margin: 1rem 0;
    font-size: 0.9rem;

    a {
      text-decoration: underline;
    }
  }
}
</style>
