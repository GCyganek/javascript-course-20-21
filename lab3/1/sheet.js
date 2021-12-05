var button1 = document.getElementById("skasujButton");
var button2 = document.getElementById("ustawButton");

button1.addEventListener("click", deleteStyling, false);
button2.addEventListener("click", setStyling, false);

var toChangeClassesArray = ["nav", "aside", "header", "footer", "main"];

var elements;

var stylingOn = false;

function mediaQueryChanges(x) {
    if (!stylingOn) return;

    if (x.matches) {
        elements = document.querySelectorAll("aside, header, nav, main, footer");

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.width = "auto";
            elements[i].style.float = "none";
        }

        elements = document.querySelectorAll("h1");

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.fontSize = "calc(2.4vw + 1.5vh + 1.2vmin)"
        }

        elements = document.querySelectorAll("h2");

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.fontSize = "calc(1.8vw + 1.5vh + .8vmin)"
        }

        elements = document.querySelectorAll("p, blockquote, a");

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.fontSize = "calc(1.5vw + 0.5vh + .8vmin)"
        }

        elements = document.querySelectorAll("nav ul, aside ul");

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.paddingLeft = "calc(1.5vh + 1.5vw + 1vmin)"
        }
    } 
    
    else {

        elements = document.querySelectorAll("h1");

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.fontSize = "calc(1vw + 1vh + 1.5vmin)"
        }
    
        elements = document.querySelectorAll("h2");
    
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.fontSize = "calc(1vw + 1vh + .8vmin)"
        }
    
        elements = document.querySelectorAll("p, blockquote, a");
    
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.fontSize = "calc(0.6vw + 0.6vh + .2vmin)"
        }

        elements = document.querySelectorAll("nav ul, aside ul");

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.padding = "0";
            elements[i].style.margin = "margin: calc(.5vw + .5vh + .2vmin)";
            elements[i].style.paddingLeft = "calc(1.5vw + .5vh + 1vmin)";
        }

        elements = document.querySelectorAll("aside");

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.width = "50%";
            elements[i].style.float = "right";
        }
    
        elements = document.querySelectorAll("main");
    
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.width = "33%";
            elements[i].style.clear = "left";
        }
    
        elements = document.querySelectorAll("nav");
    
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.width = "10%";
            elements[i].style.float = "left";
        }
    }
}

var x = window.matchMedia("(max-width: 800px)")
x.addEventListener("change", mediaQueryChanges, false) 

/* DELETE STYLING */
function deleteStyling() {
    stylingOn = false;

    elements = document.getElementsByClassName("azure");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = ""
    }

    elements = document.getElementsByClassName("shadow");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.boxShadow = "";
    }

    elements = document.getElementsByClassName("border");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.border = "";
    }

    elements = document.getElementsByClassName("margin");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.margin = "";
        elements[i].style.padding = "";
    }

    elements = document.querySelectorAll("aside");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width = "";
        elements[i].style.float = "";
    }

    elements = document.querySelectorAll("main");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width = "";
        elements[i].style.clear = "";
    }

    elements = document.querySelectorAll("nav");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width = "";
        elements[i].style.float = "";
    }

    elements = document.querySelectorAll("nav li, a");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.padding = "";
        elements[i].style.margin = "";
        elements[i].style.paddingLeft = "";
    }

    elements = document.querySelectorAll("h1, h2, p, blockquote");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.margin = "";
        elements[i].style.fontFamily = "";
    }

    elements = document.querySelectorAll("h1");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontSize = ""
    }

    elements = document.querySelectorAll("h2");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontSize = ""
    }

    elements = document.querySelectorAll("p, blockquote, a");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontSize = ""
    }
}

/* SET STYLING */
function setStyling() {
    stylingOn = true;
    mediaQueryChanges(x);

    for (var i = 0; i < toChangeClassesArray.length; i++) {
        elements = document.getElementsByTagName(toChangeClassesArray[i]);

        for (var j = 0; j < elements.length; j++) {
            elements[j].className = "azure shadow border margin";
        }
    }

    elements = document.getElementsByClassName("azure");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#EFF"
    }

    elements = document.getElementsByClassName("shadow");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.boxShadow = "0 0 7px rgba(0, 0, 0, 0.507)";
    }

    elements = document.getElementsByClassName("border");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.border = "1px solid black";
    }
    
    elements = document.getElementsByClassName("margin");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.margin = "calc(1vw + 1vh + .6vmin)";
        elements[i].style.padding = "calc(.5vw + .5vh + .2vmin)";
    }

    elements = document.querySelectorAll("nav li, a");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.margin = "0";
        elements[i].style.paddingLeft = "0";
    }

    elements = document.querySelectorAll("h1, h2, p, blockquote");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.margin = "0";
        elements[i].style.fontFamily = "'Courier New', Courier, monospace";
    }
}
