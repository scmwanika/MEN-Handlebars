const runApp = () => {
  // field supplied_by == field supplier_name
  document.getElementById('supplied_by').value = document.getElementById('supplier_name').value;
}

const supplier = () => {
  // hide the button
  $('.btn-supplier').css('display', 'none');
}

$(function () {
  // MESSAGE TO CONFIRM DATA SUBMISSION
  $('.supplier').submit(function () {
    $('#msg').empty().text('Supplier saved successfully');
    $(this).ajaxSubmit({
      success: function (response) {
        console.log(response)
        $('#msg').empty().text(response);
      },
      error: function (xhr) {
        message('Error: ' + xhr.message);
      }
    });
    return false;
  });
});