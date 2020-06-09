
// Class that handles replacing word in a string
class Replacer {
    // Takes array words and string text
    constructor(words, replace, text) {
        this.words = words;
        this.text = text;
        this.replace = replace;
        this.replaceWord = "";
        this.word = "";


    }

    formatWordInput () {
        // Formats user input into a this.word var for a single word
        // string. And formats the this.words arr into an array with the singular
        // element being the word.
        // Use this before all other functions
        let temp = [];
        if (!Array.isArray(this.words)) {
            this.word = this.words;
            temp.push(this.words);
           this.words = temp;

        }

        temp = [];

        if (!Array.isArray(this.replace)) {
            this.replaceWord = this.replace;
            temp.push(this.replace);
           this.replace = temp;

        }
    }

    showWord () {
        this.formatWordInput();
        console.log(this.word);
    }

    showAllWords () {
        this.formatWordInput();
        this.words.forEach(e => {
            console.log(e);
        }); 
    }

    replaceText () {
        this.formatWordInput();
        let w = this.word.toLowerCase();
        let t  = this.text.toLowerCase();
        let rep = this.replaceWord.toLowerCase();
        let reg = new RegExp(w,"g");
        let newText;


        if (t.includes(w)) {
            newText = t.replace(reg, rep);
            // find a way to keep original casing of text
            // and match replaced word to it
            return newText;

        } else {
            return "Word not found in text";
        }

    }

}

window.onload = () => {

    const go = document.getElementById("go");
    const reset = document.getElementById("reset");

    go.addEventListener("click", () => {
        replaceWord();
    });

    reset.addEventListener("click", () => {
        location.reload();
    })



    // Grabbing elements from html
    let word = document.getElementById("word");
    let replace = document.getElementById("replace");
    let text = document.getElementById("text");
    let noContent = document.getElementById("noContent");

    let resultCreated = false;

    // Main function when "go" button is clicked
    function replaceWord() {
        // Takes values from user input and passes it to the Replacer class
        let r = new Replacer(word.value, replace.value, text.value.trim());
        res = r.replaceText();

        // If replaceText() returns an empty screen, show error message
        // If it does not, show the results
        if (res != "") {
            noContent.innerHTML = "";
            showResult(res);
        }
        else {
            noContent.innerHTML = "Please fill out the fields above";
        }
        
    }

    function showResult(res){
        // Element where the result text goes
        const resultParent = document.getElementById("resultParent");

        if (resultCreated == false) {
            
            resultCreated = true;

            createResult(resultParent, res);
            createCopyBtn(resultParent);



        }

    }

    // Helper function to copy text to clipboard
    function copyText(result) {
        result.select();
        document.execCommand("copy");
        console.log("Copied the text: " + result.value);

    }

    function createCopyBtn (resultParent) {
        // Creating copy button
        let copyBtn = document.createElement("BUTTON");
        copyBtn.innerHTML = "Copy to clipboard";
        copyBtn.setAttribute("id", "copyBtn");
        copyBtn.addEventListener("click", () => {
            copyText(result);
            alert("Text copied!");
        })
        resultParent.appendChild(copyBtn);
    }

    function createResult (resultParent, resultText) {
        // Creating result text input to copy
        let result = document.createElement("INPUT"); 
        result.setAttribute("type", "text");
        result.setAttribute("id", "result");
        result.setAttribute("size", "40");
        result.setAttribute("value", resultText);
        resultParent.appendChild(result);

    }




}
