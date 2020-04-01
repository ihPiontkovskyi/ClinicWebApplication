function loadSpecPage() {
    setActive(event);
    let container = $(document).context.getElementById('specializationContainer');
    let divStaff = $(document).context.getElementById('staffDiv');
    let div = $(document).context.getElementById('specializationDiv');
    let divDiag = $(document).context.getElementById('diagnosisDiv');
    let divPat = $(document).context.getElementById('patientDiv');
    let divExam = $(document).context.getElementById('examinationDiv');
    $(divExam).prop('hidden', 'hidden');
    $(divPat).prop('hidden', 'hidden');
    $(divStaff).prop('hidden', 'hidden');
    $(divDiag).prop('hidden', 'hidden');
    $(container).find('.executed').remove();
    $.get('/loadSpecialization', {}, function (data) {
        let json = JSON.parse(data);
        json.specializations.forEach(function (item) {
            loadSpecRow(item.specializationId, item.specializationName);
        });
    });

    $(div).removeProp('hidden');
} //Specialization

function loadSpecRow(id, name) {
    let container = $(document).context.getElementById('specializationContainer');
    let row = $(container).find('.row').clone(true, true);
    $(row).removeProp('hidden');
    $(row).prop('class', 'executed');
    $(row).find('.specializationName').val(name);
    $(row).find('.specializationId').val(id);
    $(container).append(row.get(0));
}

function saveSpec() {
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
        $(obj).find('.saveSpec').prop('type', 'hidden');
        $(obj).find('.editSpec').prop('type', 'button');
        $.get('/SaveOrUpdateSpecialization', {
            'id': specializationId,
            'name': specializationName.val()
        })
    } else {
        alert("Error: invalid fields!");
    }
}

function deleteSpec() {
    let btn = event.target;
    let obj = btn.closest('tr');
    let specializationId = $(obj).find('.specializationId').val();
    if (specializationId === 0) {
        $(obj).remove();
    } else {
        $(obj).remove();
        $.get('/DeleteSpecialization', {
            'id': specializationId
        })
    }
}

function editSpec() {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.specializationName').removeProp('readonly');
    $(obj).find('.saveSpec').prop('type', 'button');
    $(obj).find('.editSpec').prop('type', 'hidden');
}

function addSpec() {
    let container = $(document).context.getElementById('specializationContainer');
    let row = $(container).find('.row').clone(true, true);
    $(row).removeProp('hidden');
    $(row).find('.specializationName').val('');
    $(row).find('.specializationName').removeProp('readonly');
    $(row).find('.specializationId').val('0');
    $(row).find('.editSpec').prop('type', 'hidden');
    $(row).find('.saveSpec').prop('type', 'button');
    $(container).append(row.get(0));
}

function loadStaffPage() {
    setActive(event);
    let container = $(document).context.getElementById('staffContainer');
    let div = $(document).context.getElementById('staffDiv');
    let divSpec = $(document).context.getElementById('specializationDiv');
    let divDiag = $(document).context.getElementById('diagnosisDiv');
    let divPat = $(document).context.getElementById('patientDiv');
    let divExam = $(document).context.getElementById('examinationDiv');
    $(divExam).prop('hidden', 'hidden');
    $(divPat).prop('hidden', 'hidden');
    $(divSpec).prop('hidden', 'hidden');
    $(divDiag).prop('hidden', 'hidden');
    $(container).find('.executed').remove();
    $.get('/loadStaff', {}, function (data) {
        let json = JSON.parse(data);
        json.staff.forEach(function (item) {
            loadStaffRow(item.staffId, item.fullName, item.specialization);
        });
    });
    $(div).removeProp('hidden');
} //Staff

