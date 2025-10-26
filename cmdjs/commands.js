export default
    [{
        name: 'help',
        info: {
            description: '获取命令列表或获取指定命令的帮助信息',
            arguments: ["[命令名]"],
        },
        run: (args = [], commands) => {
            if (args.length === 0) {
                let CommandList = [];
                for (let i = 0; i < commands.length; i++) {
                    CommandList.push(`<info>${commands[i].name}</info>`);
                }
                CommandList.sort();
                return `<success>* 命令列表 *</success>\n${CommandList.join(', ')}<br># 可使用 <code>/help [命令名]</code> 获取指定命令的帮助信息。`;
            } else {
                let command = commands.find(c => c.name === args[0]);
                if (command) {
                    return `命令: <info>${command.name}</info>\n描述: ${command.info.description}\n参数: ${command.info.arguments.join(', ') || '无'}`;
                } else {
                    return `<error>[help] 没有找到命令 "${args[0]}"！</error>`;
                }
            }
        }
    }, {
        name: 'getInfo',
        info: {
            description: '获取 CmdJs 应用信息',
            arguments: [],
        },
        run: () => {
            const version = "1.0.0";
            const author = "Jin-Royal";
            const date = "2024-08-19";
            return `<success>【 CmdJs 】</success>\n版本号: ${version}\n作者: ${author}\n最后更新: ${date}`;
        }
    }, {
        name: "login",
        info: {
            description: '登录到远程服务器',
            arguments: ["[用户名]"],
            argsCheck: true
        },
        run: (args) => {
            if (args.length < 1) return "<error>命令 <info>login</info> 需要一个参数：<info>[用户名]</info>。</error>";
            if (!/^[a-zA-Z0-9_]+$/.test(args[0])) return `<error>错误的用户名格式：<info>${args[0]}</info>！用户名只能包含英文字母、数字以及下划线！</error>`;
            if (window.peer) return "<warning>当前已登录，请先退出当前登录后再进行登录操作！</warning>";
            window.peer = new Peer("CmdJS-" + args[0]);
            window.peer.on("open", () => {
                window.Output(`<success>登录成功！用户名：<info><b>${args[0]}</b></info></success>`);
                window.peer.Connections = [];
            });
            window.peer.on("connection", (conn) => {
                window.peer.Connections.push(conn);
                const connId = conn.peer.split("-")[1];
                window.Output(`<info>[${connId}] 正在试图与你建立连接...</info>`)
                conn.on("open", () => {
                    window.Output(`<success>与 [${connId}] 的连接建立成功！</success>`);
                });
                conn.on("data", (data) => {
                    window.Output(`[${connId}] ${data}`);
                });
                conn.on("close", () => {
                    window.peer.Connections.splice(window.peer.Connections.indexOf(conn), 1);
                    window.Output(`<warning>与 [${connId}] 的连接断开！</warning>`);
                });
            });
            window.peer.on("error", (err) => {
                if (err.type == "unavailable-id") {
                    window.peer = null;
                    window.Output(`<error>用户名 <info>${args[0]}</info> 已被占用！请更换用户名。</error>`);
                };
                if (err.type == "peer-unavailable") {
                    window.Output(`<error>无法连接到该用户！该用户可能离线或您的拼写错误！</error>`);
                };
                // console.log(err.type);
            });
            return "<info>正在登录...</info>";
        }
    }, {
        name: "me",
        info: {
            description: '查看当前登录的用户信息',
            arguments: [],
            argsCheck: true
        },
        run: () => {
            if (window.peer) {
                return `<b><info>* 当前已登录 *</info></b>\n用户名：<b>${window.peer.id.split("-")[1]}</b>`;
            } else {
                return "<warning>尚未登录，请先登录！参见 <code>/help login</code>。</warning>";
            }
        }
    }, {
        name: "say",
        info: {
            description: '向所有在线用户发送消息',
            arguments: ["[消息内容]"],
        },
        run: (args) => {
            if (args.length < 1) return "<error>命令 <info>say</info> 需要一个参数：<info>[消息内容]</info>。</error>";
            let warning = window.peer ? "" : "\n<warning>尚未登录，请先登录！参见 <code>/help login</code>。</warning>";
            if (window.peer && window.peer.Connections.length > 0) {
                window.peer.Connections.forEach((conn) => {
                    conn.send(args.join(" "));
                });
            }
            return `[${window.peer ? window.peer.id.split("-")[1] : "unknown"}] ${args.join(" ")}` + warning;
        }
    }, {
        name: "logout",
        info: {
            description: '退出当前登录的用户',
            arguments: [],
            argsCheck: true
        },
        run: () => {
            if (window.peer) {
                window.peer.destroy();
                window.peer = null;
                return "<success>已退出登录！</success>";
            } else {
                return "<warning>尚未登录，请先登录！参见 <code>/help login</code>。</warning>";
            }
        }
    }, {
        name: "clear",
        info: {
            description: '清空输出窗口',
            arguments: [],
        },
        run: () => {
            return document.getElementById("Output").innerHTML = "";
        }
    }, {
        name: "connect",
        info: {
            description: '连接到指定用户',
            arguments: ["[用户名]"],
            argsCheck: true
        },
        run: (args) => {
            if (!window.peer) return "<warning>尚未登录，请先登录！参见 <code>/help login</code>。</warning>";
            if (args.length < 1) return "<error>命令 <info>connect</info> 需要一个参数：<info>[用户名]</info>。</error>";
            if (!/^[a-zA-Z0-9_]+$/.test(args[0])) return `<error>错误的用户名格式：<info>${args[0]}</info>！用户名只能包含英文字母、数字以及下划线！</error>`;
            if (window.peer.id.split("-")[1] === args[0]) return "<error>不能与自己建立连接！</error>";
            const user = window.peer.connect("CmdJS-" + args[0]);
            user.on("open", () => {
                window.peer.Connections.push(user);
                window.Output(`<success>与 [${args[0]}] 的连接建立成功！</success>`);
            });
            user.on("data", (data) => {
                window.Output(`[${args[0]}] ${data}`);
            });
            user.on("close", () => {
                window.peer.Connections.splice(window.peer.Connections.indexOf(user), 1);
                window.Output(`<warning>与 [${args[0]}] 的连接断开！</warning>`);
            });
            return `<info>正在试图与 [${args[0]}] 建立连接...</info>`;
        }
    }, {
        name: "disconnect",
        info: {
            description: '断开与指定用户的连接',
            arguments: ["[用户名]"],
            argsCheck: true
        },
        run: (args) => {
            if (!window.peer) return "<warning>尚未登录，请先登录！参见 <code>/help login</code>。</warning>";
            if (args.length < 1) return "<error>命令 <info>disconnect</info> 需要一个参数：<info>[用户名]</info>。</error>";
            if (!/^[a-zA-Z0-9_]+$/.test(args[0])) return `<error>错误的用户名格式：<info>${args[0]}</info>！用户名只能包含英文字母、数字以及下划线！</error>`;
            const user = window.peer.Connections.find((conn) => conn.peer.split("-")[1] === args[0]);
            if (user) {
                return user.close() || "";
            } else {
                return window.Output(`<error>尚未与 [${args[0]}] 建立连接！</error>`);
            }
        }
    }, {
        name: "users",
        info: {
            description: '查看当前在线用户列表',
            arguments: [],
            argsCheck: true
        },
        run: () => {
            if (!window.peer) return "<warning>尚未登录，请先登录！参见 <code>/help login</code>。</warning>";
            if (window.peer.Connections.length > 0) {
                return `<b><info>* 当前在线用户 *</info></b>\n${window.peer.Connections.map((conn) => conn.peer.split("-")[1]).join(", ")}`;
            } else {
                return "当前没有在线用户！";
            }
        }
    }, {
        name: "tell",
        info: {
            description: '向指定用户发送消息',
            arguments: ["[用户名]", "[消息内容]"],
        },
        run: (args) => {
            if (!window.peer) return "<warning>尚未登录，请先登录！参见 <code>/help login</code>。</warning>";
            if (args.length < 2) return "<error>命令 <info>tell</info> 需要两个参数：<info>[用户名]</info> 和 <info>[消息内容]</info>。</error>";
            if (!/^[a-zA-Z0-9_]+$/.test(args[0])) return `<error>错误的用户名格式：<info>${args[0]}</info>！用户名只能包含英文字母、数字以及下划线！</error>`;
            const user = window.peer.Connections.find((conn) => conn.peer.split("-")[1] === args[0]);
            if (user) {
                user.send(args.slice(1).join(" "));
                return `[${window.peer.id.split("-")[1]} > ${args[0]}] ${args.slice(1).join(" ")}`;
            } else {
                return `<error>尚未与 [${args[0]}] 建立连接！</error>`;
            }
        }
    }];