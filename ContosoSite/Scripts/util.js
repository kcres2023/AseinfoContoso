function GetContent(Controller, Action, Parameter, ContainerId, callback) {

    var url = "/" + Controller + "/" + Action;
    GetPartialView(url, JSON.stringify(Parameter), function (data) {
        $("#" + ContainerId).html(data);
        //SetConfiguration();
        if (callback != undefined)
            callback();

        GetPartialView("/Base/ShortLinkOption", JSON.stringify({ OptionId: 0 }), function (data) {
            $("#divOptionsAccess").html(data);
        }, true);

        $(".canvi-overlay").click();

    }, true);
}

//function SetConfiguration() {
//    SetMask();
//    SetDatePicker();
//    SetClickCalendar();
//    SetDraggableModal();
//    //Deshabilitar el autocompletado en los inputs
//    RemoveInputAutoComplete();
//    InitializeSelect2();
//    //InitializeChosen();
//}

function CallAjax(vUrl, vParameter, vDataType, vSucess, RequestType, isAsync) {
    $.ajax({
        type: RequestType,
        url: vUrl,
        data: vParameter != undefined ? vParameter : {},
        contentType: "application/json; charset=utf-8",
        dataType: vDataType,
        success: vSucess,
        async: isAsync != undefined ? isAsync : true,
        failure: function (data) {
            alert(data.responseText);
        },
        error: function (data) {
            if (data.status == 0) {
                ShowMessageBS("Se ha perdido ha la conexión con el servidor remoto", "Advertencia", () => {
                    var url = $("#hdnUrlLogin").val();
                    location.href = url;
                });
                return false;
            }
            if (data.status != 200) {
                if (data != undefined && data.ErrorDescription != undefined)
                    ShowMessageBS(data.ErrorDescription, "Advertencia");
                else
                    if (data != undefined) {
                        ShowMessageBS(data.responseText, "Advertencia");
                    }
            }
        }

    });
}

function GetPartialView(vUrl, vParameter, vSucess, IsAsync) {
    CallAjax(vUrl, vParameter, "html", vSucess, "POST", (IsAsync == undefined ? true : IsAsync));
}

function ShowPopupBS(content, title, CallBackCloseButton, IsCentered, ClassName, callBack, KeyTitleTranslate, cssIcon) {
    var CounterModal = parseInt($("body").find("div[id*='myModal']").length) + 1;

    GetPartialView("/Base/_Popup", JSON.stringify({ Counter: CounterModal, KeyTitleTranslate: KeyTitleTranslate }), function (data) {
        var $body = $("body")
        $body.append(data);
        var html = $.parseHTML(data);
        var $html = $(html);
        var Counter = $html.find("input:hidden").eq(0).val();
        var $myModal = $body.find("#myModal" + Counter);

        IsCentered = (IsCentered === undefined) ? false : IsCentered;
        var $myModalLabel = $myModal.find("#myModalLabel");

        $myModalLabel.html('<i class="' + (cssIcon != undefined ? cssIcon : 'field-icon') + '"></i>' + ' ' + (title != undefined ? title : $html.find("input:hidden").eq(1).val()));

        var $body = $myModal.find(".modal-body");

        var $Content = $myModal.find(".modal-content");
        if (IsCentered)
            $Content.addClass("modal-dialog-centered");
        else
            $Content.removeClass("modal-dialog-centered");

        $body.html(content);

        $myModal.find("button.close").click(function () {
            $myModal.modal('hide');
        });

        if (CallBackCloseButton != undefined) {
            $myModal.modal('hide');
        }

        $myModal.modal({ backdrop: 'static', keyboard: true });
        $myModal.modal("show");

        var $dv = $myModal.find("div:first");

        if (ClassName != undefined) {
            $dv.removeClass("modal-lg").addClass(ClassName);
        }
        else {
            $dv.removeClass("modal-big2").addClass("modal-big2");
        }

        $myModal.on('hidden.bs.modal', function () {
            $body.html('');
            $myModal.next().remove();
            $myModal.remove();
            $("body").removeClass("modal-open");
            //CallBackCloseButton();
        });

        if (callBack != undefined)
            callBack();
        if (document.getElementById("iframePDFViewer") != null && document.getElementById("iframePDFViewer") != undefined)
            document.getElementById("iframePDFViewer").contentDocument.location.reload();
    }, false);
}

function ShowPopupBSExt(url, parameters, title, CallBackCloseButton, IsCentered, ClassName, callBack, KeyTitleTranslate, cssIcon) {
    GetPartialView(url, parameters, function (data) {
        ShowPopupBS(data, title, CallBackCloseButton, IsCentered, ClassName, callBack, KeyTitleTranslate, cssIcon);
    }, true);
}

function EditDepartamento(id) {
    GetContent('Enrollments', 'Edit', { id: id }, 'dvMainContent', function () { });
}



function SaveEnrollment() {



    let datos = {
        CourseID: $('#cdmCourseID').val(),
        StudentID: $('#cdmStudentID').val(),
        GradeID: $('#cdmGradeID').val(),
   
    }

    $.ajax({
        url: '/Enrollments/Create',
        type: "POST",
        dataType: "Json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(datos),
        async: true,
        success: function (result) {
            $('#cdmCourseID').val(0);
            $('#cdmCourseID').change();
            $('#cdmStudentID').val(0);
            $('#cdmStudentID').change();
            $('#cdmGradeID').val(0);
            $('#cdmGradeID').change();
 
            //GetEnrollments();
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}

function GetEnrollments() {

    let datos = {
        IdCompania: $('#item_IdCompania').val(),
        IdTipoCargoDescuento: $('#item_IdTipoCargoDescuento').val(),
    }

    $.ajax({
        url: '/Enrollments/GetEnrollments',
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
