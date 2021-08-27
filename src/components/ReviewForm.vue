<template>
  <div>
    <h6 class="text-center">Farm visit reviews</h6>
    <form @submit.prevent="handleSubmitForm">
      <div class="form-group">
        <label>Name:</label>
        <input
          type="text"
          class="form-control"
          v-model="visitor.name"
          required
        />
      </div>

      <div class="form-group">
        <label>Farm experience:</label>
        <select class="form-control" v-model="visitor.rating" required>
          <option value="☆☆☆☆☆">Excellent</option>
          <option value="☆☆☆☆">Very Good</option>
          <option value="☆☆☆">Good</option>
          <option value="☆☆">Fair</option>
          <option value="☆">Poor</option>
        </select>
      </div>

      <div class="form-group">
        <label>Comment:</label>
        <input
          type="text"
          class="form-control"
          v-model="visitor.comment"
          required
        />
      </div>

      <div class="form-group">
        <label>Date:</label>
        <input
          type="date"
          class="form-control"
          v-model="visitor.reviewDate"
          required
        />
      </div>
      <br />
      <div class="form-group">
        <button class="btn btn-success btn-block">Submit</button>
      </div>
    </form>
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
      visitor: {
        name: '',
        rating: '',
        remark: '',
        reviewDate: '',
      },
    };
  },
  methods: {
    async handleSubmitForm() {
      const endpoint = '/reviews/add';
      try {
        await axios.post(api + endpoint, this.visitor);
        // this.$router.push('/admin');
        this.visitor = {
          name: '',
          rating: '',
          remark: '',
          reviewDate: '',
        };
        this.message = 'We have received your review with Thanks.';
      } catch {
        this.message = 'Failed to submit! Please, try again.';
      }
    },
  },
};
</script>

<style scoped>
h6,
form {
  margin-right: 5%;
}

label {
  font-size: 14px;
  margin-bottom: 0px;
}

em {
  color: red;
  font-size: 10pt;
}
</style>
