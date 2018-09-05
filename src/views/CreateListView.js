import ItemList from "./ItemList.vue";

export default function createListView(type) {
  return {
    name: `${type}-list-view`,
    render() {
      return <ItemList type={type} />;
    }
  };
}
