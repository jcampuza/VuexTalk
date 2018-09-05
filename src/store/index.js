import Vue from "vue";
import Vuex from "vuex";
import { fetchListType, fetchItems } from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: {},
    active: "top",
    maxPageSize: 20,
    lists: {
      top: [],
      new: [],
      ask: [],
      show: [],
      job: []
    }
  },
  mutations: {
    SET_IDS: (state, { ids, type }) => {
      state.lists[type] = ids;
    },

    SET_ITEMS: (state, { items }) => {
      for (const item of items) {
        if (!item) continue;

        Vue.set(state.items, item.id, item);
      }
    }
  },
  getters: {
    activeItemIds(state) {
      const { active, maxPageSize, lists } = state;

      if (!active) {
        return [];
      }

      const page = Number(state.route.params.page) || 1;
      const start = (page - 1) * maxPageSize;
      const end = page * maxPageSize;

      return lists[active].slice(start, end);
    },

    activeItems(state, getters) {
      return getters.activeItemIds.map(id => state.items[id]).filter(Boolean);
    }
  },
  actions: {
    FETCH_BY_TYPE: async ({ commit, dispatch }, { type }) => {
      const ids = await fetchListType(type);
      commit("SET_IDS", { ids, type });
      return dispatch("FETCH_ACTIVE_ITEMS");
    },

    FETCH_ACTIVE_ITEMS: ({ getters, dispatch }) => {
      return dispatch("FETCH_ITEMS", {
        ids: getters.activeItemIds
      });
    },

    FETCH_ITEMS: async ({ commit, state }, { ids }) => {
      const itemsToFetch = ids.filter(id => {
        if (state.items[id]) return false;
        return true;
      });

      const items = await fetchItems(itemsToFetch);
      commit("SET_ITEMS", { items });
    }
  }
});
