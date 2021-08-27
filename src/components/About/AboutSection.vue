<template>
  <div>
    <h4>Investment</h4>
    <div class="flex-container">
      <div class="flex-item-left">
        <br />
        <p>
          Clarke Farm is a 1,500 acre farm located in Katambale, Kyarusozi
          Kyenjojo district in Uganda. Approximately half the farm is planted in
          Robusta coffee. Other crops include Eucalyptus, Macadamia, Irish
          potatoes, Maize, Mangoes and Oranges.
        </p>
        <br />
        <p>
          We have recently invested in <span class="about-span">TOURISM </span>
          encouraged by the location and hilly topography of the farm which
          provides amazing views. The farm has several natural waterways and
          lies adjacent to a natural forest with rivers, monkeys and birds.
          There are also projects for conservation and educational purposes such
          as planting bamboo, and reforestation. An outgrower program is
          underway with the goal of training in production of Robusta coffee for
          2,000 smallholders, with Clarke farm providing an end market.
        </p>
      </div>
      <div class="flex-item-right">
        <b-container fluid class="p-4 bg-light">
          <b-row>
            <b-col>
              <b-img
                thumbnail
                fluid
                :src="require('../../../backend/uploads/River walk.jpg')"
                alt="river walk"
              ></b-img>
            </b-col>
            <b-col>
              <b-img
                thumbnail
                fluid
                :src="require('../../../backend/uploads/Forest walk.jpg')"
                alt="forest walk"
              ></b-img>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

p {
  font-size: 11pt;
  text-align: justify;
}

.flex-container {
  display: flex;
  flex-direction: row;
  font-size: 30px;
  text-align: center;
  margin-left: 5%;
  margin-right: 5%;
}

.flex-item-left {
  flex: 30%;
  font-size: 12pt;
  padding-left: 10px;
  padding-right: 10px;
  color: grey;
  background-color: #f5f5f5;
}

.flex-item-right {
  flex: 70%;
}

/* Responsive layout - makes a one column-layout instead of two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}
</style>
