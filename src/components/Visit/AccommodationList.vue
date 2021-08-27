<template>
  <div>
    <table class="table table-info">
      <!-- Head -->
      <tr>
        <th>Image</th>
        <th>File Name</th>
        <th>Fee</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
      <!-- Body -->
      <tr v-for="accommodation in accommodationList" :key="accommodation._id">
        <td>
          <img
            :src="
              require('../../../backend/uploads/' + accommodation.fileName + '.jpg')
            "
            alt="accommodation"
            width="120px"
          />
        </td>
        <td>{{ accommodation.fileName }}</td>
        <td>{{ accommodation.fee }}</td>
        <td>{{ accommodation.description }}</td>
        <td>
          <router-link
            :to="{ name: 'edit', params: { id: accommodation._id } }"
            class="edit"
            ><!-- EDIT ICON -->
            <img src="@/assets/edit-16.png" alt="edit-icon" />
          </router-link>
          <a href="" @click.prevent="deleteAccommodation(accommodation._id)"
            ><!-- DELETE ICON -->
            <img src="@/assets/delete-16.png" alt="delete-icon" />
          </a>
        </td>
      </tr>
    </table>
    <em>{{ message }}</em>
  </div>
</template>

<script>
import axios from 'axios';

const api = 'http://localhost:3000';
export default {
  props: {
    message: String,
  },
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
    async deleteAccommodation(id) {
      const endpoint = `/delete-accommodation/${id}`;
      try {
        await axios.get(api + endpoint).then(() => {
          // eslint-disable-next-line no-underscore-dangle
          this.accommodationList.splice(
            // eslint-disable-next-line no-underscore-dangle
            this.accommodationList.findIndex((i) => i._id === id), 1,
          );
        });
        this.message = 'Accommodation deleted successfully.';
      } catch {
        this.message = 'Failed to Delete! Please try again.';
      }
    },
  },
};
</script>
