<template>
  <div>
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

.content {
  text-align: center;
}

span {
  font-size: 24pt;
}

legend,
label,
h6 {
  color: orange;
  margin-bottom: 0;
}

input[type="password"],
input[type="email"],
input[type="text"],
input[type="number"],
input[type="tel"],
input[type="date"],
input[type="file"],
input[type="url"],
select {
  width: 290px;
  padding: 0.75%;
  margin-bottom: 5px;
  font-size: 12pt;
  font-weight: bolder;
  border: 1px solid grey;
}

input[type="radio"] {
  width: 50px;
}

.btn-success,
.submit {
  width: 290px;
  border: none;
  font-weight: bolder;
}
</style>
