var Asgard = {
    "doAction": function (url, success_url) {
        $.getJSON(url, function (data) {
            if (data.code == 200) {
                alert("操作成功");
                if (success_url) {
                    window.location.href = success_url;
                } else {
                    window.location.reload(true)
                }
            } else {
                alert(data.message);
            }
        })
    },
    "postAction": function (url, data, success_url) {
        $.post(url, data, function (info) {
            if (info.code == 200) {
                alert("操作成功");
                if (success_url) {
                    window.location.href = success_url;
                } else {
                    window.location.reload(true)
                }
            } else {
                alert(info.message);
            }
        })
    },
    "SearchSubmit": function () {
        $("#main").find("form").submit();
    },
    "ActionShow": function () {
        $(this).parent().parent().prev().toggle();
    },
    "ActionBatch": function () {
        $(".batch").toggle();
    },
    "Action": function () {
        var mod = $("#main").attr("data-mod");
        var action = $(this).attr("action");
        var url = "/" + mod + "/" + action
        window.location.href = url;
    },
    "ActionWithID": function () {
        var mod = $("#main").attr("data-mod");
        var action = $(this).attr("action");
        var id = $(this).parents(".cmd-info").attr("data-bind");
        var url = "/" + mod + "/" + action + "?id=" + id;
        window.location.href = url;
    },
    "JumpWithID": function () {
        var mod = $("#main").attr("data-mod");
        var action = $(this).attr("action");
        var id = $(this).parents(".cmd-info").attr("data-bind");
        var url = "/" + action + "/" + mod + "?id=" + id;
        window.location.href = url;
    },
    "runAction": function () {
        var mod = $("#main").attr("data-mod");
        var action = $(this).attr("action");
        var id = $(this).parents(".cmd-info").attr("data-bind");
        var url = "/" + mod + "/" + action;
        Asgard.postAction(url, { "id": id });
    },
    "runBatchAction": function () {
        var ids = [];
        var status = "";
        var valid = true;
        $(".batch").each(function () {
            if ($(this).is(':checked')) {
                ids.push($(this).attr("data-bind"))
                var _status = $(this).attr("status");
                if (status == "") {
                    status = _status; 
                } else if (status != _status) {
                    valid = false;
                    return
                }
            }
        });
        if (!valid) {
            alert("请选择状态相同的对象进行批量操作!");
            return
        }
        var mod = $("#main").attr("data-mod");
        var action = $(this).attr("action");
        switch (action) {
            case "batch-start":
                if (status != "0" && status != "2") {
                    alert("只有停止和暂停状态的对象才能进行启动操作!");
                    return false;
                }
                break;
            case "batch-restart":
                if (status != "1") {
                    alert("只有运行状态的对象才能进行重启操作!");
                    return false;
                }
                break;
            case "batch-pause":
                if (status != "0" && status != "1") {
                    alert("只有停止和运行状态的对象才能进行暂停操作!");
                    return false;
                }
                break;
            case "batch-delete":
                if (status != "2") {
                    alert("只有暂停状态的对象才能进行删除操作!");
                    return false;
                }
                break;
            default:
                break;
        }
        var id = $(this).parents(".cmd-info").attr("data-bind");
        var url = "/" + mod + "/" + action;
        Asgard.postAction(url, { "ids": ids.join(",") });
    },
    "listDelegate": function (mod) {
        $("#main").delegate("button[action=list]", "click", Asgard.Action)
            .delegate("button[action=add]", "click", Asgard.Action)
            .delegate("button[action=submit]", "click", Asgard.SearchSubmit)
            .delegate("button[action=show]", "click", Asgard.ActionShow)
            .delegate("button[action=edit]", "click", Asgard.ActionWithID)
            .delegate("button[action=monitor]", "click", Asgard.JumpWithID)
            .delegate("button[action=archive]", "click", Asgard.JumpWithID)
            .delegate("a[action=out_log]", "click", Asgard.JumpWithID)
            .delegate("a[action=err_log]", "click", Asgard.JumpWithID)
            .delegate("button[action=start]", "click", Asgard.runAction)
            .delegate("button[action=restart]", "click", Asgard.runAction)
            .delegate("button[action=pause]", "click", Asgard.runAction)
            .delegate("button[action=delete]", "click", Asgard.runAction)
            .delegate("button[action=copy]", "click", Asgard.runAction)
            .delegate("button[action=batch]", "click", Asgard.ActionBatch)
            .delegate("button[action=batch-start]", "click", Asgard.runBatchAction)
            .delegate("button[action=batch-restart]", "click", Asgard.runBatchAction)
            .delegate("button[action=batch-pause]", "click", Asgard.runBatchAction)
            .delegate("button[action=batch-delete]", "click", Asgard.runBatchAction);
    }
}