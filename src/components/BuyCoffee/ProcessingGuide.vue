<template>
  <div class="carousel">
    <h5>Process guide</h5>
    <p>Swipe to view.</p>
    <carousel-3d>
      <slide class="slide" :index="0">
        <img src="../../../backend/uploads/Mother Garden.jpg" />
        <br />
        <h3>1-Mother Garden</h3>
        <p>
          Our mother garden consists of a variety of coffee seedlings. We have
          all 7 lines of coffee wilt disease resistant varieties and the
          traditional clones A-F.
        </p>
      </slide>
      <slide class="slide" :index="2">
        <img src="../../../backend/uploads/Cherry Picking.jpg" />
        <br />
        <h3>2-Cherry Picking</h3>
        <p>
          Our mother garden consists of a variety of coffee seedlings. We have
          all 7 lines of coffee wilt disease resistant varieties and the
          traditional clones A-F.
        </p>
      </slide>
      <slide class="slide" :index="1">
        <img src="../../../backend/uploads/Wet Processing.jpg" />
        <br />
        <h3>3-Wet Processing</h3>
        <p>
          Our mother garden consists of a variety of coffee seedlings. We have
          all 7 lines of coffee wilt disease resistant varieties and the
          traditional clones A-F.
        </p>
      </slide>
    </carousel-3d>
  </div>
</template>

<style scoped>
h5 {
  color: #068d68;
}

.slide {
  border: none;
  background-color: #f5f5f5;
}

.carousel img {
  width: 80%;
  margin-left: 36px;
}

p {
  font-size: 12pt;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
