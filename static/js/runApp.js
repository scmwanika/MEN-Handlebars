// FUNCTION TO MANAGE APP
const runApp = () => {
  // PRODUCT
  document.getElementById('supplied_by').value = document.getElementById('supplier_name').value;
  document.getElementById('supplier').value = document.getElementById('supplier_name').value;
  document.getElementById('product_purchased').value = document.getElementById('product_name').value;
  document.getElementById('product_sold').value = document.getElementById('product_name').value;
  document.getElementById('unit_price').value = document.getElementById('retail_price').value;
  // PURCHASES
  var units_purchased = document.getElementById('units_purchased').value;
  var unit_cost = document.getElementById('unit_cost').value;
  document.getElementById('total_cost').value = units_purchased * unit_cost;
  // SALES
  var units_sold = document.getElementById('units_sold').value;
  var unit_price = document.getElementById('unit_price').value;
  document.getElementById('total_price').value = units_sold * unit_price;
  // CUSTOMER
  document.getElementById('sold_to').value = document.getElementById('customer_name').value;
}