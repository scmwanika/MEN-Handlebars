import axios from 'axios';

const api = 'http://localhost:3000';

export default ({
  // STATE
  state: {
    guests: [],
  },

  // GETTERS
  getters: {
    guestList: (state) => state.guests,
  },

  // MUTATIONS
  mutations: {
    // insert guest
    INSERT_GUEST(state, guest) {
      state.guests.unshift(guest);
    },
    // list guests
    LIST_GUESTS(state, guests) {
      state.guests = guests;
    },
    // insert error
    INSERT_ERROR(state, error) {
      state.errors.push(error);
    },
  },

  // ACTIONS
  actions: {
    // insert guest
    async insertGuest({ commit }, guest) {
      // make some kind of ajax request
      try {
        // await doAjaxRequest(payload);

        // commit mutation in an action
        commit('INSERT_GUEST', guest);
      } catch (error) {
        commit('INSERT_ERROR', error);
      }
    },

    // list guests
    async listGuests({ commit }) {
      const response = await axios.get(`${api}/guests`);
      commit('LIST_GUESTS', response.data);
    },

    // remove guest
    async removeGuest({ commit }, id) {
      try {
        await axios.get(`${api}/delete-guest/${id}`);
        commit('REMOVE_GUEST', id);
      } catch (error) {
        commit('INSERT_ERROR', error);
      }
    },
  },
});
