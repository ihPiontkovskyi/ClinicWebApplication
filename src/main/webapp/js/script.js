$(document).on('click', 'save.class', function(){
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
$(document).on('click', 'delete.class', function() {
    let btn = event.target;
    let obj = btn.closest('tr');
    let diagnosisId =  $(obj).find('.diagnosisId').val();
    if(diagnosisId == 0) {
        $(obj).parent().removeChild(obj);
    }else {
        $(obj).parent().removeChild(obj);
        $.get('/DeleteDiagnosis',{
            'id':diagnosisId
        })
    }
});
$(document).on('click', 'edit.class', function() {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.diagnosisName').removeProp('readonly');
    $(obj).find('.diagnosisClass').removeProp('readonly');
    $(obj).find('.save').prop('type','button');
    $(obj).find('.edit').prop('type','hidden');
});
$('#add').click(function () {
    const row = $('<tr class ="row">\n' +
        '        <input class="diagnosisId" type="hidden" value="0">\n' +
        '        <td><input class="diagnosisClass" type="text" value=""></td>\n' +
        '        <td><input class="diagnosisName" type="text" value=""></td>\n' +
        '        <td id="action">\n' +
        '            <input class="edit" type="hidden" value="Edit">\n' +
        '            <input class="save" type="button" value="Save">\n' +
        '            <input class="delete" type="button" value="Delete">\n' +
        '        </td>\n' +
        '    </tr>');
    $('#diagnosisContainer').append(row.html());
});