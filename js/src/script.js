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
    }

    // ==== UPDATE CODE =========
    const _update_code = (window) => {
        // Get window index
        const index = WINDOW_CONFIG.windows.indexOf(window);
        // Get code window
        const codeWindow = WINDOW_CONFIG.codeWindow[index];

        // Get first line of code
        const firstLine = window.value.split('\n')[0];
        if(firstLine.includes("!")) {
            // Get language
            const language = firstLine.split('!')[1].toLowerCase();

            // Set language
            codeWindow.setAttribute('class', `language-${language}`);
        }

        codeWindow.innerHTML = window.value.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */

        Prism.highlightElement(codeWindow);
    }

    // ==== ADD WINDOWS =========

    const addWindow = () => {
        if (WINDOW_CONFIG.current < WINDOW_CONFIG.max) {
            // Add window
            // Create this structure
            // <div>
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
            const newWindow = document.createElement('textarea');
            newWindow.setAttribute('class', 'textarea-main');
            newWindow.setAttribute('spellcheck', 'false');
            newWindow.setAttribute('outline', 'none');
            newWindow.setAttribute('autocorrect', 'off');
            newWindow.setAttribute('autocapitalize', 'off');
            newWindow.setAttribute('aria-label', 'Paste Code');
            newWindow.setAttribute('tabindex', '0');
            newWindow.addEventListener('input', () => _update_code(newWindow));
            newWindow.addEventListener('scroll', () => {
                // Get and set x and y
                codeWindow.scrollTo(newWindow.scrollLeft, newWindow.scrollTop);
            });

            // Insert 
            codeWindow.appendChild(code);
            windowParent.appendChild(newWindow);
            windowParent.appendChild(codeWindow);
            WINDOW_CONFIG.parent.appendChild(windowParent);
            WINDOW_CONFIG.windows.push(newWindow);
            WINDOW_CONFIG.current++;

            // Code insert
            WINDOW_CONFIG.codeWindow.push(code);
        }
    }


    // === Close text offer =====
    const closeOffer = () =>  document.querySelector("body > footer").classList.remove("text-offer");

    // ==== MAIN =========
    const __main__ = () => {
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
        document.querySelector('#remove-w').addEventListener('click', () => {
            if (WINDOW_CONFIG.current > WINDOW_CONFIG.min) {
                // Remove last window
                WINDOW_CONFIG.parent.removeChild(WINDOW_CONFIG.windows[WINDOW_CONFIG.windows.length - 1].parentElement);
                // Remove last window from array
                WINDOW_CONFIG.windows.pop();
                WINDOW_CONFIG.current--;
            }
        });


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