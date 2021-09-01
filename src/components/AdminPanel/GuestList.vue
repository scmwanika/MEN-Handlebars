<template>
  <div>
    <!-- FILTER GUESTS (search by name or checkin) -->
    <div class="search-wrapper">
      <input
        type="text"
        v-model="search"
        placeholder="Search Guest By Name or Checkin"
      />
      <br /><br />
      <p v-if="guests.length === 0">No guest found in your search</p>
      <p v-else-if="guests.length === 1">
        Your search found {{ guests.length }} guest
      </p>
      <p v-else>
        Your search found {{ guests.length }} guests of {{ guestList.length }}
      </p>
      <small>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Number of Guests</th>
            <th>Accommodation Type</th>
            <th>Checkin</th>
            <th>Action</th>
          </tr>
          <tr v-for="guest in guests" :key="guest._id">
            <td>{{ guest.name }}</td>
            <td>{{ guest.email }}</td>
            <td>{{ guest.phone }}</td>
            <td>{{ guest.guestNum }}</td>
            <td>{{ guest.accommodationType }}</td>
            <td>{{ guest.checkin }}</td>
            <td>
              <!-- EDIT LINK -->
              <router-link
                :to="{ name: 'EditData', params: { id: guest._id } }"
                class="edit"
              >
                <input type="button" class="btn btn-info" value="edit" />
              </router-link>
              <!-- DELETE LINK -->
              <a href="" @click="removeGuest(guest._id)">
                <input type="submit" class="btn btn-danger" value="delete" />
              </a>
            </td>
          </tr>
        </table>
      </small>
    </div>
    <br />
    <em>{{ message }}</em>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  props: {
    message: String,
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    ...mapState(['guests']),
    ...mapGetters(['guestList']),
    // FILTER GUESTS (search by name or checkin)
    guests() {
      // eslint-disable-next-line max-len
      return this.guestList.filter(
        (guest) => guest.name.toLowerCase().includes(this.search.toLowerCase())
          || guest.checkin.toLowerCase().includes(this.search.toLowerCase()),
      );
    },
  },
  //
  created() {
    this.listGuests();
  },
  // METHODS
  methods: {
    ...mapActions(['listGuests', 'removeGuest']),
  },
};
</script>

<style scoped>
table {
  margin: 0 auto;
  border: 1px solid;
}

th {
  background-color: #068d68;
  border: 1px solid #068d68;
  color: white;
  font-weight: lighter;
}

td {
  width: 1%;
  border: 1px solid #068d68;
}
</style>