function loadStaffRow(id, fullName, specId) {
    let container = $(document).context.getElementById('staffContainer');
    let row = $(container).find('.row').clone(true, true);
    $(row).find('.staffName').val(fullName);
    $(row).removeProp('hidden');
    $(row).prop('class', 'executed');
    $.get('/loadSpecialization', {}, function (data) {
        let json = JSON.parse(data);
        let parsed = [];
        json.specializations.forEach(function (item) {
            parsed.push({
                key: item.specializationId,
                value: item.specializationName
            });
        });
        $(row).find('#inputSpec').autocomplete({
            minLength: 1,
            source: parsed,
            select: function (event, ui) {
                $(row).find('#inputSpec').val(ui.item.value);
                $(row).find('#inputSpec_hidden').val(ui.item.key);
                return false;
            },

        }).val(
            function () {
                for (let i = 0; i < parsed.length; ++i) {
                    if (parsed[i].key === specId)
                        return parsed[i].value
                }
            }
        ).prop('type', 'text');

        $(row).find('.staffId').val(id);
        $(container).append(row.get(0));
    });
}

function saveStaff() {
    let btn = event.target;
    let obj = btn.closest('tr');
    let staffId = $(obj).find('.staffId').val();
    let staffName = $(obj).find('.staffName');
    let selectSpec = $(obj).find('#inputSpec_hidden');
    let selectSpecDis = $(obj).find('#inputSpec');
    if (staffName.val().trim() === "" || selectSpec.val() == null) {
        alert("Error: invalid fields!");
    } else {
        staffName.prop('readonly', 'readonly');
        selectSpecDis.prop('readonly', 'readonly');
        $(obj).find('.saveStaff').prop('type', 'hidden');
        $(obj).find('.editStaff').prop('type', 'button');
        $.get('/SaveOrUpdateStaff', {
            'id': staffId,
            'name': staffName.val(),
            'specialization': selectSpec.val()
        })
    }
}

function deleteStaff() {
    let btn = event.target;
    let obj = btn.closest('tr');
    let staffId = $(obj).find('.staffId').val();
    if (staffId === 0) {
        $(obj).remove();
    } else {
        $(obj).remove();
        $.get('/DeleteStaff', {
            'id': staffId
        })
    }
}

function editStaff() {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.staffName').removeProp('readonly');
    $(obj).find('#inputSpec').removeProp('readonly');
    $(obj).find('.saveStaff').prop('type', 'button');
    $(obj).find('.editStaff').prop('type', 'hidden');
}

function addStaff() {
    let container = $(document).context.getElementById('staffContainer');
    let row = $(container).find('.row').clone(true, true);
    $(row).find('.staffName').val('');
    $(row).removeProp('hidden');
    $(row).find('.staffName').removeProp('readonly');
    $(row).find('.inputSpec').removeProp('disabled');
    $(row).find('.staffId').val('0');
    $(row).find('.editStaff').prop('type', 'hidden');
    $(row).find('.saveStaff').prop('type', 'button');
    $(container).append(row.get(0));
}

function loadDiagPage() {
    setActive(event);
    let container = $(document).context.getElementById('diagnosisContainer');
    let div = $(document).context.getElementById('diagnosisDiv');
    let divStaff = $(document).context.getElementById('staffDiv');
    let divSpec = $(document).context.getElementById('specializationDiv');
    let divPat = $(document).context.getElementById('patientDiv');
    let divExam = $(document).context.getElementById('examinationDiv');
    $(divExam).prop('hidden', 'hidden');
    $(divPat).prop('hidden', 'hidden');
    $(divSpec).prop('hidden', 'hidden');
    $(divStaff).prop('hidden', 'hidden');
    $(container).find('.executed').remove();
    $.get('/loadDiag', {}, function (data) {
        let json = JSON.parse(data);
        json.diagnosis.forEach(function (item) {
            loadDiagRow(item.diagnosisId, item.diagnosisName);
        });
    });

    $(div).removeProp('hidden');
} //Diagnosis

function loadDiagRow(id, name) {
    let container = $('#diagnosisContainer');
    let row = $(container).find('.row').clone(true, true);
    $(row).prop('class', 'executed');
    $(row).removeProp('hidden');
    $(row).find('.diagnosisName').val(name);
    $(row).find('.diagnosisId').val(id);
    $(container).append(row.get(0));
}

