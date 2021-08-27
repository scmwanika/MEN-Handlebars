<template>
  <div>
    <table class="table table-info">
      <!-- Head -->
      <tr>
        <th>Image</th>
        <th>File Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
      <!-- Body -->
      <tr v-for="training in trainingList" :key="training._id">
        <td>
          <img
            :src="
              require('../../../backend/uploads/' + training.fileName + '.jpg')
            "
            alt="card image"
            width="120px"
          />
        </td>
        <td>{{ training.fileName }}</td>
        <td>{{ training.description }}</td>
        <td>
          <router-link
            :to="{ name: 'edit', params: { id: training._id } }"
            class="edit"
            ><!-- EDIT ICON -->
            <img src="@/assets/edit-16.png" alt="edit-icon" />
          </router-link>
          <a href="" @click.prevent="deleteTraining(training._id)"
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
      trainingList: [],
    };
  },
  created() {
    const endpoint = '/trainings';
    axios
      .get(api + endpoint)
      .then((res) => {
        this.trainingList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async deleteTraining(id) {
      const endpoint = `/delete-training/${id}`;
      try {
        await axios.get(api + endpoint).then(() => {
          // eslint-disable-next-line no-underscore-dangle
          this.trainingList.splice(
            // eslint-disable-next-line no-underscore-dangle
            this.trainingList.findIndex((i) => i._id === id), 1,
          );
        });
        this.message = 'Training Program deleted successfully.';
      } catch {
        this.message = 'Failed to Delete! Please try again.';
      }
    },
  },
};
</script>
