// i18n.js

const en = {
    "commandInfo": {
        0: ["command", "description", "parameters"],
        "language": ["set language", "[language]"],
        "login": ["login to remote server", "[username]"],
        "logout": ["logout current login", "-"],
        "me": ["show current user information", "-"],
        "say": ["send message to all online users", "[message content]"],
        "users": ["show online user list", "-"],
        "clear": ["clear screen Ctrl+L", "-"],
        "connect": ["connect to specified user", "[username]"],
        "disconnect": ["disconnect from specified user", "[username]"],
        "tell": ["send message to specified user", "[username] [message content]"],
        "clear-history": ["clear history message record", "-"],
        "get-alias": ["get alias of specified command", "[command]"],
        "javascript": ["open javascript interpreter", "-"],
        "curl": ["fetch data from a URL", "[URL]"],
    },
    "comletionParameters": "From version 1.0.0 completion function need to have two arguments",
    "wrongPasswordTryAgain": "Wrong username or password try again!",
    "wrongPassword": "Wrong username or password!",
    "ajaxAbortError": "Error while aborting ajax call!",
    "wrongArity": "Wrong number of arguments. Function '%s' expects %s got %s!",
    "commandNotFound": "Command '%s' Not Found! Press 'help' to get help.",
    "oneRPCWithIgnore": "You can use only one rpc with describe == false or rpc without system.describe",
    "oneInterpreterFunction": "You can't use more than one function (rpc without system.describe or with option describe == false counts as one)",
    "loginFunctionMissing": "You didn't specify a login function",
    "noTokenError": "Access denied (no token)",
    "serverResponse": "Server responded",
    "wrongGreetings": "Wrong value of greetings parameter",
    "notWhileLogin": "You can't call `%s' function while in login",
    "loginIsNotAFunction": "Authenticate must be a function",
    "canExitError": "You can't exit from main interpreter",
    "invalidCompletion": "Invalid completion",
    "invalidSelector": "Sorry, but terminal said that you use invalid selector!",
    "invalidTerminalId": "Invalid Terminal ID",
    "login": "login",
    "password": "password",
    "recursiveLoop": "Recursive loop in echo detected, skip",
    "notAString": "%s function: argument is not a string",
    "redrawError": "Internal error, wrong position in cmd redraw",
    "invalidStrings": "Command %s have unclosed strings",
    "invalidMask": "Invalid mask used only string or boolean allowed",
    "defunctTerminal": "You can't call method on terminal that was destroyed",
    "setLanguageSuccess": "Language set to English",
    "unsupportedLanguage": "Unsupported language: ",
    "availableCommands": "Available commands: ",
    "availableAliases": "Available aliases: ",
    "getInfoForCommand": "You can use 'help <command>' to get detailed information about the command.",
    "history": "History message record",
    "notConnected": "Not connected to ‹%s› yet!",
    "notLoggedIn": "You are not logged in yet!",
    "invalidUsernameFormat": "Invalid username format: '%s'! Username can only contain English letters, numbers and underscores!",
    "notAllowedWhileLoggedIn": "You can't perform this action while logged in!",
    "loginSuccess": "Login success!",
    "username": "Username",
    "noOnlineUsers": "No online users yet!",
    "currentlyOnlineUsers": "Currently online users",
    "TryToConnect": "Trying to connect to ‹%s›...",
    "cannotConnectToSelf": "You can't connect to yourself!",
    "connectSuccessTo": "Connected to ‹%s› successfully!",
    "disconnectFrom": "Disconnected from ‹%s›!",
    "isTaken": "is taken! Please choose another one.",
    "serverUnavailable": "Cannot connect to the user! The user may be offline or your spelling is incorrect!",
    "loginWaiting": "Login in progress, please wait...",
    "logoutSuccess": "Logout success!",
    "You": "You",
};

