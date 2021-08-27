<template>
  <div class="carousel">
    <br />
    <p>
      Our coffee is processed using a method known as wet processing. This
      removes the coffee's fruity material and leaves the coffee cherry
      moist.<br />
      It is passed through a pulping machine, fermented and dried using forced
      air drying to achieve a moisture content of about 10.5%.
    </p>
    <br />
    <h5>Benefits of the process</h5>
    <p>Swipe to view the benefits.</p>
    <carousel-3d>
      <slide class="slide" :index="0">
        <br />
        <h3>01-Clean Taste</h3>
        <p>
          Our process guarantees a cleaner and more consistent flavor than other
          methods.
        </p>
      </slide>
      <slide class="slide" :index="1">
        <br />
        <h3>02-Selective Picking</h3>
        <p>
          Only the ripest green cherries are picked for processing. This
          guarantees a higher acidity and gives a better taste.
        </p>
      </slide>
      <slide class="slide" :index="2">
        <br />
        <h3>03-Quality Control</h3>
        <p>
          It guarantees a great deal of quality control through selective
          picking and allows for a much more consistent flavor.
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

p {
  font-size: 12pt;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
