<template>
  <!-- Activities -->
  <div class="activities-section">
    <div class="headline">
      <div>
        <div class="headline1">
          <span style="font-size: 24pt">90% </span> Of Our Guests<br />
        </div>
        <div class="headline2">
          <span>Enjoyed These Activities The Most.</span>
        </div>
      </div>
    </div>
    <div class="activity">
      <div
        v-for="activity in activityList"
        :key="activity.id"
      >
        <div>
          <img
            :src="require('../../../backend/uploads/' + activity.fileName + '.jpg')"
            alt="card image"
          />
          <p>{{ activity.fileName }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Activities -->
</template>

<script>
import axios from 'axios';

const api = 'http://localhost:3000';
export default {
  name: 'Popular Activities',
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
};
</script>

<style scoped>
h5 {
  color: #068d68;
}

.activity {
  margin-left: 5%;
  margin-right: 5%;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 70px;
  width: auto;
}

img {
  width: 75%;
  margin-top: 25px;
  border-radius: 50%;
  border-color: #068d68;
  border-bottom-style: solid;
}

.headline {
  width: 30%;
  margin: 0 auto;
  color: white;
  background-color: #068d68;
  font-size: 14pt;
  font-style: italic;
  font-family: "Times New Roman", Times, serif;
}

.headline1 {
  margin-left: 23px;
  text-align: left;
}

.headline2 {
  margin-right: 23px;
  text-align: right;
}
</style>
