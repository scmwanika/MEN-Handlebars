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
          <!-- EDIT LINK -->
          <router-link
            :to="{ name: 'EditData', params: { id: employee._id } }"
            class="edit"
          >
            <input type="button" class="btn btn-info" value="edit" />
          </router-link>
          <!-- DELETE LINK -->
          <a href="" @click.prevent="deleteEmployee(employee._id)">
            <input type="submit" class="btn btn-danger" value="delete" />
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
            this.employeeList.findIndex((i) => i._id === id),
            1,
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
