import i18n from "./i18n.js";
i18n.set(localStorage.getItem("JSTERM_LANG") || "en");

// Replace %s with the arguments
function replace(str, args) {
    return str.replace(/%s/g, function () {
        return args.shift();
    });
}

// Check the arity of the command
function checkArity(command, arity, args, term) {
    if (typeof arity === "object" && (args.length < arity[0] || args.length > arity[1])) {
        term.error(replace(i18n.get("wrongArity"), [command, arity.join("~"), args.length]));
        return false;
    } else if (typeof arity === "number" && args.length !== arity) {
        term.error(replace(i18n.get("wrongArity"), [command, arity, args.length]));
        return false;
    }
    return true;
}

// 
const commands = {
    "help": function (...args) {
        // 帮助命令，显示可用命令或特定命令的详细信息
        if (!checkArity("help", [0, 1], args, this)) return;
        if (args.length === 0) {
            let availableCommands = [];
            for (let key in commands) {
                if (typeof commands[key] === "function") {
                    availableCommands.push(`[[b;yellow;]${key}]`);
                }
            }
            this.echo(i18n.get("availableCommands") + availableCommands.sort().join(', '));
            return `[[;gray;]${i18n.get('getInfoForCommand')}]`;
        } else if (args.length === 1) {
            let command = args[0];
            const KEYS = i18n.get("commandInfo")[0];
            const VALUES = i18n.get("commandInfo")[command];
            if (VALUES) {
                const ECHO_TEXT = `\n${KEYS[0]}: [[b;yellow;]${command}],\n${KEYS[1]}: ${VALUES[0]},\n${KEYS[2]}: ${VALUES[1]}\n`;
                this.echo(ECHO_TEXT);
            } else {
                this.error(replace(i18n.get("commandNotFound"), [command]));
            }
        }
    },
    "language": function (...lang) {
        // 设置语言命令
        if (!checkArity("language", 1, lang, this)) return;
        return i18n.set(lang[0]);
    },
    "clear": function (...args) {
        // 清除屏幕命令
        if (!checkArity("clear", 0, args, this)) return;
        this.clear();
    },
    "login": function (...args) {
        // 登录命令
        if (!checkArity("login", 1, args, this)) return;
        if (!/^[a-zA-Z0-9_]+$/.test(args[0])) return `[[;red;]${i18n.get('invalidUsernameFormat')}]`;
        if (window.peer) return `[[;yellow;]${i18n.get('notAllowedWhileLoggedIn')}]`;
        window.peer = new Peer("JsTerm-" + args[0]);
        window.peer.on("open", () => {
            this.echo(`[[;#00cc7a;]${i18n.get('loginSuccess') + i18n.get('username')}: [[b;#007acc;]${args[0]}]]`);
            this.set_prompt(`[[b;;]${args[0]}>&nbsp;]`);
            window.peer.Connections = [];
        });
        window.peer.on("connection", (conn) => {
            window.peer.Connections.push(conn);
            const connId = conn.peer.split("-")[1];
            this.echo(`‹${connId}› ${replace(i18n.get("TryToConnect"), [i18n.get('You')])}`)
            conn.on("open", () => {
                this.echo(`[[b;#00cc7a;]${replace(i18n.get("connectSuccessTo"), [connId])}]`);
            });
            conn.on("data", (data) => {
                this.echo(`‹${connId}› ${data}`);
            });
            conn.on("close", () => {
                window.peer.Connections.splice(window.peer.Connections.indexOf(conn), 1);
                this.echo(`[[b;#ff5722;]${replace(i18n.get("disconnectFrom"), [connId])}]`);
            });
        });
        window.peer.on("error", (err) => {
            if (err.type == "unavailable-id") {
                window.peer = null;
                this.error(`${i18n.get('username')} "${args[0]}" ${i18n.get('isTaken')}`);
            };
            if (err.type == "peer-unavailable") {
                this.error(i18n.get('serverUnavailable'));
            };
            // console.log(err.type);
        });
        return i18n.get('loginWaiting');
    },
    "me": function (...args) {
        // 显示当前用户信息命令
        if (!checkArity("me", 0, args, this)) return;
        if (window.peer) {
            return `${i18n.get('username')}: [[;#007acc;]${window.peer.id.split("-")[1]}]\nPeerID: [[;#007acc;]${window.peer.id}]`;
        } else {
            return `[[;yellow;]${i18n.get('notLoggedIn')}]`;
        }
    },
    "logout": function (...args) {
        // 登出命令
        if (!checkArity("logout", 0, args, this)) return;
        if (window.peer) {
            window.peer.destroy();
            window.peer = null;
            this.set_prompt(">>>&nbsp;");
            return `[[b;#ff5722;]${i18n.get('logoutSuccess')}]`;
        } else {
            return `[[;yellow;]${i18n.get('notLoggedIn')}]`;
        }
    },
    "connect": function (...args) {
        // 连接到其他用户命令
        if (!checkArity("connect", 1, args, this)) return;
        if (!window.peer) return `[[;yellow;]${i18n.get('notLoggedIn')}]`;
        if (!/^[a-zA-Z0-9_]+$/.test(args[0])) return `[[;red;]${i18n.get('invalidUsernameFormat')}]`;
        if (window.peer.id.split("-")[1] === args[0]) return `[[;red;]${i18n.get('cannotConnectToSelf')}]`;
        const user = window.peer.connect("JsTerm-" + args[0]);
        user.on("open", () => {
            window.peer.Connections.push(user);
            this.echo(`[[b;#00cc7a;]${replace(i18n.get('connectSuccessTo'), [args[0]])}]`);
        });
        user.on("data", (data) => {
            this.echo(`‹${args[0]}› ${data}`);
        });
        user.on("close", () => {
            window.peer.Connections.splice(window.peer.Connections.indexOf(user), 1);
            this.echo(`[[b;#ff5722;]${replace(i18n.get("disconnectFrom"), [args[0]])}]`);
        });
        return replace(i18n.get("TryToConnect"), [args[0]]);
    },
    "users": function (...args) {
        // 显示当前在线用户命令
        if (!checkArity("users", 0, args, this)) return;
        if (!window.peer) return `[[;yellow;]${i18n.get('notLoggedIn')}]`;
        if (window.peer.Connections.length > 0) {
            return `[[b;#00cc7a;]* ${i18n.get('currentlyOnlineUsers')} *]\n${window.peer.Connections.map((conn) => conn.peer.split("-")[1]).join(", ")}`;
        } else {
            return `[[;yellow;]${i18n.get('noOnlineUsers')}]`
        }
    },
    "disconnect": function (...args) {
        // 断开与其他用户的连接命令
        if (!checkArity("disconnect", 1, args, this)) return;
        if (!window.peer) return `[[;yellow;]${i18n.get('notLoggedIn')}]`;
        if (!/^[a-zA-Z0-9_]+$/.test(args[0])) return `[[;red;]${i18n.get('invalidUsernameFormat')}]`;
        const user = window.peer.Connections.find((conn) => conn.peer.split("-")[1] === args[0]);
        if (user) {
            user.close();
        } else {
            this.error(replace(i18n.get("notConnected"), [args[0]]));
        }
    },
    "say": function (...args) {
        // 向所有连接的用户发送消息命令
        if (!checkArity("say", [1, Infinity], args, this)) return;
        if (!window.peer) return `[[;yellow;]${i18n.get('notLoggedIn')}]`;
        if (window.peer && window.peer.Connections.length > 0) {
            window.peer.Connections.forEach((conn) => {
                conn.send(args.join(" "));
            });
        }
    },
    "tell": function (...args) {
        // 向特定用户发送消息命令
        if (!checkArity("tell", [2, Infinity], args, this)) return;
        if (!window.peer) return `[[;yellow;]${i18n.get('notLoggedIn')}]`;
        if (!/^[a-zA-Z0-9_]+$/.test(args[0])) return `[[;red;]${i18n.get('invalidUsernameFormat')}]`;
        const user = window.peer.Connections.find((conn) => conn.peer.split("-")[1] === args[0]);
        if (user) {
            user.send(args.slice(1).join(" "));
        } else {
            return `[[;red;]${replace(i18n.get("notConnected"), [args[0]])}]`;
        }
    },
    "clear-history": function (...args) {
        // 清除命令历史记录命令
        if (!checkArity("cl-history", 0, args, this)) return;
        localStorage.removeItem("JS-Terminal_0_commands");
        this.clear_history_state();
        this.reset();
    },
    "javascript": function (...args) {
        // 打开JavaScript控制台命令
        if (!checkArity("javascript", 0, args, this)) return;
        const dialog = document.createElement("dialog");
        const iframe = document.createElement("iframe");
        iframe.src = "./js.html";
        dialog.appendChild(iframe);
        document.body.appendChild(dialog);
        dialog.showModal();
        const broadcastChannel = new BroadcastChannel("jsterm");
        broadcastChannel.onmessage = (event) => {
            if (event.data === "quit") {
                dialog.close();
            }
        }
        dialog.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
            }
        });
    },
    "curl": async function (...args) {
        // 从 URL 获取数据
        if (!checkArity("curl", [1, Infinity], args, this)) return;
        const url = args.join(" ");
        try {
            const response = await fetch("https://api.codetabs.com/v1/proxy/?quest=" + url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'curl/7.79.1',
                    'Accept': '*/*',
                }
            });
            if (!response.ok) {
                this.error(`Error fetching URL: ${response.status} ${response.statusText}`);
                return;
            }
            const data = await response.text();
            this.error(data);
        } catch (error) {
            this.error(`Error fetching URL: ${error.message}`);
        }
    }
}

// 别名
const alias = {
    "?": commands.help,
    "cl": commands.clear,
    "wo": commands.me,
    "quit": commands.logout,
    "clh": commands["clear-history"],
    "w": commands.tell,
    "ls": commands.users,
    "lang": commands.language,
    "js": commands.javascript,
};

commands["get-alias"] = function (...args) {
    if (!checkArity("get-alias", [0, 1], args, this)) return;
    if (args.length === 0) {
        let aliasList = [];
        for (let key in alias) {
            aliasList.push(`[[b;yellow;]${key}] => [[b;yellow;]${alias[key].name}]`)
        }
        return i18n.get("availableAliases") + "\n" + aliasList.sort().join('\n');
    } else if (args.length === 1) {
        let aliasCommand = args[0];
        if (alias[aliasCommand]) {
            this.echo(`[[b;yellow;]${aliasCommand}] => [[b;yellow;]${alias[aliasCommand].name}]`);
        } else {
            this.error(replace(i18n.get("commandNotFound"), [aliasCommand]));
        }
    }
}

export default {
    ...commands,
    ...alias
}