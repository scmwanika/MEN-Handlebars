<template>
  <!-- Footer -->
  <div id="app">
    <br />
    <div class="footer">
      <div class="footer-item-left">
        <h6 class="title">CONTACT</h6>
        +256 (0)392 201 400<br />
        Plot 8244, Bukasa-Muyenga<br />
        Kampala, Uganda<br /><br />
      </div>
      <div class="footer-item-middle">
        <h6 class="title">SITE MAP</h6>
        <router-link to="/"><span style="color: white">About</span></router-link
        ><br />
        <router-link to="/visit"
          ><span style="color: white">Visit</span></router-link
        ><br />
        <router-link to="/coffee"
          ><span style="color: white">Coffee</span></router-link
        ><br />
        <router-link to="/testimonial"
          ><span style="color: white">Testimonial</span></router-link
        ><br /><br />
      </div>
      <div class="footer-item-right">
        <h6 class="title">LOCATION</h6>
        Katambale, Kyarusozi<br />
        Kyenjojo District<br />
        Uganda
      </div>
    </div>
    <hr />
    © 2021 Clarke Group Limited <br /><br />
  </div>
  <!-- Footer -->
</template>

<style scoped>
* {
  box-sizing: border-box;
}

#app {
  font-size: 10pt;
  color: white;
  background-color: #068d68;
}

h6 {
  text-align: left;
}
</style>
