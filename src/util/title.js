function getTitle(vm) {
  const { title } = vm.$options;
  if (!title) return;
  return typeof title === "function" ? title.call(vm) : title;
}

const titleMixin = {
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = `Hacker Vuex | ${title}`;
    }
  }
};

export default titleMixin;
