/* ==============================================================  

    ██████╗ ███████╗███████╗████████╗███████╗    ███████╗███████╗██████╗ ███████╗
    ██╔══██╗██╔══██║██╔════╝   ██╔══╝██╔════╝    ██╔════╝██╔══██║██╔══██╗██╔════╝
    ██████╔╝███████║███████╗   ██║   █████╗      ██║     ██║  ██║██║  ██║█████╗
    ██╔═══╝ ██╔══██║╚════██║   ██║   ██╔══╝      ██║     ██║  ██║██║  ██║██╔══╝
    ██║     ██║  ██║███████║   ██║   ███████╗    ███████╗███████║██████╔╝███████╗ 
    ╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝    ╚══════╝╚══════╝╚═════╝ ╚══════╝

   
    ╔════╦═══╦═══╦═╗╔═╦══╦═╗─╔╦═══╦╗
    ║╔╗╔╗║╔══╣╔═╗║║╚╝║╠╣╠╣║╚╗║║╔═╗║║
    ╚╝║║╚╣╚══╣╚═╝║╔╗╔╗║║║║╔╗╚╝║║─║║║
    ──║║─║╔══╣╔╗╔╣║║║║║║║║║╚╗║║╚═╝║║─╔╗
    ──║║─║╚══╣║║╚╣║║║║╠╣╠╣║─║║║╔═╗║╚═╝║
    ──╚╝─╚═══╩╝╚═╩╝╚╝╚╩══╩╝─╚═╩╝─╚╩═══╝


    This is the terminal main motor code, which is used to control the terminal and the terminal's output.
    All execution will be executed in this Class constructor.


    Author: Zheng Lin Lei
    Email: zheng9112003@icloud.com
    Github: https://github.com/ZhengLinLei

    Project: Paste Code
    Github: https://github.com/ZhengLinLei/paste-code


    © 2022 ZhengLinLei <zheng9112003@icloud.com>

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


============================================================== */


class Terminal{
    #hash; // Hash of the terminal
    #history = []; // History of the terminal
    help = `
        <div>
            <pre>
<span class="token comment">-----------------------------</span>
    <span class="class-name token">Commands:</span>
        - window [add | remove] [:int]
            usage:
                window add 3
        
        - terminal [close | open]
            usage:
                terminal close
        
        - terminal [color | bg] [set | get | reset] [:hex | :rgb | :hsl]    (not implemented)
            usage:
                terminal color set #fff
        
        - config [set | get | reset]
            usage:
                config get

        - font [set | get | reset] [:int]
            usage:
                font set +3

        - theme [set | get | reset | list] [:string]
            usage:
                theme set dark

        - cls
    
        - exit
    
        - help
    
    <span class="class-name token">More info:</span>
        <a href="https://github.com/ZhengLinLei/paste-code">https://github.com/ZhengLinLei/paste-code</a>
    
    <span class="class-name token">Issues:</span>
        <a href="https://github.com/ZhengLinLei/paste-code/issues">https://github.com/ZhengLinLei/paste-code/issues</a>
    
    <span class="class-name token">Author:</span>
        <a href="https://github.com/ZhengLinLei">Zheng Lin Lei</a>
<span class="token comment">-----------------------------</span>
            </pre>
        </div>
    `;

    constructor(opt){
        this.#hash = opt;
    }

    commands = {
        window: ["add", "remove"],
        terminal: ["close", "open"],
        cls: 0,
        exit: 0,
        help: 0,
        config: ["set", "get", "reset"],
        font: ["set", "get", "reset"],
        theme: ["set", "get", "reset", "list"],
    }
    // Execution
    exec = (arg) => {
        return new Promise((resolve) => {
            let args = arg.split(" ");

            this.#history.push(arg);

            if(Object.keys(this.commands).includes(args[0])){
                if(this.commands[args[0]] == 0 || this.commands[args[0]].includes(args[1])){
                    resolve(this.execution[args[0]](args));
                }

                resolve([0, `Path "${args[1]}" not found`]);
            }

            resolve([0, `Command "${args[0]}" not found`]);
        });
    };

