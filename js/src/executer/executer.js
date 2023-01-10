/* ==============================================================  
    JS Executer

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

class JSexecuter{
    code;
    constructor(code){
        this.code = code;
    }

    // Run
    run(){
        //Create script and execute this.code in js language
        // Remove old one
        if (document.getElementById('scriptContainer')) {
            document.getElementById('scriptContainer').parentNode.removeChild(document.getElementById('scriptContainer'));
        }

        let newScript = document.createElement('script');
        newScript.id = 'scriptContainer';
        newScript.text = 
        `
        try{
            ${this.code}
        }
        catch(e){
            Out(e);
        }
        `
        document.body.appendChild(newScript);
    }
}