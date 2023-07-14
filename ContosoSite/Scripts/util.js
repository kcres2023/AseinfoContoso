
function SaveEnrollment() {



    let datos = {
        CourseID: $('#cdmCourseID').val(),
        StudentID: $('#cdmStudentID').val(),
        GradeID: $('#cdmGradeID').val(),
   
    }

    $.ajax({
        url: '/Enrollments/Save',
        type: "POST",
        dataType: "Json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(datos),
        async: true,
        success: function (result) {
            $('#cdmCourseID').val(0);
           // $('#cdmCourseID').change();
            $('#cdmStudentID').val(0);
            //$('#cdmStudentID').change();
            $('#cdmGradeID').val(0);
            //$('#cdmGradeID').change();
 
            GetEnrollments();
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}

function GetEnrollments() {

    let datos = {
        id: $('#StudentID').val(),

    }

    $.ajax({
        url: '/Enrollments/DetailsXStudent',
        type: "POST",
        dataType: "html",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(datos),
        async: true,
        success: function (data) {
            $("#DetalleEnrollments").html(data);

        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}
