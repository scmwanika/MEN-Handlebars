const supplierName = () => {
  // field supplied_by == field supplier_name
  document.getElementById('supplied_by').value = document.getElementById('supplier_name').value;
}

const supplierForm = () => {
  // hide the button
  $('.btn-supplier').css('display', 'none');
}

const productForm = () => {
  // hide the button
  $('.btn-product').css('display', 'none');
}

$(function () {
  // MESSAGE TO CONFIRM DATA SUBMISSION
  $('.supplier').submit(function () {
    $('#msg').empty().text('Supplier saved successfully');
  });
});