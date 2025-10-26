import COMMANDS from './commands.js';
import _APP_ from './config.js';

var term = $('body').terminal(COMMANDS, {
    greetings: false,
    name: _APP_.name,
    prompt: '>>>&nbsp;',
    exit: true,
    checkArity: false,
    onInit: (term) => {
        term.echo(`<img src="./JSTERM.png" style="-webkit-user-drag: none;user-select: none;max-width: 85vw;height: auto;" alt="JS-Terminal" />`, { raw: true });
        term.echo(`[[b;#007acc;]Version ${_APP_.version} By ${_APP_.author}]`);
        console.log(`${_APP_.greetings}\n%cVersion ${_APP_.version} By ${_APP_.author}`,
            'color: #007acc; font-weight: bold;');
    },
});