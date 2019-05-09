$(document).ready( function() {
    $("#datePicker").datepicker({
        dateFormat: 'yy-mm-dd'
    });

});

$('.edit').click(function () {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.selectPatient').removeProp('disabled');
    $(obj).find('.selectDiagnosis').removeProp('disabled');
    $(obj).find('.selectStaff').removeProp('disabled');
    $(obj).find('.inputTerm').removeProp('readonly');
    $(obj).find('#datePicker').removeProp('readonly');
    $(obj).find('.save').prop('type', 'button');
    $(obj).find('.edit').prop('type', 'hidden');
});
$('.save').click(function () {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.selectPatient').prop('disabled', 'disabled');
    $(obj).find('.selectDiagnosis').prop('disabled', 'disabled');
    $(obj).find('.selectStaff').prop('disabled', 'disabled');
    $(obj).find('.inputTerm').prop('readonly', 'disabled');
    $(obj).find('#datePicker').prop('readonly', 'disabled');
    $(obj).find('.save').prop('type', 'hidden');
    $(obj).find('.edit').prop('type', 'button');
    $.get('/SaveOrUpdateExamination', {
        'id': $(obj).find('.examinationId').val(),
        'patientId': $(obj).find('.selectPatient').val(),
        'diagnosisId': $(obj).find('.selectDiagnosis').val(),
        'staffId': $(obj).find('.selectStaff').val(),
        'term': $(obj).find('.inputTerm').val(),
        'date': $(obj).find('#datePicker').val()
    })
});
$('#add').click(function () {
    let row = $('#examinationContainer').find('.row').clone(true, true);
    $(row).find('.selectPatient').val('0');
    $(row).find('.selectDiagnosis').val('0');
    $(row).find('.selectStaff').val('0');
    $(row).find('.inputTerm').val('0');
    $(row).find('#datePicker').val('2019-01-01');
    $(row).find('.examinationId').val('0');
    $(row).find('.selectPatient').removeProp('disabled');
    $(row).find('.selectDiagnosis').removeProp('disabled');
    $(row).find('.selectStaff').removeProp('disabled');
    $(row).find('.inputTerm').removeProp('readonly');
    $(row).find('#datePicker').removeProp('readonly');
    $(row).find('.edit').prop('type', 'hidden');
    $(row).find('.save').prop('type', 'button');
    $('#examinationContainer').append(row.get(0));
});

$('.delete').click( function() {
    let btn = event.target;
    let obj = btn.closest('tr');
    let diagnosisId =  $(obj).find('.examinationId').val();
    if($('.examinationId') == 0) {
        $(obj).remove();
    }else {
        $(obj).remove();
        $.get('/DeleteExamination',{
            'id':diagnosisId
        })
    }
});