(function (W) {
    let _Init = false;
    let _Issues = {
        default: function (_args) {
            if (!_Init) {
                _Init = true;
                $('header').slideToggle(666);
            }
            var _e = [];
            if (arguments.length > 1) {
                const _args = arguments;
                for (const i in _args) { _e.push(_args[i]) };
                return Array.from(_e);
            } else {
                _e = arguments[0];
                return _e;
            }

        },
        Console: function (_args, _event) {
            if (_args.length <= 1) { _args = _args[0]; }
            else { _args = Array.from(_args); }
            switch (_event) {
                case 'Error':
                    console.error(_args)
                    break;
                case 'Info':
                    console.info(_args);
                    break;
                default:
                    console.log(_args);
                    break;
            }
        },
        ShowDOM: function (_args, _bgColor = "") {
            if (!_args[0]) { _args = ["undefined"] }
            for (const i in _args) { $("#Issues").append($("<p>").text(_args[i]).css({ "background-color": _bgColor })) }
        },
        Log: function () {
            this.Console(this.default(arguments), "Log");
            this.ShowDOM(this.default(arguments), "");
        },
        Error: function () {
            this.Console(this.default(arguments), "Error")
            this.ShowDOM(this.default(arguments), "rgba(165, 42, 42, .55)");
        },
        Info: function () {
            this.Console(this.default(arguments), "Info");
            this.ShowDOM(this.default(arguments), "rgba(95, 158, 160, .55)");
        },
        Init: function () {
            $("#Issues>*").hide(555, "linear"); // 隐藏元素
            setTimeout(() => {
                $("#Issues").hide();
                $("#Issues").html("");
                _Issues.Info("# The Issues Info is Running......");
                $("#Issues").show(666);
                setTimeout(() => {
                    $("#dev_area").focus(); // 获取元素的焦点
                }, 888)
            }, 666);
            return "Loading...";
        }
    }

    // 获取调试文本域的数据并执行代码
    $("#dev_area").keypress(function (e) {
        if (e.which === 10) { // 10表示 Ctrl + Ent 的键值
            const Val = $(this).val();
            if (Val == "") { return; }
            $(this).val(""); // 清除元素的值
            $(this).blur(); // 去除元素的焦点
            try {
                const Command = () => eval(Val);
                _Issues.ShowDOM(_Issues.default([Command]), "");
            } catch (e) { _Issues.Error(e); }
            // 滚动到#Issues底端
            $("#Issues").scrollTop($("#Issues")[0].scrollHeight - $("#Issues").height());
        } else { return e.which; }
    });

    // 键盘事件
    $(document).keydown(function (e) {
        if (e.which === 27) { // ESC键
            $("#dev_area").blur();
            return;
        }; $("#dev_area").focus();
    });

    W._Issues = _Issues;
})(window)