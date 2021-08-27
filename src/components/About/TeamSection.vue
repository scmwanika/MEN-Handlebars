<template>
  <!-- Team -->
  <div class="team-section">
    <h4>Our Team</h4>
    <div class="card-data">
      <div
        v-for="employee in employeeList"
        :key="employee.id"
        class="team-data"
      >
        <div class="card">
          <img
            :src="
              require('../../../backend/uploads/' + employee.fileName + '.jpg')
            "
            alt="card image"
          />
          <div class="card-body">
            <h6 class="card-title">{{ employee.fileName }}</h6>
            <p class="card-text">{{ employee.role }}</p>
            <router-link
              :to="{ name: 'ViewEmployeeProfile', params: { id: employee._id } }"
              class="edit"
              ><!-- SHOW PROFILE -->
              <p>
                <button class="btn btn-outline-info" type="button" >
                  See Profile
                </button>
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <span onClick="this.style.visibility= 'hidden';"
      ><p>
        <b-button v-on:click="getemployee()" variant="info">
          <span style="text-transform: none">Show Team</span>
        </b-button>
        <br /><br />
      </p>
    </span>
  </div>
  <!-- Team -->
</template>

<script>
import axios from 'axios';

const api = 'http://localhost:3000';
export default {
  name: 'Employees',
  data() {
    return {
      employeeList: [],
    };
  },
  methods: {
    getemployee() {
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
  },
};
</script>

<style scoped>
.card-data {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 20px;
  row-gap: 20px;
}

p {
  font-size: 10pt;
  text-align: center;
}

button {
  width: auto;
  color: grey;
  background-color: #f5f5f5;
}
</style>
