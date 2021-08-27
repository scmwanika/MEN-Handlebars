<template>
  <!-- Our Capacity -->
  <div class="capacity-section">
    <h5>Our Capacity</h5>
    <p>These statistics show our current production and growth potential.</p>
    <div>
      <div id="stat-container">
        <div class="stat">
          <div class="stat-num">1500</div>
          <div class="stat-text">Acres available</div>
        </div>
        <div class="stat">
          <div class="stat-num">300+</div>
          <div class="stat-text">Acres of coffee</div>
        </div>
        <div class="stat">
          <div class="stat-num">700K</div>
          <div class="stat-text">Kilograms annually</div>
        </div>
        <div class="stat">
          <div class="stat-num">50</div>
          <div class="stat-text">Employees</div>
        </div>
        <div class="stat">
          <div class="stat-num">300</div>
          <div class="stat-text">Seasonal workers</div>
        </div>
      </div>
    </div>
  </div>
  <!-- Our Capacity -->
</template>

<style scoped>
h5 {
  color: #068d68;
}
/* Capacity styles */
#stat-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width:70%;
  margin-left: auto;
  margin-right: auto;
}
@media screen and (max-width:480px){
  #stat-container{
    width:80%;
  }
}
.stat{
  margin-top: 20px;
  min-width: 100px;
  text-align: center;
}
@media screen and (max-width:480px){
  .stat{
    text-align:left;
  }
}
.stat-num{
  font-size: 45px;
  margin-top:-10px;
  color:rgb(100, 100, 100);
  font-family: 'Times New Roman', Times, serif;
}
</style>
