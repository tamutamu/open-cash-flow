$(function() {
   $('.js-currency').maskMoney({decimal: ',', thousands: '.', allowZero: true});

   $('.js-category-edit').on('click', function(event) {
       event.preventDefault();
       var button = $(event.currentTarget);
       var receiveUrl = button.attr('href');

       var response = $.ajax({
           url: receiveUrl,
           type: 'GET'
       });

       $('#newCategoryDialog').modal('show');

       var categoryId = $(this).data('id')
       console.log(response)

   });
});

$('#confirmRemoveCategory').on('show.bs.modal', function(event) {
   var button = $(event.relatedTarget);
   var categoryId = button.data('id');
   var categoryDescription = button.data('description');

   var modal = $(this);
   var form = modal.find('form');
   var action = form.data('url-base');

   if(!action.endsWith('/')) {
      action += '/';
   }

   form.attr('action', action + categoryId);
   modal.find('.modal-body span').html('Do you want to remove title <strong>' + categoryDescription + '</strong>?');

});

$(function() {
    $('.js-generate-report').on('click', function(event) {
        event.preventDefault();
        var from = $('#from').val();
        var to = $('#to').val();
        var formData = {from: from, to: to};

        $.ajax({
            url: '/reports/',
            type: 'POST',
            data: formData,
            success: function (data) {
                $('#resultsBlock').html(data);
            }
        });
    });
});

