<template>
  <div>
    <table class="table table-info">
      <!-- Head -->
      <tr>
        <th>Image</th>
        <th>File Name</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
      <!-- Body -->
      <tr v-for="employee in employeeList" :key="employee._id">
        <td>
          <img
            :src="
              require('../../../backend/uploads/' + employee.fileName + '.jpg')
            "
            alt="card image"
            width="120px"
          />
        </td>
        <td>{{ employee.fileName }}</td>
        <td>{{ employee.role }}</td>
        <td>
          <router-link
            :to="{ name: 'EditEmployeeProfile', params: { id: employee._id } }"
            class="edit"
            ><!-- EDIT ICON -->
            <img src="@/assets/edit-16.png" alt="edit-icon" />
          </router-link>
          <a href="" @click.prevent="deleteEmployee(employee._id)"
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
      employeeList: [],
    };
  },
  created() {
    const endpoint = '/employees';
    axios
      .get(api + endpoint)
      .then((res) => {
        this.employeeList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async deleteEmployee(id) {
      const endpoint = `/delete-employee/${id}`;
      try {
        await axios.get(api + endpoint).then(() => {
          // eslint-disable-next-line no-underscore-dangle
          this.employeeList.splice(
            // eslint-disable-next-line no-underscore-dangle
            this.employeeList.findIndex((i) => i._id === id), 1,
          );
        });
        this.message = 'Employee deleted successfully.';
      } catch {
        this.message = 'Failed to Delete! Please try again.';
      }
    },
  },
};
</script>