const zh = {
    "commandInfo": {
        0: ["命令", "描述", "参数"],
        "language": ["设置语言", "[语言]"],
        "login": ["登录到远程服务器", "[用户名]"],
        "logout": ["退出当前登录", "-"],
        "me": ["显示当前用户信息", "-"],
        "say": ["向所有在线用户发送一条消息", "[消息内容]"],
        "users": ["显示在线用户列表", "-"],
        "clear": ["清除屏幕 Ctrl+L", "-"],
        "connect": ["连接到指定用户", "[用户名]"],
        "disconnect": ["断开与指定用户的连接", "[用户名]"],
        "tell": ["向指定用户发送一条消息", "[用户名] [消息内容]"],
        "clear-history": ["清除历史消息记录", "-"],
        "get-alias": ["获取指定命令的别名", "[命令]"],
        "javascript": ["打开javascript解释器", "-"],
        "curl": ["从指定 URL 获取数据", "[URL]"],
    },
    "comletionParameters": "从版本 1.0.0 开始，完成函数需要有两个参数",
    "wrongPasswordTryAgain": "用户名或密码错误，请重试！",
    "wrongPassword": "用户名或密码错误！",
    "ajaxAbortError": "中止 ajax 调用时出错！",
    "wrongArity": "参数数量错误。函数 '%s' 期望 %s 个参数，但得到 %s 个！",
    "commandNotFound": "命令 '%s' 未找到！输入 'help' 以获取帮助。",
    "oneRPCWithIgnore": "您只能使用一个 describe == false 的 rpc 或没有 system.describe 的 rpc",
    "oneInterpreterFunction": "您不能使用超过一个函数（没有 system.describe 的 rpc 或 describe == false 的 rpc 算作一个）",
    "loginFunctionMissing": "您没有指定登录函数",
    "noTokenError": "访问被拒绝（没有令牌）",
    "serverResponse": "服务器响应",
    "wrongGreetings": "greetings 参数的值错误",
    "notWhileLogin": "登录时不能调用 `%s' 函数",
    "loginIsNotAFunction": "Authenticate 必须是一个函数",
    "canExitError": "您不能从主解释器退出",
    "invalidCompletion": "无效的完成",
    "invalidSelector": "抱歉，但终端说您使用了无效的选择器！",
    "invalidTerminalId": "无效的终端 ID",
    "login": "登录",
    "password": "密码",
    "recursiveLoop": "在 echo 中检测到递归循环，跳过",
    "notAString": "%s 函数：参数不是字符串",
    "redrawError": "内部错误，cmd 重绘中的位置错误",
    "invalidStrings": "命令 %s 有未关闭的字符串",
    "invalidMask": "使用了无效的掩码，只允许字符串或布尔值",
    "defunctTerminal": "您不能在已销毁的终端上调用方法",
    "setLanguageSuccess": "语言已设置为中文",
    "unsupportedLanguage": "不支持的语言：",
    "availableCommands": "可用命令：",
    "availableAliases": "可用别名：",
    "getInfoForCommand": "可使用 'help <命令名>' 以获取该命令的详细信息。",
    "history": "历史消息记录",
    "notConnected": "尚未与 ‹%s› 建立连接！",
    "notLoggedIn": "当前尚未登录，请先登录！",
    "invalidUsernameFormat": "错误的用户名格式：'%s' ！用户名只能包含英文字母、数字以及下划线！",
    "notAllowedWhileLoggedIn": "当前已登录，请先退出当前登录后再进行此操作！",
    "loginSuccess": "登录成功！",
    "username": "用户名",
    "noOnlineUsers": "还没有连接任何用户！",
    "currentlyOnlineUsers": "当前在线用户",
    "TryToConnect": "正在试图与 ‹%s› 建立连接...",
    "cannotConnectToSelf": "不能与自己建立连接！",
    "connectSuccessTo": "与 ‹%s› 的连接建立成功！",
    "disconnectFrom": "与 ‹%s› 的连接已断开！",
    "isTaken": "已被占用！请更换用户名。",
    "serverUnavailable": "无法连接到该用户！该用户可能离线或您的拼写错误！",
    "loginWaiting": "登录中，请稍候...",
    "logoutSuccess": "退出登录成功！",
    "You": "你",
};

let currentLang = "en";

const get = function (key) {
    if (currentLang === "en") {
        return en[key];
    } else if (currentLang === "zh") {
        return zh[key];
    } else {
        return en[key];
    }
}

const set = function (lang) {
    const strings = (function () {
        switch (lang.toLowerCase()) {
            case "en":
            case "english":
            case "en-us":
            case "en-gb":
            case "英语":
                currentLang = "en";
                return en;
            case "zh":
            case "chinese":
            case "zh-cn":
            case "zh-tw":
            case "中文":
                currentLang = "zh";
                return zh;
            default:
                return null;
        }

    }());
    if (strings) {
        for (const key in strings) {
            $.terminal.defaults.strings[key] = strings[key];
        };
        localStorage.setItem("JSTERM_LANG", lang);
        return `[[;#00cc7a;]${get("setLanguageSuccess")}]`;
    } else { return `[[;yellow;]${get("unsupportedLanguage")}][[b;brown;]${lang}]`; }
}

export default {
    set,
    get
}