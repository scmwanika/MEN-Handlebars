<template>
  <div>
    <h5>Guests Comment</h5>
    <table class="table table-info">
      <!-- Head -->
      <tr>
        <th>Name</th>
        <th>Rating</th>
        <th>Comment</th>
        <th>Review Date</th>
      </tr>
      <!-- Body -->
      <tr v-for="review in reviewList" :key="review._id">
        <td>{{ review.name }}</td>
        <td>{{ review.rating }}</td>
        <td>{{ review.comment }}</td>
        <td>{{ review.reviewDate }}</td>
      </tr>
    </table>
    <em>{{ message }}</em>
  </div>
</template>

<script>
import axios from 'axios';
import api from '../../api';

export default {
  props: {
    message: String,
  },
  data() {
    return {
      reviewList: [],
    };
  },
  created() {
    const endpoint = '/reviews';
    axios
      .get(api + endpoint)
      .then((res) => {
        this.reviewList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
h5 {
  color: #068d68;
}
</style>
