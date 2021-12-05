var score_counter = document.querySelector("#score");
var score = 0;
var started = 0;
var button = document.querySelector("#start");
var animations_order = ["bieg1", "bieg2", "zatrzymanie", "ziewanie", "drapanie1", "drapanie2", "spanie1", "spanie2", "pobudka"];


function start() {
    score = 0;
    setScore(0);
    var animations = document.querySelectorAll("animation-component");
    for (var i = 0; i < animations.length; i++) {
        animations[i].start();
    }
    started = 1;
    button.style.display = "none";
    window.setTimeout(stop, 60000);
}

function stop() {
    // stop the game
    started = 0;
    button.style.display = "";
    var animations = document.querySelectorAll("animation-component");
    for (var i = 0; i < animations.length; i++) {
        animations[i].stop();
    }
    alert("Game ended with score: " + score);
    score_counter.textContent = "Game ended with score: " + score;
}

function globalAddScore(x) {
    score += x;
    setScore(score);
}

function setScore(x) {
    score_counter.textContent = x;
}

function pushNTimesToAnimationsorder(element1, element2) {
    for (let i = 0; i < N; i++) {
        animations_order.push(element1);
        animations_order.push(element2);
    }
} 

class AnimationComponent extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
    }

    init() {
        this.shadowRoot.innerHTML = `
        <img id="animation_frame" src="animation_frames/bieg1.gif">
        `
        this.addEventListener("click", this.addScore, false);
    }

    static get observerAttributes() {
        return ["score", "frame_id", "timeout_id", "N", "loop"];
    }

    start() {
        this.setAttribute("N", Math.floor(Math.random() * 4) + 2)
        let id = window.setTimeout(this.nextFrame.bind(this), 1000);
        this.setAttribute("timeoud_id", id);
    }

    stop() {
        window.clearTimeout(this.getAttribute("timeout_id"));
        this.setAttribute("score", 0);
        this.setAttribute("frame_id", 0);
        this.shadowRoot.innerHTML = `
        <img id="animation_frame" src="animation_frames/bieg1.gif">
        `
    }

    nextFrame() {
        if (!started) {
            return;
        }
        let current_frame_id = parseInt(this.getAttribute("frame_id"));
        let next_frame_id = (current_frame_id + 1) % animations_order.length;

        if (current_frame_id == 0 || current_frame_id == 4 || current_frame_id == 6) {
            this.setAttribute("loop", parseInt(this.getAttribute("loop")) + 1);
        }

        if (current_frame_id == 1 || current_frame_id == 5 || current_frame_id == 7) {
            if (this.getAttribute("loop") != this.getAttribute("N")) {
                next_frame_id = current_frame_id - 1;
            } 
            else {
                this.setAttribute("loop", "0");
            }
        }

        let animation = this.shadowRoot.querySelector("#animation_frame");
        animation.src = "animation_frames/" + animations_order[next_frame_id] + ".gif";
        this.setAttribute("frame_id", next_frame_id);
        let id = window.setTimeout(this.nextFrame.bind(this), 1000 - parseInt(this.getAttribute("score")));
        this.setAttribute("timeoud_id", id);
    }

    connectedCallback() {
        this.init();
    }

    addScore() {
        let current_frame_id = this.getAttribute("frame_id");
        let current_frame = animations_order[current_frame_id];
        let frame_len = current_frame.length;

        if (current_frame[frame_len - 1] == '1' || current_frame[frame_len - 1] == '2') {
            current_frame = current_frame.slice(0, -1);
        }

        else if (current_frame.localeCompare("ziewanie") == 0 || 
                 current_frame.localeCompare("zatrzymanie") == 0 ||
                 current_frame.localeCompare("pobudka") == 0)
        {
            current_frame = "10points";
        }

        let current_score = parseInt(this.getAttribute("score"));

        switch(current_frame) {
            case "bieg":
                globalAddScore(1);
                this.setAttribute("score", current_score + 1);
                break;
            case "drapanie":
                globalAddScore(-1);
                this.setAttribute("score", current_score - 1);
                break;
            case "spanie":
                globalAddScore(-2);
                this.setAttribute("score", current_score - 2);
                break;
            case "10points":
                globalAddScore(10);
                this.setAttribute("score", current_score + 10);
                break;
        }
    }
}

customElements.define('animation-component', AnimationComponent);