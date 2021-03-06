$('#new-register-date').datepicker('setDate', new Date());

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

       var categoryId = $(this).data('id');
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

var changed = false;
$(function() {
    $('input').on('change', function() { // listen to changes on inputs
        changed = true;
        $('.js-export-report').prop('disabled', true); // disabling export button
        //console.log(changed);
    });
});

$(function() {
    $('.js-generate-report').on('click', function(event) {
        changed = false;
        event.preventDefault();

        if(validateForm()) {
           getReportData();
            if(!changed) {
                $('.js-export-report').prop('disabled', false); // enabling export button
            }
        }
    });
});

function getReportData() {
    var from = $('#from').val();
    var to = $('#to').val();
    var formData = {from: from, to: to};
    var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");

    $.ajax({
        url: $('.js-generate-report').attr('href'),
        type: 'POST',
        data: formData,
        beforeSend: function(xhr) {
          xhr.setRequestHeader(csrfHeader, csrfToken);
        },
        success: function (data) {
            $('#reportDataTable').html(data);
        },
        error: function(xhr) {
            console.log(xhr.statusText);
        }
    });
}

//password change
$(function() {
    var errorClass = false;

    $('.btn-passwd-change').on('click', function(event) {
        event.preventDefault();

        var id = $('#user_email_hidden').val();
        var oldPasswd = $('#oldPasswd').val();
        var newPasswd = $('#newPasswd').val();
        var reType = $('#reTypePasswd').val();
        var formData = {
            email: id,
            password: oldPasswd,
            newPassword: newPasswd,
            retypePassword: reType
        };
        var csrfToken = $("meta[name='_csrf']").attr("content");
        var csrfHeader = $("meta[name='_csrf_header']").attr("content");

        $.ajax({
            url: $('.btn-passwd-change').attr('href'),
            type: 'POST',
            data: formData,
            beforeSend: function(xhr) {
              xhr.setRequestHeader(csrfHeader, csrfToken);
            },
            success: function(data) {
                if(data == 'OK') {
                    if(errorClass){
                        errorClass = false;
                        $('.alert').remove();
                        $('.reset-password-form').find('.form-group').removeClass('has-error');
                    }
                    $('#oldPasswd').val('');
                    $('#newPasswd').val('');
                    $('#reTypePasswd').val('');

                    $('#msg-panel-group').append('<div class="alert alert-success" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        'Password has been changed with success!</div>');
                }
            },
            error: function(xhr) {
                console.log(xhr);
                if(!errorClass) {
                    errorClass = true;
                    $('.reset-password-form').find('.form-group').addClass('has-error');
                    $('#msg-panel-group').append('<div class="alert alert-danger" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        'Error while trying to reset password, check your password and submit again</div>');
                }
            }
        })
    });
});

function validateForm() {
    var isFormValid = true;

    $('.required').each(function() {
        var parent = '#' + $(this).closest('div').attr('id');
        if($.trim($(this).val()).length == 0) {
            $(parent).addClass('has-error');
            isFormValid = false;
        } else {
            $(parent).removeClass('has-error');
        }
    });

    return isFormValid;
}

$(function() {
    $('.js-export-report').on('click', function(event) {
        if(!validateForm())
            event.stopPropagation();

        $('.js-export-btn').on('click', function(event) {
            event.preventDefault();

            var formatSelected = $('#export-format-selector option:selected').val();
            console.log(formatSelected);

            $('#format').val(formatSelected);

            $('#exportTypeSelection').modal('hide');
            $('#report-form').submit();
        });
    });
});

$(function() {
    $.each($('#navbar').find('li'), function() {
       $(this).toggleClass('active',
           $(this).find('a').attr('href') == window.location.pathname);
    });
});

$(function() {
   $('#today-registries-table').find('tbody:last').append('<tr><td colspan="6"><button id="fast-registry-btn" class="btn btn-link">' +
       '<span class="fa fa-plus" aria-hidden="true"></span> Fast Registry</button></td></tr>')
});

$('#btn-pass-change').on('click', function(event) {
    event.preventDefault();
    $(this).hide();
    $('.dummy-space').hide();

   $('#newPassInput').html('<label for="newPasswd" class="col-sm-3 control-label">New Password</label>' +
       '<div class="col-sm-8"><input type="password" class="form-control" id="newPasswd" name="newPassword" value/></div>');

    $(function() {
        $('#newPasswd').pwstrength({
            ui: { showVerdictsInsideProgressBar: true }
        });
    });
});

