var { shell } = require("electron");

document.getElementById("submit-btn").addEventListener("click", get_grammar_punctuation_checker);

var autosize = require("autosize")

autosize(document.querySelectorAll(".text-area"))

document.getElementById("text-area").addEventListener("keypress", (function (e) {
    if(e.which === 13 && !e.shiftKey) {
        e.preventDefault();

        document.querySelector(".information-panel").style.display = "none"
    
        var user_text_area = document.createElement("div")
        document.getElementById("responses").appendChild(user_text_area);

        var user_icon = document.createElement("div")

        user_icon.classList.add("icon")

        user_icon.innerHTML = '<i class="fa-solid fa-user"></i>';

        user_text_area.innerHTML = document.getElementById("text-area").value

        user_text_area.appendChild(user_icon)
        

        user_text_area.classList.add("text-area")
        user_text_area.id = "user-text-area"

        get_grammar_punctuation_checker()


        autosize.update(document.getElementById("text-area"))
    }
}));

function get_grammar_punctuation_checker() {
    var python = require("python-shell")
    var path = require("path")

    var user_text = document.getElementById("text-area").value

    if (user_text === "") return;

    document.getElementById("text-area").value = ""

    var options = {
        scriptPath: path.join(__dirname),
        args: [user_text]
    }

    var grammar_punctuation_checker = new python.PythonShell("./backend/grammar_punctuation_checker.py", options);

    var ai_text_area = document.createElement("div")
    document.getElementById("responses").appendChild(ai_text_area);

    var ai_icon = document.createElement("div")

    ai_icon.classList.add("icon")

    ai_icon.innerHTML = '<i class="fa-solid fa-robot"></i>';

    grammar_punctuation_checker.on("message", function(message) {
        
        ai_text_area.innerHTML = message

        ai_text_area.appendChild(ai_icon)
        
    });

    
    ai_text_area.classList.add("text-area")
    ai_text_area.id = "ai-text-area";
    
    

    autosize(ai_text_area)
}

function loadPage(url) {
    shell.openExternal("http://" + url);
}