function saveDiag() {
    let btn = event.target;
    let obj = btn.closest('tr');
    let diagnosisId = $(obj).find('.diagnosisId').val();
    let diagnosisNameObj = $(obj).find('.diagnosisName');
    if (diagnosisNameObj.val().trim() === "") {
        alert("Error: invalid fields!");
    } else {
        let uniq = true;
        $('input').each(function () {
            if ($(this).prop('type') === 'text'
                && $(this).val().trim() === diagnosisNameObj.val().trim()
                && $(this).get(0) !== diagnosisNameObj.get(0)) {
                uniq = false;
            }
        });
        if (uniq) {
            diagnosisNameObj.prop('readonly', 'readonly');
            $(obj).find('.saveDiag').prop('type', 'hidden');
            $(obj).find('.editDiag').prop('type', 'button');
            $.get('/SaveOrUpdateDiagnosis', {
                'id': diagnosisId,
                'name': diagnosisNameObj.val()
            })
        } else {
            alert("Error: invalid fields!");
        }
    }
}

function deleteDiag() {
    let btn = event.target;
    let obj = btn.closest('tr');
    let diagnosisId = $(obj).find('.diagnosisId').val();
    if (diagnosisId === 0) {
        $(obj).remove();
    } else {
        $(obj).remove();
        $.get('/DeleteDiagnosis', {
            'id': diagnosisId
        })
    }
}

function editDiag() {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.diagnosisName').removeProp('readonly');
    $(obj).find('.saveDiag').prop('type', 'button');
    $(obj).find('.editDiag').prop('type', 'hidden');
}

function addDiag() {
    let container = $('#diagnosisContainer');
    let row = $(container).find('.row').clone(true, true);
    $(row).find('.diagnosisName').val('');
    $(row).find('.diagnosisName').removeProp('readonly');
    $(row).find('.diagnosisId').val('0');
    $(row).find('.editDiag').prop('type', 'hidden');
    $(row).find('.saveDiag').prop('type', 'button');
    $(container).append(row.get(0));
}

function loadPatPage() {
    setActive(event);
    let container = $(document).context.getElementById('patientContainer');
    let divPat = $(document).context.getElementById('patientDiv');
    let div = $(document).context.getElementById('diagnosisDiv');
    let divStaff = $(document).context.getElementById('staffDiv');
    let divSpec = $(document).context.getElementById('specializationDiv');
    let divExam = $(document).context.getElementById('examinationDiv');
    $(divExam).prop('hidden', 'hidden');
    $(divSpec).prop('hidden', 'hidden');
    $(div).prop('hidden', 'hidden');
    $(divStaff).prop('hidden', 'hidden');
    $(container).find('.executed').remove();
    $(divPat).removeProp('hidden');
    $.get('/loadPat', {}, function (data) {
        let json = JSON.parse(data);
        json.patients.forEach(function (item) {
            loadPatRow(item.patientId, item.patientFirstName, item.patientLastName, item.patientDateOfBirth);
        });
    });
} //Patient

$(document).ready(function () {
    $.get('/loadPat', {}, {});
    $(".datePicker").datepicker({
        dateFormat: 'yy-mm-dd'
    });
});

$(document).change(function () {
    $(".datePicker").datepicker({
        dateFormat: 'yy-mm-dd'
    });

});

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

function savePat() {
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
        $(obj).find('.savePat').prop('type', 'hidden');
        $(obj).find('.editPat').prop('type', 'button');
        $.get('/SaveOrUpdatePatient', {
            'id': patientId,
            'firstName': firstName.val(),
            'lastName': lastName.val(),
            'date': date.val()
        })
    }
}

function deletePat() {
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
}

function editPat() {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.patientFirstName').removeProp('readonly');
    $(obj).find('.patientLastName').removeProp('readonly');
    $(obj).find('.datePicker').removeProp('disabled');
    $(obj).find('.savePat').prop('type', 'button');
    $(obj).find('.editPat').prop('type', 'hidden');
}

