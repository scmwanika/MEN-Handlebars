<template>
  <div class="flex-container">
    <div class="flex-item-left">
      <AccommodationSection />
      <br />
    </div>
    <div class="flex-item-right">
      <div style="background-color: rgba(0, 0, 0, 0.05)">
        <h6>Booking Form</h6>
        <form @submit.prevent="addGuest">
          <div>
            <input
              type="text"
              class="form-control form-control-sm mt-3"
              placeholder="Name"
              v-model="guest.name"
              required
            />
            <input
              type="email"
              class="form-control form-control-sm mt-3"
              placeholder="Email Address"
              v-model="guest.email"
              required
            />
            <input
              type="text"
              class="form-control form-control-sm mt-3"
              placeholder="Phone Number"
              v-model="guest.phone"
              required
            />
            <input
              type="text"
              class="form-control form-control-sm mt-3"
              placeholder="Number of Guests"
              v-model="guest.guestNum"
              required
            />
            <br />
            <p>Accommodation and Visitation Date:</p>
            <input
              class="btn-radio"
              type="radio"
              value="Container House"
              v-model="guest.accommodationType"
            />
            <label>Container House</label>
            <br />
            <input
              class="btn-radio"
              type="radio"
              value="Camping Tent"
              v-model="guest.accommodationType"
            />
            <label>Camping Tent</label>
            <br />
            <input
              class="btn-radio"
              type="radio"
              value="Cottage"
              v-model="guest.accommodationType"
            />
            <label>Cottage</label>
            <br />
            <input
              type="date"
              class="form-control form-control-sm mt-3"
              v-model="guest.checkin"
              required
            />
            <br />
            <input
              type="submit"
              class="btn btn-success btn-block"
              @click="insertGuest(guest)"
            />
          </div>
        </form>
        <em>{{ message }}</em>
      </div>
    </div>
  </div>
</template>

<script>
import AccommodationSection from '@/components/Visit/AccommodationSection.vue';
import { mapMutations, mapActions } from 'vuex';
import axios from 'axios';

const api = 'http://localhost:3000';

export default {
  components: {
    AccommodationSection,
  },
  props: {
    message: String,
  },
  data() {
    return {
      guest: { },
    };
  },
  methods: {
    ...mapMutations(['INSERT_GUEST']),
    ...mapActions(['insertGuest']),
    async addGuest() {
      const endpoint = '/guests/add';
      try {
        await axios.post(api + endpoint, this.guest);
        this.guest = { };
        this.message = 'We\'ve received your request. Thankyou.';
      } catch {
        this.message = 'Failed to submit your request; Please, try again.';
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

p {
  font-size: 10pt;
  text-align: center;
}

form {
  text-align: left;
  font-size: 10pt;
}

.btn-radio {
  margin-right: 10px;
}

em {
  color: red;
  font-size: 10pt;
  text-align: center;
}

.flex-container {
  display: flex;
  flex-direction: row;
  font-size: 12pt;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.05);
}

.flex-item-left {
  flex: 75%;
  margin-left: 2.5%;
  margin-right: 2.5%;
}

.flex-item-right {
  flex: 25%;
  margin-left: 2.5%;
  margin-right: 2.5%;
}

/* Responsive layout - makes a one column-layout instead of two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}
</style>
