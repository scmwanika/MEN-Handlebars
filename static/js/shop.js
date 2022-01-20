// ADD ITEM TO CART
var calPro = () => {
  // CALCULATES THE VALUE OF ADDED ITEMS
  //document.getElementById('orderBy').value = document.getElementById('customerName').value;
  var units_received = document.getElementById('units_received').value;
  //var value_received = document.getElementById('value_received').value;
  document.getElementById('value_received').value = units_received;
  // var addeditems = document.getElementById('addeditems').value;
  // document.getElementById('addeditems').value = Number(addeditems) + 1;
  // var cumulativeValue = document.getElementById('cumulativeValue').value;
  // document.getElementById('cumulativeValue').value = Number(cumulativeValue) + (unitsOrdered * unitPrice);

  // if (document.getElementById('totalPrice').value == 0) {
  //   document.getElementById('addeditems').value = Number(addeditems);
  // } else if (document.getElementById('orderBy').value == '') {
  //   document.getElementById('addeditems').value = 0;
  //   document.getElementById('cumulativeValue').value = 0;
  // }
}