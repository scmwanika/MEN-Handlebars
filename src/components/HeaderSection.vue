<template>
  <div id="app">
    <br />
    <p></p>
    <br />
    <!-- ROUTES -->
    <div class="header">
      <b-navbar toggleable="lg" type="dark" variant="light">
        <span style="font-family: Monotype Corsiva"> Clarke Farm </span>
        <b-navbar-toggle style="background-color: #068d68" target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <div class="menu">
            <router-link to="/">About</router-link> |
            <router-link to="/visit">Visit</router-link> |
            <router-link to="/coffee">Coffee</router-link> |
            <router-link to="/testimonial">Testimonial</router-link>
          </div>
          <!-- RIGHT ALIGN NAV ITEMS -->
          <b-navbar-nav class="ml-auto">
            <a><img src="@/assets/phone-24.png" alt="phone-icon" /></a>
            <em>+256 (0) 392 201 400</em>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- BANNER -->
    <div class="flex-container">
      <div class="flex-item-left">
        <img src="../../backend/uploads/farm.jpg" alt="farm" />
      </div>
      <div class="flex-item-middle hero">
        <br />
        <p>
          An eco-friendly coffee estate and farm<br />
          specializing in high quality washed Robusta Coffee.
        </p>
        <br />
        <h6>
          Visit Clarke Farm and experience the amazing hilltop views, explore
          the river and forest walks, try the activities such as bouldering and
          mountain biking, walk or jog on the farm trails or have an exciting
          guided tour of the farm by Jeep. Round off your stay by roasting some
          Clarke Farm coffee and enjoying the fresh locally prepared dishes.
        </h6>
        <div>
          <br />
          <p>
            <b-button v-b-modal.modal-xl variant="info">Book A Trip</b-button>
            <b-button class="feedback" v-b-modal.modal-1 variant="info"
              >Feedback</b-button
            >
            <b-button v-b-modal.modal-2 variant="info">Buy Coffee</b-button>
            <b-modal
              id="modal-xl"
              size="xl"
              title="Accomodation Packages"
              hide-header
              hide-footer
            >
              <GuestForm />
            </b-modal>
            <b-modal
              id="modal-1"
              title="Visitor's Remark"
              hide-header
              hide-footer
            >
              <p><ReviewForm /></p>
            </b-modal>
            <b-modal id="modal-2" title="Coffee Shop" hide-header hide-footer>
              <h6>Coffee Market</h6>
            </b-modal>
          </p>
        </div>
      </div>
      <div class="flex-item-right">
        <img
          src="../../backend/uploads/packaged-coffee.png"
          alt="packaged-coffee"
        />
      </div>
    </div>
    <!-- RENDER THIS COMPONENT HERE -->
    <router-view />
  </div>
</template>

<!-- POWERING COMPONENT -->
<script>
import GuestForm from '@/components/GuestForm.vue';
import ReviewForm from '@/components/ReviewForm.vue';

export default {
  components: {
    GuestForm,
    ReviewForm,
  },
};
</script>

<!-- STYLING COMPONENT -->
<style scoped>
/* Style Routes */
span {
  font-size: 22pt;
  color: #068d68;
}

.menu {
  margin-left: 5%;
}

em {
  font-size: 11pt;
  color: #068d68;
}

/* Style Banner */
p {
  color: #068d68;
  font-weight: bold;
}

p,
h6 {
  margin-left: 5%;
  text-align: justify;
}

.feedback {
  margin-left: 1%;
  margin-right: 1%;
}

button {
  width: auto;
  color: grey;
  background-color: #f5f5f5;
}

* {
  box-sizing: border-box;
}

.flex-container {
  display: flex;
  flex-direction: row;
  font-size: 20px;
  text-align: center;
}

.flex-item-left {
  flex: 39%;
}

.flex-item-middle {
  flex: 45%;
  background-color: #f5f5f5;
}

.hero {
  color: grey;
}

.flex-item-right {
  flex: 16%;
}

/* Responsive layout - makes 1-column layout instead of 3-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}
</style>
