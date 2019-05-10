$('.save').click(function () {
    let btn = event.target;
    let obj = btn.closest('tr');
    let specializationId = $(obj).find('.specializationId').val();
    let specializationName = $(obj).find('.specializationName');
    let uniq = true;
    $('input').each(function () {
        if ($(this).prop('type') === 'text'
            && $(this).val().trim() === specializationName.val().trim()
            && $(this).get(0) !== specializationName.get(0)) {
            uniq = false;
        }
    });
    if (uniq) {
        specializationName.prop('readonly', 'readonly');
        $(obj).find('.save').prop('type', 'hidden');
        $(obj).find('.edit').prop('type', 'button');
        $.get('/SaveOrUpdateSpecialization', {
            'id': specializationId,
            'name': specializationName.val()
        })
    } else {
        alert("Error: invalid fields!");
    }
});
$('.delete').click(function () {
    let btn = event.target;
    let obj = btn.closest('tr');
    let specializationId = $(obj).find('.specializationId').val();
    if (specializationId == 0) {
        $(obj).remove();
    } else {
        $(obj).remove();
        $.get('/DeleteSpecialization', {
            'id': specializationId
        })
    }
});
$('.edit').click(function () {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.specializationName').removeProp('readonly');
    $(obj).find('.save').prop('type', 'button');
    $(obj).find('.edit').prop('type', 'hidden');
});
$('#add').click(function () {
    let row = $('#specializationContainer').find('.row').clone(true, true);
    $(row).find('.specializationName').val('');
    $(row).find('.specializationName').removeProp('readonly');
    $(row).find('.specializationId').val('0');
    $(row).find('.edit').prop('type', 'hidden');
    $(row).find('.save').prop('type', 'button');
    $('#specializationContainer').append(row.get(0));
});