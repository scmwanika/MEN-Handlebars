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
        <br />
        <h5>Employee Profile</h5>
        <hr />
        <b>{{ employee.fileName }}</b
        ><br />
        {{ employee.role }}
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
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

h5 {
  text-align: left;
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
  text-align: left;
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
