import ItemList from "./ItemList.vue";

export default function createListView(type = "") {
  return {
    name: `${type}-list-view`,
    render() {
      return <ItemList type={type} />;
    },

    title() {
      return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
}