function addPat() {
    let row = document.createElement('tr');
    row.className = 'executed';
    let input = document.createElement('input');
    $(input).prop('class', 'patientId').prop('type', 'hidden').prop('value', '0');
    let inputFirstName = document.createElement('input');
    $(inputFirstName).prop('class', 'patientFirstName').prop('type', 'text');
    let inputLastName = document.createElement('input');
    $(inputLastName).prop('class', 'patientLastName').prop('type', 'text');
    let inputDate = document.createElement('input');
    $(inputDate).prop('class', 'datePicker').prop('type', 'text').prop('value', '2000-01-01');
    $(inputDate).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    let inputEdit = document.createElement('input');
    $(inputEdit).prop('class', 'editPat').prop('type', 'hidden');
    $(inputEdit).click(function () {
        let btn = event.target;
        let obj = btn.closest('tr');
        $(obj).find('.patientFirstName').removeProp('readonly');
        $(obj).find('.patientLastName').removeProp('readonly');
        $(obj).find('.datePicker').removeProp('disabled');
        $(obj).find('.savePat').prop('type', 'button');
        $(obj).find('.editPat').prop('type', 'hidden');
    });
    let inputSave = document.createElement('input');
    $(inputSave).prop('class', 'savePat').prop('type', 'button');
    $(inputSave).click(function () {
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
            $(obj).find('.savePat').prop('type', 'hidden');
            $(obj).find('.editPat').prop('type', 'button');
            $.get('/SaveOrUpdatePatient', {
                'id': patientId,
                'firstName': firstName.val(),
                'lastName': lastName.val(),
                'date': date.val()
            })
        }
    });
    let inputDelete = document.createElement('input');
    $(inputDelete).prop('class', 'deletePat').prop('type', 'button');
    $(inputDelete).click(function () {
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
    row.appendChild(input);
    let td1 = document.createElement('td');
    td1.append(inputFirstName);
    row.append(td1);
    let td2 = document.createElement('td');
    td2.append(inputLastName);
    row.append(td2);
    let td3 = document.createElement('td');
    td3.append(inputDate);
    row.append(td3);
    let td4 = document.createElement('td');
    td4.append(inputEdit, inputSave, inputDelete);
    row.append(td4);
    $('#patientContainer').append(row);
}

function loadPatRow(id, first, last, date) {
    let row = document.createElement('tr');
    row.className = 'executed';
    let input = document.createElement('input');
    $(input).prop('class', 'patientId').prop('type', 'hidden').prop('readonly', 'readonly').prop('value', id);
    let inputFirstName = document.createElement('input');
    $(inputFirstName).prop('class', 'patientFirstName').prop('readonly', 'readonly').prop('type', 'text').prop('value', first);
    let inputLastName = document.createElement('input');
    $(inputLastName).prop('class', 'patientLastName').prop('readonly', 'readonly').prop('type', 'text').prop('value', last);
    let inputDate = document.createElement('input');
    $(inputDate).prop('class', 'datePicker').prop('type', 'text').prop('value', date).prop('disabled', 'disabled');
    $(inputDate).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    let inputEdit = document.createElement('input');
    $(inputEdit).prop('class', 'editPat editButton').prop('type', 'button');
    $(inputEdit).click(function () {
        let btn = event.target;
        let obj = btn.closest('tr');
        $(obj).find('.patientFirstName').removeProp('readonly');
        $(obj).find('.patientLastName').removeProp('readonly');
        $(obj).find('.datePicker').removeProp('disabled');
        $(obj).find('.savePat').prop('type', 'button');
        $(obj).find('.editPat').prop('type', 'hidden');
    });
    let inputSave = document.createElement('input');
    $(inputSave).prop('class', 'savePat saveButton').prop('type', 'hidden');
    $(inputSave).click(function () {
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
            $(obj).find('.savePat').prop('type', 'hidden');
            $(obj).find('.editPat').prop('type', 'button');
            $.get('/SaveOrUpdatePatient', {
                'id': patientId,
                'firstName': firstName.val(),
                'lastName': lastName.val(),
                'date': date.val()
            })
        }
    });
    let inputDelete = document.createElement('input');
    $(inputDelete).prop('class', 'deletePat deleteButton').prop('type', 'button');
    $(inputDelete).click(function () {
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
    row.appendChild(input);
    let td1 = document.createElement('td');
    td1.append(inputFirstName);
    row.append(td1);
    let td2 = document.createElement('td');
    td2.append(inputLastName);
    row.append(td2);
    let td3 = document.createElement('td');
    td3.append(inputDate);
    row.append(td3);
    let td4 = document.createElement('td');
    td4.append(inputEdit, inputSave, inputDelete);
    row.append(td4);
    $('#patientContainer').append(row);
}

$(".inputTerm").on("keypress keyup blur", function (event) {
    $(this).val($(this).val().replace(/[^\d].+/, ""));
    if ((event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

function loadExamPage() { //Examination
    setActive(event);
    let container = $(document).context.getElementById('examinationContainer');
    let divPat = $(document).context.getElementById('patientDiv');
    let div = $(document).context.getElementById('diagnosisDiv');
    let divStaff = $(document).context.getElementById('staffDiv');
    let divSpec = $(document).context.getElementById('specializationDiv');
    let divExam = $(document).context.getElementById('examinationDiv');
    $(divSpec).prop('hidden', 'hidden');
    $(divPat).prop('hidden', 'hidden');
    $(div).prop('hidden', 'hidden');
    $(divStaff).prop('hidden', 'hidden');
    $(container).find('.executed').remove();
    $.get('/loadExam', {}, function (data) {
        let json = JSON.parse(data);
        json.exams.forEach(function (item) {
            loadExamRow(item.examinationId, item.examinationDate, item.termOfTreatment, item.patientId, item.staffId, item.diagnosis)
        });
    });
    $(divExam).removeProp('hidden');
} //Exam

function loadExamRow(id, date, term, patient, doctor, diagnosis) {
    let row = document.createElement('tr');
    let examCont = $('#examinationContainer');
    let cloneRow = $(examCont).find('.row').clone(true);
    $(cloneRow).removeProp('hidden');
    let input = document.createElement('input');
    $(input).prop('class', 'examinationId').prop('type', 'hidden').prop('value', id);
    let patientSelect = document.createElement('input');
    let patientSelect_hidden = document.createElement('input');
    $(patientSelect).prop('id', 'selectPatient').prop("readonly", 'readonly').prop('type', 'text');
    $(patientSelect_hidden).prop('id', 'selectPatient_hidden').prop("readonly", 'readonly').prop('hidden', 'hidden');
    $.get('/loadPat', {}, function (data) {
        let json = JSON.parse(data);
        let parsed = [];
        json.patients.forEach(function (item) {
            parsed.push({
                key: item.patientId,
                value: item.string
            });
        });
        $(patientSelect).autocomplete({
            minLength: 1,
            source: parsed,
            select: function (event, ui) {
                $(patientSelect).val(ui.item.value);
                $(patientSelect_hidden).val(ui.item.key);
                return false;
            },

        }).val(
            function () {
                for (let i = 0; i < parsed.length; ++i) {
                    if (parsed[i].key === patient)
                        return parsed[i].value
                }
            }
        );
    });
    let inputDate = document.createElement('input');
    $(inputDate).prop('class', 'datePicker').prop("disabled", 'disabled').prop('type', 'text').prop('value', date);
    $(inputDate).datepicker({
        dateFormat: 'yy-mm-dd'
    });

    let diagnosisSelect = document.createElement('input');
    let diagnosisSelect_hidden = document.createElement('input');
    $(diagnosisSelect).prop('id', 'selectDiagnosis').prop("readonly", 'readonly').prop('type', 'text');
    $(diagnosisSelect_hidden).prop('id', 'selectDiagnosis_hidden').prop("readonly", 'readonly').prop('hidden', 'hidden');

    $.get('/loadDiag', {}, function (data) {
        let json = JSON.parse(data);
        let parsed = [];
        json.diagnosis.forEach(function (item) {
            parsed.push({
                key: item.diagnosisId,
                value: item.diagnosisName
            });
        });
        $(diagnosisSelect).autocomplete({
            minLength: 1,
            source: parsed,
            select: function (event, ui) {
                $(diagnosisSelect).val(ui.item.value);
                $(diagnosisSelect_hidden).val(ui.item.key);
                return false;
            },

        }).val(
            function () {
                for (let i = 0; i < parsed.length; ++i) {
                    if (parsed[i].key === diagnosis)
                        return parsed[i].value
                }
            }
        );
    });
    let staffSelect = document.createElement('input');
    let staffSelect_hidden = document.createElement('input');
    $(staffSelect).prop('id', 'selectStaff').prop("readonly", 'readonly').prop('type', 'text');
    $(staffSelect_hidden).prop('id', 'staffSelect_hidden').prop("readonly", 'readonly').prop('hidden', 'hidden');
    $.get('/loadStaff', {}, function (data) {
        let json = JSON.parse(data);
        let parsed = [];
        json.staff.forEach(function (item) {
            parsed.push({
                key: item.staffId,
                value: item.string
            });
        });
        $(staffSelect).autocomplete({
            minLength: 1,
            source: parsed,
            select: function (event, ui) {
                $(staffSelect).val(ui.item.value);
                $(staffSelect_hidden).val(ui.item.key);
                return false;
            },

        }).val(
            function () {
                for (let i = 0; i < parsed.length; ++i) {
                    if (parsed[i].key === doctor)
                        return parsed[i].value
                }
            }
        );
    });

    let inputTerm = document.createElement('input');
    $(inputTerm).prop('type', 'text').prop('value', term).prop('readonly', 'readonly').prop('class', 'inputTerm');

    let inputEdit = document.createElement('input');
    $(inputEdit).prop('class', 'editExam editButton').prop('type', 'button');
    let inputSave = document.createElement('input');
    $(inputSave).prop('class', 'saveExam  saveButton').prop('type', 'hidden');
    let inputDelete = document.createElement('input');
    $(inputDelete).prop('class', 'deleteExam  deleteButton').prop('type', 'button');

    $(inputEdit).click(function () {
        let btn = event.target;
        let obj = btn.closest('tr');
        $(obj).find('#selectPatient').removeProp('readonly');
        $(obj).find('#selectDiagnosis').removeProp('readonly');
        $(obj).find('#selectStaff').removeProp('readonly');
        $(obj).find('.inputTerm').removeProp('readonly');
        $(obj).find('.datePicker').removeProp('disabled');
        $(obj).find('.saveExam').prop('type', 'button');
        $(obj).find('.editExam').prop('type', 'hidden');
    });
    $(inputDelete).click(function () {
        let btn = event.target;
        let obj = btn.closest('tr');
        let diagnosisId = $(obj).find('.examinationId').val();
        if ($('.examinationId') === 0) {
            $(obj).remove();
        } else {
            $(obj).remove();
            $.get('/DeleteExamination', {
                'id': diagnosisId
            })
        }
    });
    $(inputSave).click(function () {
        let btn = event.target;
        let obj = btn.closest('tr');
        let examinationId = $(obj).find('.examinationId').val();
        let patientId = $(obj).find('#selectPatient_hidden').val();
        let diagnosisId = $(obj).find('#selectDiagnosis').val();
        let staffId = $(obj).find('#selectStaff').val();
        let term = $(obj).find('.inputTerm').val();
        let date = $(obj).find('.datePicker').val();
        if (patientId == null || diagnosisId == null || staffId == null || term.trim() === "") {
            alert("Error: invalid fields!");
        } else {
            $(obj).find('#selectPatient').prop('readonly', 'readonly');
            $(obj).find('#selectDiagnosis').prop('readonly', 'readonly');
            $(obj).find('#selectStaff').prop('readonly', 'readonly');
            $(obj).find('.inputTerm').prop('readonly', 'disabled');
            $(obj).find('.datePicker').prop('disabled', 'disabled');
            $(obj).find('.saveExam').prop('type', 'hidden');
            $(obj).find('.editExam').prop('type', 'button');
            $.get('/SaveOrUpdateExamination', {
                'id': examinationId,
                'patientId': patientId,
                'diagnosisId': diagnosisId,
                'staffId': staffId,
                'term': term,
                'date': date
            })
        }
    });
    $(inputTerm).on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    row.appendChild(input);
    let td1 = document.createElement('td');
    td1.append(patientSelect);
    td1.append(patientSelect_hidden);
    row.append(td1);
    let td2 = document.createElement('td');
    td2.append(inputDate);
    row.append(td2);
    let td3 = document.createElement('td');
    td3.append(diagnosisSelect);
    td3.append(diagnosisSelect_hidden);
    row.append(td3);
    let td5 = document.createElement('td');
    td5.append(inputTerm);
    row.append(td5);
    let td6 = document.createElement('td');
    td6.append(staffSelect);
    td6.append(staffSelect_hidden);
    row.append(td6);
    let td4 = document.createElement('td');
    td4.append(inputEdit, inputSave, inputDelete);
    row.append(td4);
    $(row).prop('class', 'executed');
    $(examCont).append(row);
}

function editExam() {
    let btn = event.target;
    let obj = btn.closest('tr');
    $(obj).find('.selectPatient').removeProp('disabled');
    $(obj).find('.selectDiagnosis').removeProp('disabled');
    $(obj).find('.selectStaff').removeProp('disabled');
    $(obj).find('.inputTerm').removeProp('readonly');
    $(obj).find('.datePicker').removeProp('disabled');
    $(obj).find('.save').prop('type', 'button');
    $(obj).find('.edit').prop('type', 'hidden');
}

function saveExam() {
    let btn = event.target;
    let obj = btn.closest('tr');
    let examinationId = $(obj).find('.examinationId').val();
    let patientId = $(obj).find('.selectPatient').val();
    let diagnosisId = $(obj).find('.selectDiagnosis').val();
    let staffId = $(obj).find('.selectStaff').val();
    let term = $(obj).find('.inputTerm').val();
    let date = $(obj).find('.datePicker').val();
    if (patientId == null || diagnosisId == null || staffId == null || term.trim() === "") {
        alert("Error: invalid fields!");
    } else {
        $(obj).find('.selectPatient').prop('disabled', 'disabled');
        $(obj).find('.selectDiagnosis').prop('disabled', 'disabled');
        $(obj).find('.selectStaff').prop('disabled', 'disabled');
        $(obj).find('.inputTerm').prop('readonly', 'disabled');
        $(obj).find('.datePicker').prop('disabled', 'disabled');
        $(obj).find('.save').prop('type', 'hidden');
        $(obj).find('.edit').prop('type', 'button');
        $.get('/SaveOrUpdateExamination', {
            'id': examinationId,
            'patientId': patientId,
            'diagnosisId': diagnosisId,
            'staffId': staffId,
            'term': term,
            'date': date
        })
    }
}

function addExam() {
    let row = document.createElement('tr');
    let examCont = $('#examinationContainer');
    let cloneRow = $(examCont).find('.row').clone(true);

    let input = document.createElement('input');
    $(input).prop('class', 'examinationId').prop('type', 'hidden').prop('value', '0');


    let patientSelect = document.createElement('select');
    let a = $(cloneRow).find('.selectPatient').get(0);
    $(patientSelect).append($(a).children());
    $(patientSelect).prop('class', 'selectPatient').prop('value', '0');

    let inputDate = document.createElement('input');

    $(inputDate).prop('class', 'datePicker').prop('type', 'text').prop('value', '2000-01-01');
    $(inputDate).datepicker({
        dateFormat: 'yy-mm-dd'
    });

    let diagnosisSelect = document.createElement('select');
    let b = $(cloneRow).find('.selectDiagnosis').get(0);
    $(diagnosisSelect).append($(b).children());
    $(diagnosisSelect).prop('class', 'selectDiagnosis').prop('value', '0');

    let staffSelect = document.createElement('select');
    let c = $(cloneRow).find('.selectStaff').get(0);
    $(staffSelect).append($(c).children());
    $(staffSelect).prop('class', 'selectStaff').prop('value', '0');

    let inputTerm = document.createElement('input');
    $(inputTerm).prop('type', 'text').prop('value', '0').prop('class', 'inputTerm');

    let inputEdit = document.createElement('input');
    $(inputEdit).prop('class', 'editExam').prop('type', 'hidden');
    let inputSave = document.createElement('input');
    $(inputSave).prop('class', 'saveExam').prop('type', 'button');
    let inputDelete = document.createElement('input');
    $(inputDelete).prop('class', 'deleteExam').prop('type', 'button');

    $(inputEdit).click(function () {
        let btn = event.target;
        let obj = btn.closest('tr');
        $(obj).find('.selectPatient').removeProp('disabled');
        $(obj).find('.selectDiagnosis').removeProp('disabled');
        $(obj).find('.selectStaff').removeProp('disabled');
        $(obj).find('.inputTerm').removeProp('readonly');
        $(obj).find('.datePicker').removeProp('disabled');
        $(obj).find('.saveExam').prop('type', 'button');
        $(obj).find('.editExam').prop('type', 'hidden');
    });
    $(inputDelete).click(function () {
        let btn = event.target;
        let obj = btn.closest('tr');
        let diagnosisId = $(obj).find('.examinationId').val();
        if ($('.examinationId') === 0) {
            $(obj).remove();
        } else {
            $(obj).remove();
            $.get('/DeleteExamination', {
                'id': diagnosisId
            })
        }
    });
    $(inputSave).click(function () {
        let btn = event.target;
        let obj = btn.closest('tr');
        let examinationId = $(obj).find('.examinationId').val();
        let patientId = $(obj).find('.selectPatient').val();
        let diagnosisId = $(obj).find('.selectDiagnosis').val();
        let staffId = $(obj).find('.selectStaff').val();
        let term = $(obj).find('.inputTerm').val();
        let date = $(obj).find('.datePicker').val();
        if (patientId == null || diagnosisId == null || staffId == null || term.trim() === "") {
            alert("Error: invalid fields!");
        } else {
            $(obj).find('.selectPatient').prop('disabled', 'disabled');
            $(obj).find('.selectDiagnosis').prop('disabled', 'disabled');
            $(obj).find('.selectStaff').prop('disabled', 'disabled');
            $(obj).find('.inputTerm').prop('readonly', 'disabled');
            $(obj).find('.datePicker').prop('disabled', 'disabled');
            $(obj).find('.saveExam').prop('type', 'hidden');
            $(obj).find('.editExam').prop('type', 'button');
            $.get('/SaveOrUpdateExamination', {
                'id': examinationId,
                'patientId': patientId,
                'diagnosisId': diagnosisId,
                'staffId': staffId,
                'term': term,
                'date': date
            })
        }
    });
    $(inputTerm).on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    row.appendChild(input);
    let td1 = document.createElement('td');
    td1.append(patientSelect);
    row.append(td1);
    let td2 = document.createElement('td');
    td2.append(inputDate);
    row.append(td2);
    let td3 = document.createElement('td');
    td3.append(diagnosisSelect);
    row.append(td3);
    let td5 = document.createElement('td');
    td5.append(inputTerm);
    row.append(td5);
    let td6 = document.createElement('td');
    td6.append(staffSelect);
    row.append(td6);
    let td4 = document.createElement('td');
    td4.append(inputEdit, inputSave, inputDelete);
    row.append(td4);
    $(examCont).append(row);
}

function deleteExam() {
    let btn = event.target;
    let obj = btn.closest('tr');
    let diagnosisId = $(obj).find('.examinationId').val();
    if ($('.examinationId') === 0) {
        $(obj).remove();
    } else {
        $(obj).remove();
        $.get('/DeleteExamination', {
            'id': diagnosisId
        })
    }
}

function setActive(target) {
    $('#exam').removeClass('active');
    $('#pat').removeClass('active');
    $('#diag').removeClass('active');
    $('#spec').removeClass('active');
    $('#staff_').removeClass('active');
    let btn = target.target;
    $(btn).addClass('active')
}


