<template>
  <div>
    <h6>Accommodation Packages</h6>
    <div class="card-data">
      <div v-for="accommodation in accommodationList" :key="accommodation.id" class="review-data">
        <div class="card">
          <img
            :src="require('../../../backend/uploads/' + accommodation.fileName + '.jpg')"
            alt="card image"
          />
          <div class="card-body">
            <h6>{{ accommodation.fileName }}</h6>
            <h3>{{ accommodation.fee }}</h3>
            <h6>{{ accommodation.description }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const api = 'http://localhost:3000';
export default {
  data() {
    return {
      accommodationList: [],
    };
  },
  created() {
    const endpoint = '/accommodations';
    axios
      .get(api + endpoint)
      .then((res) => {
        this.accommodationList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteAccommodation(id) {
      // eslint-disable-next-line no-underscore-dangle
      const indexOfArrayItem = this.accommodationList.findIndex((i) => i._id === id);

      // eslint-disable-next-line no-alert
      if (window.confirm('Do you really want to delete?')) {
        const endpoint = `/delete-accommodation/${id}`;
        axios
          .get(api + endpoint)
          .then(() => {
            this.accommodationList.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
.card-data {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 70px;
  row-gap: 20px;
}

.card-body {
  color: white;
  background-color: #068d68;
}
</style>
