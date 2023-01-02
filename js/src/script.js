// Tab Size: Default 4

let setTabSize = (size) => {
    document.querySelectorAll('.textarea div pre code').forEach(textarea => {
        textarea.style.tabSize = `${(size != 0 ? size : 4)}`;
        textarea.style.MozTabSize = `${(size != 0 ? size : 4)}`;
    });

    tabSize = size;

};
let tabSize = 4;

// ==============================================================

window.addEventListener('load', () => {
    // ==== DARK MODE =========
    // Check if dark mode is enabled
    if (localStorage.getItem('dark') === 'true') {
        document.body.classList.add('dark');
    }


    // ==============================================================
    // === LZMA =========
    var lzma = new LZMA("./js/src/lzma_worker.js");

    // ==== ROOT =========
    const ROOT = {
        url: document.location,
    }
    const WINDOW_CONFIG = {
        parent: document.querySelector('.textarea'),
        max: 4,
        min: 1,
        label: 'Window',
        current: 0,
        windows: [],
        codeWindow: [],
        windows_value: [],
        lineActive: [],
    }

    // ==== UPDATE CODE =========
    const _update_code = (window) => {
        // Get window index
        const index = WINDOW_CONFIG.windows.indexOf(window);
        // Get code window
        const codeWindow = WINDOW_CONFIG.codeWindow[index];

        // Get first line of code
        const _LINES = window.value.split('\n')
        const firstLine = _LINES[0];
        if(firstLine.includes("!")) {
            // Get language
            let arr = firstLine.split('!');
            const language = arr[arr.length-1].toLowerCase();  // Fixed ISSUE #8

            // Set language
            codeWindow.setAttribute('class', `language-${language}`);
        }

        codeWindow.innerHTML = window.value.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */

        Prism.highlightElement(codeWindow);


        // Update line numbers
        document.querySelector(`.w-${index}`).style
        .setProperty('--padd',
            (_LINES.length >= 100) ?
                (_LINES.length >= 1000) ? 
                    (_LINES.length >= 10000) ?
                        "60px"
                    : "50px"
                : "40px"
            : "30px"
        );

        // Get line numbers
        const lineNumbers = window.parentElement.querySelector('.line-numbers-rows');
        lineNumbers.innerHTML = Array(_LINES.length).fill('<span></span>').join('')

        // Check if window is focused
        if(window === document.activeElement){
            // Update line numbers
            _set_lines(window);
        }
    }

    // ====  SET LINES  =========
    const _set_lines = (window, delay=-1) => {
        const index = window.value.substring(0, window.selectionStart).split("\n").length;
        const lines = window.parentElement.querySelector('.line-numbers-rows');

        // Set line active

        if((index + delay) < lines.children.length && !lines.children[index+delay].classList.contains('current')) {
            // Clear lines class
            _clear_lines(window);

            // Set current line
            lines.children[index+delay].classList.add('current');
        }
    }
    const _clear_lines = (window) => {
        const lines = window.parentElement.querySelector('.line-numbers-rows');

        // Clear lines class
        Array.from(lines.children).forEach(line => {
            line.classList.remove('current');
        });
    }

    // ==== ADD WINDOWS =========

    const addWindow = () => {
        if (WINDOW_CONFIG.current < WINDOW_CONFIG.max) {
            // Add window
            // Create this structure
            // <div>
            //     <div class="line-numbers-rows"></div>
            //     <textarea class="textarea-main" spellcheck="false" oninput="_update_code(this)"></textarea>
            //     <pre aria-hidden="true">
            //         <code></code>
            //     </pre>
            // </div>

            // Add window to array
            const windowParent = document.createElement('div');
            //
            const codeWindow = document.createElement('pre');
            codeWindow.setAttribute('aria-hidden', 'true');
            //
            const code = document.createElement('code');
            //
            // Line Numbers
            const lineNumbers = document.createElement('span');
            lineNumbers.setAttribute('aria-hidden', 'true');
            lineNumbers.setAttribute('class', 'line-numbers-rows no-select');
            lineNumbers.innerHTML = '<span></span>';

            // Window label
            const newWindow = document.createElement('textarea');
            newWindow.setAttribute('class', 'textarea-main');
            newWindow.setAttribute('spellcheck', 'false');
            newWindow.setAttribute('outline', 'none');
            newWindow.setAttribute('autocorrect', 'off');
            newWindow.setAttribute('autocapitalize', 'off');
            newWindow.setAttribute('aria-label', 'Paste Code');
            newWindow.setAttribute('tabindex', '0');
            newWindow.addEventListener('input', () => _update_code(newWindow));
            newWindow.addEventListener('mouseup', () =>  _set_lines(newWindow)); // ISSUE LINES NUMBER; UPDATE #9

            // Only for mobile devices
            if((('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))){
                newWindow.addEventListener('touchend', () =>  _set_lines(newWindow));   // Update lines number
            }

            newWindow.addEventListener('scroll', () => {
                // Get and set x and y
                codeWindow.scrollTo(newWindow.scrollLeft, newWindow.scrollTop);
                lineNumbers.scrollTo(newWindow.scrollLeft, newWindow.scrollTop);
                // codeWindow.scrollTop = newWindow.scrollTop;
                // codeWindow.scrollLeft = newWindow.scrollLeft;
            });
            newWindow.addEventListener('keydown', (e) => {
                // Write tab on tab press
                if(e.key == 'Tab' || e.keyCode == 9 || e.which == 9) {
                    e.preventDefault();

                    const start = newWindow.selectionStart;
                    newWindow.value = newWindow.value.substring(0, start) + " ".repeat(tabSize) + newWindow.value.substring(newWindow.selectionEnd);
                    // fix caret position
                    newWindow.selectionStart = newWindow.selectionEnd = start + tabSize;

                    // Update code
                    _update_code(newWindow)

                }
                // Update lines number if the user jump lines
                if(e.key == 'ArrowUp' || e.keyCode == 38 || e.which == 38){
                    // Overload line numbers fnc
                    _set_lines(newWindow, delay=-2);
                }
                
                if(e.key == 'ArrowDown' || e.keyCode == 40 || e.which == 40){
                    // Overload line numbers fnc
                    _set_lines(newWindow, delay=0);
                }


                // ======= SHORTCUTS =======
                // Select line
                if (e.altKey && e.key == 'l' || e.altKey && e.keyCode == 76 || e.altKey && e.which == 76){
                    e.preventDefault();
                    
                    // Select all line from textarea
                    const start = newWindow.value.substring(0, newWindow.selectionStart).lastIndexOf("\n") + 1;
                    const end = newWindow.value.substring(newWindow.selectionEnd).indexOf("\n") + newWindow.selectionEnd;
                    newWindow.setSelectionRange(start, end);
                }
                // // Move line up and the line above down
                // if (e.altKey && e.key == 'ArrowUp' || e.altKey && e.keyCode == 38 || e.altKey && e.which == 38){
                //     e.preventDefault();

                //     // Get above and current line
                //     const start = newWindow.value.substring(0, newWindow.selectionStart).lastIndexOf("\n") + 1;
                //     const end = newWindow.value.substring(newWindow.selectionEnd).indexOf("\n") + newWindow.selectionEnd;

                //     // Get above line
                //     const aboveStart = newWindow.value.substring(0, start - 1).lastIndexOf("\n") + 1;
                //     const aboveEnd = newWindow.value.substring(start).indexOf("\n") + start;

                //     // Get lines
                //     const aboveLine = newWindow.value.substring(aboveStart, aboveEnd);
                //     const line = newWindow.value.substring(start, end);

                //     // replace line
                //     newWindow.value = newWindow.value.substring(0, aboveStart) + line + newWindow.value.substring(aboveEnd);

                //     // Update code
                //     _update_code(newWindow);

                //     // Select
                //     // newWindow.setSelectionRange(start - 1, end - 1);
                // }
                // // Move line down
                // if (e.altKey && e.key == 'ArrowDown' || e.altKey && e.keyCode == 40 || e.altKey && e.which == 40){
                //     e.preventDefault();
                    
                //     // Get line
                //     const start = newWindow.value.substring(0, newWindow.selectionStart).lastIndexOf("\n") + 1;
                //     const end = newWindow.value.substring(newWindow.selectionEnd).indexOf("\n") + newWindow.selectionEnd;
                //     const line = newWindow.value.substring(start, end);

                //     // Remove line
                //     newWindow.value = newWindow.value.substring(0, start) + newWindow.value.substring(end);

                //     // Add line
                //     newWindow.value = newWindow.value.substring(0, end) + line + newWindow.value.substring(end);

                //     // Update code
                //     _update_code(newWindow);

                //     // Select line
                //     newWindow.setSelectionRange(end, end + line.length);
                // }
            });
            newWindow.addEventListener('keyup', (e) => {
                // Update lines number if the user jump lines
                if
                    ((e.key == 'Enter' || e.keyCode == 13 || e.which == 13)
                    || (e.key == 'ArrowUp' || e.keyCode == 38 || e.which == 38)
                    || (e.key == 'ArrowDown' || e.keyCode == 40 || e.which == 40)
                    || (e.key == 'ArrowLeft' || e.keyCode == 37 || e.which == 37)
                    || (e.key == 'ArrowRight' || e.keyCode == 39 || e.which == 39))
                {
                    // Overload line numbers fnc
                    _set_lines(newWindow);
                }
            });   // Update line numbers

            // Onfocusout
            newWindow.addEventListener('focusout', () => {
                // Clear lines class
                _clear_lines(newWindow);
            });


            // Insert 
            codeWindow.appendChild(code);
            windowParent.appendChild(lineNumbers);
            windowParent.appendChild(newWindow);
            windowParent.appendChild(codeWindow);
            WINDOW_CONFIG.parent.appendChild(windowParent);
            WINDOW_CONFIG.windows.push(newWindow);
            WINDOW_CONFIG.current++;

            // Code insert
            WINDOW_CONFIG.codeWindow.push(code);

            // Update attribute for window
            windowParent.classList.add(`w-${WINDOW_CONFIG.current-1}`);         // ------> To update Line Numbers Padding
        }
    }
    // ===== REMOVE WINDOWS =====
    const removeWindow = () => {
        if (WINDOW_CONFIG.current > WINDOW_CONFIG.min) {
            // Remove last window
            WINDOW_CONFIG.parent.removeChild(WINDOW_CONFIG.windows[WINDOW_CONFIG.windows.length - 1].parentElement);
            // Remove last window from array
            WINDOW_CONFIG.windows.pop();
            WINDOW_CONFIG.codeWindow.pop(); // Remove code window ISSUE #7
            WINDOW_CONFIG.current--;
        }
    }

    // === Close text offer =====
    const closeOffer = () =>  document.querySelector("body > footer").classList.remove("text-offer");

    // ==== MAIN =========
    const __main__ = () => {
        // Open Terminal
        window.addEventListener('keydown', (e) => {
            if((e.metaKey || e.ctrlKey || e.altKey) && e.key == 't' || (e.metaKey || e.ctrlKey || e.altKey) && e.keyCode == 84 || (e.metaKey || e.ctrlKey || e.altKey) && e.which == 84) {
                e.preventDefault();
                _toggle_terminal();
            }
        });
        // Invert color
        const invert = document.querySelector('.invert-color');
        // Toggle invert color
        invert.addEventListener('click', () => {
            document.body.classList.toggle('dark');

            // Save to local storage
            if(document.body.classList.contains('dark')) {
                localStorage.setItem('dark', true);

                return;
            }

            localStorage.setItem('dark', false);
        });

        // If the url hasn't generated any, create one
        if(WINDOW_CONFIG.current == 0) addWindow();

        // Add window
        document.querySelector('#add-w').addEventListener('click', addWindow);
        // Remove window
        document.querySelector('#remove-w').addEventListener('click', removeWindow);


        // ==== URL GENERATOR =========
        document.querySelectorAll('.generate-url').forEach(btn => {
            btn.addEventListener('click', () => {
                const btn_type = btn.getAttribute('data-type');

                // Get all windows
                WINDOW_CONFIG.windows.forEach((window, index) => WINDOW_CONFIG.windows_value[index] = window.value);

                // Compress
                lzma.compress(JSON.stringify(WINDOW_CONFIG.windows_value), 1, (compressed, error) => {
                    if (error) {
                        alert("Failed to compress data: " + error);
                        return;
                    }
                    let reader = new FileReader();
                    reader.onload = function () {
                        let base64 = reader.result.substr(reader.result.indexOf(",") + 1);
                        let url = "https://" + ROOT.url.host + ROOT.url.pathname + "#" + base64;
                        var result = (btn_type === 'markdown') ? "[paste](" + url + ")" : url;

                        // Copy to clipboard
                        navigator.clipboard.writeText(result);
                        document.querySelector('.nav-text-offer input').value = result;
                        document.querySelector("body > footer").classList.add("text-offer");
                    };
                    reader.readAsDataURL(new Blob([new Uint8Array(compressed)]));
                });
            });
        });

        // === CANCEL TEXT OFFER ====
        document.querySelector('a.cancel-url').addEventListener('click', closeOffer);

        // === COPY TEXT OFFER ====
        document.querySelector('a.copy-url').addEventListener('click', ()=>{
            var input = document.querySelector('.nav-text-offer input');
            input.select();
            document.execCommand('copy');
            
            closeOffer()
        });


        // ==== TERMINAL =========
        const _toggle_terminal = (type="toggle") => {
            switch (type) {
                case "open":
                    document.querySelector('#terminal').classList.add('open');
                    terminal.focus();
                    break;
                case "close":
                    document.querySelector('#terminal').classList.remove('open');
                    break;
                case "toggle":
                    document.querySelector('#terminal').classList.toggle('open');
                    terminal.focus();
                    break;
            }
            
        }

        const _option_click = (e) => {
            switch (e) {
                case "add":
                    addWindow();
                    break;
                case "remove":
                    removeWindow();
                    break;
                case "exit":
                    _toggle_terminal("close");
                    break;

            }
        }

        const terminal = document.querySelector('#terminal-main');
        const terminalInput = document.querySelector('#terminal-main-command');
        const terminalCaret = document.querySelector('#terminal-caret');

        document.querySelector('#open-t').addEventListener('click', () => _toggle_terminal("open"));
        document.querySelector('#close-t').addEventListener('click', () => _toggle_terminal("close"));

        // Terminal input
        terminal.addEventListener('focus', () => terminalCaret.classList.add('blink'));
        terminal.addEventListener('blur', () => terminalCaret.classList.remove('blink'));
        terminal.addEventListener('keydown', (e) => {
            if(!e.ctrlKey && !e.metaKey && !e.altKey){
                e.preventDefault();

                // Write inside terminalInput
                if(e.key.length == 1){
                    terminalInput.innerText += e.key;
                }
            }

            // ==== OPTIONS ====
            // Paste
            if (e.key == "v" && (e.ctrlKey || e.metaKey)) {
                navigator.clipboard.readText().then(text => {
                    terminalInput.innerText += text;
                });
            }
            // Backspace
            if (e.key == "Backspace") {
                terminalInput.innerText = terminalInput.innerText.slice(0, -1);
            }
            // Enter
            if (e.key == "Enter") {
                alert('push')
            }
        });

        // Terminal options
        document.querySelectorAll('.terminal-option').forEach(option => {
            option.addEventListener('click', () => _option_click(option.getAttribute('data-option')));
        });
    };




    // ==== INIT =========
    fn = async () => {
        let base64 = location.hash.substring(1);
        if (base64.length == 0 || base64 == "undefined" || !fetch){
            // RUN MAIN
            __main__();
            return;
        }
        // Decode base64

        let r = await fetch("data:application/octet-stream;base64," + base64);
        let blob = await r.blob();
        let reader = new FileReader();
        reader.onload = function () {
            var compressed_data = Array.from(new Uint8Array(reader.result));
            lzma.decompress(compressed_data, function (plaintext, error) {
                if (error) {
                    alert("Failed to decompress data: " + error);
                }
                // Write each window
                try {
                    const arrayData = JSON.parse(plaintext);
                    // If it is a object
                    if(typeof arrayData === 'object'){
                        arrayData.forEach((el, i) => {
                            addWindow();
                            // Write data
                            WINDOW_CONFIG.windows[i].value = el;

                            // Update code
                            _update_code(WINDOW_CONFIG.windows[i]);
                        });
                    }
                } catch (error) {
                    alert("Failed to writing data: " + error);
                }

                // RUN MAIN
                __main__();
            });
        };
        reader.readAsArrayBuffer(blob);
    }; fn();
});