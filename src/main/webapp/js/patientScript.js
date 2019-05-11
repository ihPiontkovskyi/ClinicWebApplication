$(document).ready(function () {
    $(".datePicker").datepicker({
        dateFormat: 'yy-mm-dd'
    });

});

$('.save').click(function () {
    let btn = event.target;
    let obj = btn.closest('tr');
    let patientId = $(obj).find('.patientId').val();
    let firstName = $(obj).find('.patientFirstName');
    let lastName = $(obj).find('.patientLastName');
    let date = $(obj).find('.datePicker');
    if (firstName.val().trim() === "" || lastName.val().trim() === "") {
        alert("Error: invalid fields!");
    } else {
        date.prop('disabled', 'disabled');
        firstName.prop('readonly', 'readonly');
        lastName.prop('readonly', 'readonly');
        $(obj).find('.save').prop('type', 'hidden');
        $(obj).find('.edit').prop('type', 'button');
        $.get('/SaveOrUpdatePatient', {
            'id': patientId,
            'firstName': firstName.val(),
            'lastName': lastName.val(),
            'date': date.val()
        })
    }
});
$('.delete').click(function () {
    let btn = event.target;
    let obj = btn.closest('tr');
    let patientId = $(obj).find('.patientId').val();
    if (patientId === 0) {
        $(obj).remove();
    } else {
        $(obj).remove();
        $.get('/DeletePatient', {
            'id': patientId
        })
    }
});
$('.edit').click(function () {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.patientFirstName').removeProp('readonly');
    $(obj).find('.patientLastName').removeProp('readonly');
    $(obj).find('.datePicker').removeProp('disabled');
    $(obj).find('.save').prop('type', 'button');
    $(obj).find('.edit').prop('type', 'hidden');
});
$('#add').click(function () {
    let row = $('#patientContainer').find('.row').clone(true, true);
    $(row).find('.patientFirstName').val('');
    $(row).find('.patientFirstName').removeProp('readonly');
    $(row).find('.patientLastName').val('');
    $(row).find('.patientLastName').removeProp('readonly');
    $(row).find('.datePicker').val('2000-01-01');
    $(row).find('.datePicker').removeProp('disabled');
    $(row).find('.patientId').val('0');
    $(row).find('.edit').prop('type', 'hidden');
    $(row).find('.save').prop('type', 'button');
    $('#patientContainer').append(row.get(0));
});