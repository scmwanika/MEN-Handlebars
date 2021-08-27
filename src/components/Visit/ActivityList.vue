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
      <tr v-for="activity in activityList" :key="activity._id">
        <td>
          <img
            :src="
              require('../../../backend/uploads/' + activity.fileName + '.jpg')
            "
            alt="activity"
            width="120px"
          />
        </td>
        <td>{{ activity.fileName }}</td>
        <td>{{ activity.description }}</td>
        <td>
          <router-link
            :to="{ name: 'edit', params: { id: activity._id } }"
            class="edit"
            ><!-- EDIT ICON -->
            <img src="@/assets/edit-16.png" alt="edit-icon" />
          </router-link>
          <a href="" @click.prevent="deleteActivity(activity._id)"
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
      activityList: [],
    };
  },
  created() {
    const endpoint = '/activities';
    axios
      .get(api + endpoint)
      .then((res) => {
        this.activityList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async deleteActivity(id) {
      const endpoint = `/delete-activity/${id}`;
      try {
        await axios.get(api + endpoint).then(() => {
          // eslint-disable-next-line no-underscore-dangle
          this.activityList.splice(
            // eslint-disable-next-line no-underscore-dangle
            this.activityList.findIndex((i) => i._id === id), 1,
          );
        });
        this.message = 'Activity deleted successfully.';
      } catch {
        this.message = 'Failed to Delete! Please try again.';
      }
    },
  },
};
</script>
