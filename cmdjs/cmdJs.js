class CmdJsObj {
    constructor(commands) {
        this.commands = [];
        this.init(commands);
    }

    init(commands) {
        !Array.isArray(commands) && console.error('Commands must be an array!');
        for (let i = 0; i < commands.length; i++) {
            if (this.commands.some(c => c.name === commands[i].name)) {
                console.warn(`Command "${commands[i].name}" already exists!`);
                continue;
            }
            this.commands.push({
                name: commands[i].name,
                info: commands[i].info,
                run: commands[i].run,
            });
        }
    }

    execute(ComText) {
        if (!ComText.startsWith('/')) {
            const Say = this.commands.find(c => c.name === "say");
            return Say.run([ComText]);
        }
        ComText = ComText.slice(1).trim();
        if (ComText === '') return '<warning>请键入命令！</warning>';
        const ComArr = ComText.split(' ');
        const ComName = ComArr[0];
        const ComArgs = ComArr.slice(1);
        const Com = this.commands.find(c => c.name === ComName);
        if (Com) {
            if (ComArgs.length > Com.info.arguments.length && Com.info.argsCheck) window.Output(`<warning>命令 "${ComName}" 要求 ${Com.info.arguments.length} 个参数，但输入了 ${ComArgs.length} 个！</warning>`);
            if (ComName === "help") return Com.run(ComArgs, this.commands);
            else return Com.run(ComArgs);
        } else {
            return `<error>未知命令 <info>${ComName}</info> ！请键入 <code>/help</code> 获取命令列表。</error>`;
        }
    }

}
import commands from './commands.js';
const CmdJS = new CmdJsObj(commands);

export default CmdJS;