<template>
  <div>
    <div class="flex-container">
      <div class="flex-item-left">
        <img
          :src="require('../../backend/uploads/' + employee.fileName + '.jpg')"
          alt="card image"
        />
      </div>
      <div class="flex-item-right">
        <br /><h5>Update Profile</h5>
        <form @submit.prevent="handleUpdateForm">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="file name"
              v-model="employee.fileName" readonly
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="role"
              v-model="employee.role"
              required
            />
          </div>

          <div class="form-group">
            <button class="btn btn-success btn-block">
              Update Profile
            </button>
            <em>{{ message }}</em>
          </div>
        </form>
        <br />
      </div>
    </div>
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
      employee: {},
    };
  },
  // Button "See Profile" onClick GETs this employee.
  created() {
    const endpoint = `/employee/${this.$route.params.id}`;

    axios.get(api + endpoint).then((res) => {
      this.employee = res.data;
    });
  },
  //
  methods: {
    async handleUpdateForm() {
      // Update-button onClick, POSTs this employee.
      const endpoint = `/update-employee/${this.$route.params.id}`;
      try {
        await axios.post(api + endpoint, this.employee).then(() => {
          this.$router.push('/admin');
        });
        this.message = 'Employee updated successfully.';
      } catch {
        this.message = 'Failed to Update! Please try again.';
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
  flex: 25%;
  padding: 1%;
  padding-right: 1%;
}

.flex-item-right {
  flex: 75%;
  padding-left: 1%;
  padding-right: 1%;
}

/* Responsive layout - makes a one column-layout instead of two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}
</style>
