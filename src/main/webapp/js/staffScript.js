$('.save').click( function(){
    let btn = event.target;
    let obj = btn.closest('tr');
    let staffId =  $(obj).find('.staffId').val();
    let staffName =  $(obj).find('.staffName');
    let selectSpec =  $(obj).find('.selectSpecialization');
    if(staffName.val().trim() == "" || selectSpec.val() == null)
    {
        alert("Error: invalid fields!");
    }else {
        staffName.prop('readonly', 'readonly');
        selectSpec.prop('disable', 'disabled');
        $(obj).find('.save').prop('type', 'hidden');
        $(obj).find('.edit').prop('type', 'button');
        $.get('/SaveOrUpdateStaff', {
            'id': staffId,
            'name': staffName.val(),
            'specialization': selectSpec.val()
        })
    }
});
$('.delete').click( function() {
    let btn = event.target;
    let obj = btn.closest('tr');
    let staffId =  $(obj).find('.staffId').val();
    if(staffId == 0) {
        $(obj).remove();
    }else {
        $(obj).remove();
        $.get('/DeleteStaff',{
            'id':staffId
        })
    }
});
$('.edit').click( function() {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.staffName').removeProp('readonly');
    $(obj).find('.selectSpecialization').removeProp('disabled');
    $(obj).find('.save').prop('type','button');
    $(obj).find('.edit').prop('type','hidden');
});
$('#add').click(function () {
    let row = $('#staffContainer').find('.row').clone(true,true);
    $(row).find('.staffName').val('');
    $(row).find('.staffName').removeProp('readonly');
    $(row).find('.selectSpecialization').val('0');
    $(row).find('.selectSpecialization').removeProp('disabled');
    $(row).find('.staffId').val('0');
    $(row).find('.edit').prop('type','hidden');
    $(row).find('.save').prop('type','button');
    $('#staffContainer').append(row.get(0));
});