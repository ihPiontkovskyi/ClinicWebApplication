$('.save').click( function(){
    let btn = event.target;
    let obj = btn.closest('tr');
    let diagnosisId =  $(obj).find('.diagnosisId').val();
    let diagnosisNameObj =  $(obj).find('.diagnosisName');
    let diagnosisClassObj =  $(obj).find('.diagnosisClass');
    diagnosisNameObj.prop('readonly','readonly');
    diagnosisClassObj.prop('readonly','readonly');
    $(obj).find('.save').prop('type','hidden');
    $(obj).find('.edit').prop('type','button');
    $.get('/SaveOrUpdateDiagnosis',{
        'id':diagnosisId,
        'name':diagnosisNameObj.val(),
        'class':diagnosisClassObj.val()
    })
});
$('.delete').click( function() {
    let btn = event.target;
    let obj = btn.closest('tr');
    let diagnosisId =  $(obj).find('.diagnosisId').val();
    if(diagnosisId == 0) {
        $(obj).remove();
    }else {
        $(obj).remove();
        $.get('/DeleteDiagnosis',{
            'id':diagnosisId
        })
    }
});
$('.edit').click( function() {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.diagnosisName').removeProp('readonly');
    $(obj).find('.diagnosisClass').removeProp('readonly');
    $(obj).find('.save').prop('type','button');
    $(obj).find('.edit').prop('type','hidden');
});
    $('#add').click(function () {
        let row = $('#diagnosisContainer').find('.row').clone(true,true);
        $(row).find('.diagnosisName').val('');
        $(row).find('.diagnosisName').removeProp('readonly');
        $(row).find('.diagnosisClass').val('');
        $(row).find('.diagnosisClass').removeProp('readonly');
        $(row).find('.diagnosisId').val('0');
        $(row).find('.edit').prop('type','hidden');
        $(row).find('.save').prop('type','button');
        $('#diagnosisContainer').append(row.get(0));
});