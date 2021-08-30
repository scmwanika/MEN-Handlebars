<template>
  <div>
    <h5>Update Data</h5>
    <br />
    <div class="flex-container">
      <div class="flex-item-one">
        <EditEmployeeProfile />
        <br />
      </div>
      <div class="flex-item-two">
        <h6>Booking</h6>
        <EditBooking />
        <br />
      </div>
      <div class="flex-item-three">
        <h6>Activity</h6>
        <br />
      </div>
      <div class="flex-item-four">
        <h6>Accommodation</h6>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import EditEmployeeProfile from '@/components/Edit/EditEmployeeProfile.vue';
import EditBooking from '@/components/Edit/EditBooking.vue';

export default {
  components: {
    EditEmployeeProfile,
    EditBooking,
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

h5 {
  color: #068d68;
}

p {
  font-size: 10pt;
  text-align: center;
}

form {
  text-align: left;
  font-size: 10pt;
}

.btn-radio {
  margin-right: 10px;
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

.flex-item-one {
  flex: 40%;
  padding-left: 1%;
  padding-right: 1%;
}

.flex-item-two,
.flex-item-three,
.flex-item-four {
  flex: 20%;
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
