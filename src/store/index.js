import Vue from "vue";
import Vuex from "vuex";
import { fetchListType, fetchItems, fetchUser } from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: {},
    users: {},
    active: null,
    maxPageSize: 20,
    lists: {
      top: [],
      new: [],
      best: [],
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
    },

    SET_ACTIVE_TYPE: (state, { type }) => {
      state.active = type;
    },

    SET_USER: (state, { user, id }) => {
      Vue.set(state.users, id, user || false);
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
      commit("SET_ACTIVE_TYPE", { type });
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
    },

    FETCH_NESTED_ITEMS: async ({ commit, dispatch }, { item }) => {
      if (item && item.kids) {
        const items = await fetchItems(item.kids);
        commit("SET_ITEMS", { items });
        return Promise.all(
          items.map(item => dispatch("FETCH_NESTED_ITEMS", { item }))
        );
      }
    },

    FETCH_USER: async ({ commit, state }, { id }) => {
      if (state.users[id]) {
        return state.users[id];
      }

      const user = await fetchUser(id);
      commit("SET_USER", { id, user });
    }
  }
});
