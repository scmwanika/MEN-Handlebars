<template>
  <div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

h4 {
  color: white;
  margin-left: 50%;
  text-align: center;
  background-color: #068d68;
}

h1,
h3,
h5,
h6,
p {
  text-align: center;
}

.header {
  width: 100%;
  position: fixed;
  top: 0px;
}

.footer {
  display: flex;
  flex-direction: row;
  font-size: 10pt;
  text-align: left;
}

.footer-item-left,
.footer-item-middle,
.footer-item-right {
  padding-left: 50px;
  flex: 33.33%;
  color: white;
}

/* Responsive layout - makes a one column-layout instead of three-column layout */
@media (max-width: 800px) {
  .footer {
    flex-direction: column;
  }
}
</style>