    // terminal
    execution = {
        "terminal": (opt) => {
            this.#hash.terminal.toggleFnc(opt[1]);

            return [1, ""];
        },
        "window": (opt) => {
            let loop = 0;
            if(opt.length > 2){
                if(parseInt(opt[2])) loop = parseInt(opt[2]);
                else return [0, `Invalid argument ${opt[2]}`];
            }else loop = 1;

            for (let i = 0; i < loop; i++) {
                (opt[1] == "add") ? this.#hash.window.add() : this.#hash.window.remove();
            }

            return [1, ""];
        },
        "exit": () => {
            this.#hash.terminal.toggleFnc('close');

            return [1, ""];
        },
        "cls": () => {
            this.#hash.terminal.output.innerHTML = "";
            this.#hash.terminal.caret.style.transform = "translateX(0px)";
            this.#hash.terminal.config.position = 0;

            return [1, ""];
        },
        "help": () => {
            return [1, this.help]
        },
        "config": (opt)=>{
            let data = {}, result = [1,
                `
                <div>
                    <span>Reload required <a href="javascript:location.reload()">[yes]</a><a>[no]</a</span>
                </div>
                `
            ];

            switch (opt[1]) {
                case "set":
                    data = JSON.parse(opt.slice(2).join(""));

                    Object.entries(data).forEach(([key, value]) => {
                        if(value === "undefined" || value === "null" || value === "NaN") result = [0, `Invalid value ${value}`]; // Invalid value
                        
                        if(value != "default"){
                            localStorage.setItem(key, value); // key - value
                        }else{
                            localStorage.removeItem(key);
                        }
                    })
                    break;
            
                case "get":
                    data = {
                        terminal : localStorage.getItem("terminal") || false,
                        terminalHeight: localStorage.getItem("terminalHeight") || "default",
                        terminalOptWidth: localStorage.getItem("terminalOptWidth") || "default",
                        fontSize: localStorage.getItem("fontSize") || "default",
                        theme: localStorage.getItem("theme") || "default",                        
                    }

                    result = [1, 
                        `
                        <div>
                            <pre><code class="language-json">${Prism.highlight(JSON.stringify(data, null, 4).trim(), Prism.languages.json, 'json')}</code></pre>
                        </div>
                        <div>
                            <span>config set ${JSON.stringify(data)}</span>
                        </div>
                        `
                    ]
                    break;

                case "reset":
                    localStorage.clear();
                    break;
            }
            return result;
        },
        "font": (opt) => {
            let result = [1, ""], root = document.documentElement || document.querySelector(':root');
            let newFontSize = parseInt(window.getComputedStyle(root, null).getPropertyValue('font-size').replace("px", ""));

            switch (opt[1]) {
                case "set":
                    if(opt[2].match(/[-+]/)){
                        // Get current font size
                        let currentFontSize = newFontSize;

                        // Get the value
                        let value = parseInt(opt[2]);

                        // Set the new font size
                        newFontSize = currentFontSize + value;
                    }else
                        newFontSize = parseInt(opt[2]);

                break;

                case "get":
                    result = [1, `<div><span>Font size: <span class="token comment">${newFontSize}px</span></span></div>`];
                break;

                case "reset":
                    newFontSize = 12;
                break;
            }

            if(opt[1] != "get")
                root.style.setProperty('--font-size', `${newFontSize}px`);

                // Save to local storage
                localStorage.setItem("fontSize", newFontSize);

            return result;
        },
        "theme": (opt) => {
            let result = [1, ""];
            switch (opt[1]) {
                case "set":
                    if(!this.#hash.theme.list.includes(opt[2])){
                        result = [0, `Theme "${opt[2]}" not found`];
                    }else{
                        this.#hash.theme.set(opt[2]);
                    }
                    break;
            
                case "get":
                    result = [1, `<div><span>Current theme: <span class="token comment">${(localStorage.getItem('theme') || this.#hash.theme.list[0])}</span></span></div>`];
                    break;

                case "reset":
                    this.#hash.theme.set("light");
                    break;

                case "list":
                    result = [1, `<div><span>Theme list: <span class="token comment">${this.#hash.theme.list.join(", ")}</span></span><p>See <a href="https://github.com/ZhengLinLei/paste-code/blob/main/THEME.md">https://github.com/ZhengLinLei/paste-code/blob/main/THEME.md</a> to customise themes.</div>`];
                    break;
            }

            return result;
        }
    }

    getHistory(){
        return this.#history;
    }
}