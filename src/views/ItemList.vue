<template>
  <div>
    <div class="pagination">
      <router-link v-if="page > 1" :to="`/${type}/${(page - 1)}`">&lt; Prev </router-link>
      <a v-else class="disabled">&lt; Prev</a>
      <span>{{page}} / {{maxPage}}</span>
      <router-link v-if="page < maxPage" :to="`/${type}/${(page + 1)}`">Next &gt;</router-link>
      <a v-else class="disabled">Next &gt;</a>
    </div>
    <transition :name="transition">
      <ul class="items" v-if="currentPage > 0" :key="currentPage">
        <list-item :item="item" v-for="item of currentItems" :key="item.id"/>
      </ul>
    </transition>
  </div>

</template>

<script>
import ListItem from "@/components/ListItem.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  components: {
    ListItem,
    Spinner
  },
  name: "top-stories-view",
  props: ["type"],
  data() {
    return {
      transition: "slide-left",
      currentPage: Number(this.$route.params.page) || 1,
      currentItems: this.$store.getters.activeItems
    };
  },
  created() {
    this.loadItems(this.page);
  },

  computed: {
    activeItems() {
      return this.$store.getters.activeItems;
    },

    page() {
      return Number(this.$route.params.page) || 1;
    },

    maxPage() {
      const { maxPageSize, lists } = this.$store.state;
      return Math.ceil(lists[this.type].length / maxPageSize);
    }
  },

  watch: {
    page(to, from) {
      this.loadItems(to, from);
    }
  },

  methods: {
    async loadItems(to, from = -1) {
      await this.$store.dispatch("FETCH_BY_TYPE", { type: this.type });
      if (this.page < 0 || this.page > this.maxPage) {
        this.$router.replace(`${this.type}/1`);
        return;
      }

      this.transition = to > from ? "slide-left" : "slide-right";
      this.currentPage = to;
      this.currentItems = this.$store.getters.activeItems;
    }
  }
};
</script>

<style scoped lang="scss">
.items {
  margin-top: calc(40px + 2rem);
  margin-bottom: 2rem;
  background-color: #fcfcfc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.42);
  transition: all 200ms ease-out;
}

.pagination {
  position: fixed;
  z-index: 9;
  top: 60px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  text-align: center;
  margin: 0 auto;
  background-color: #eee;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.33);

  a {
    margin: 0 1rem;
  }

  .disabled {
    color: #999;
  }
}

.slide-left-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to,
.slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}

@media (max-width: 800px) {
  .items {
    margin-top: 40px;
    margin-bottom: 0;
  }
}
</style>
