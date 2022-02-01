const supplierName = () => {
  // field supplied_by == field supplier_name
  document.getElementById('supplied_by').value = document.getElementById('supplier_name').value;
  // insert date automatically
  document.getElementById('created_at').value = Date();
}

const supplierForm = () => {
  // hide the button
  $('.btn-supplier').css('display', 'none');
  
  // display the button
  $('.btn-product').css('display', 'inline');
}

$(function () {
  // MESSAGE TO CONFIRM DATA SUBMISSION
  $('.supplier').submit(function () {
    $('#msg').empty().text('Supplier saved successfully');
  });
});