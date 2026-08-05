// ======================
// SONS
// ======================

const clickSound = new Audio("sons/click.mp3");
const transitionSound = new Audio("sons/transicao.mp3");
const rainSound = new Audio("sons/chuva.mp3");
const thunderSound = new Audio("sons/trovao.mp3");

clickSound.volume = 0.5;
transitionSound.volume = 0.7;
rainSound.volume = 0.35;
thunderSound.volume = 0.8;

rainSound.loop = true;


// ======================
// ELEMENTOS
// ======================

const startBtn = document.getElementById("start");
const configBtn = document.getElementById("config");

const settingsScreen = document.getElementById("settingsScreen");
const backSettings = document.getElementById("backSettings");

const transitionScreen = document.getElementById("transitionScreen");

const options = document.querySelectorAll(".settingOption");
const info = document.getElementById("settingInfo");


// ======================
// CHUVA
// ======================

window.addEventListener("load", () => {

    rainSound.play().catch(() => {
        console.log("Aguardando interação...");
    });

});


// ======================
// HOVER DOS BOTÕES
// ======================

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("mouseenter", () => {

        clickSound.currentTime = 0;
        clickSound.play();

    });

    button.addEventListener("touchstart", () => {

        clickSound.currentTime = 0;
        clickSound.play();

    });

});


// ======================
// MENU
// ======================

configBtn.onclick = () => {

    settingsScreen.style.display = "block";

};

backSettings.onclick = () => {

    settingsScreen.style.display = "none";

};

// ======================
// OPÇÕES DAS CONFIGURAÇÕES
// ======================

options.forEach(option => {

    option.onclick = () => {

        options.forEach(btn => {
            btn.classList.remove("ativo");
        });

        option.classList.add("ativo");

        const page = option.dataset.page;



        // ======================
        // SOM
        // ======================

        if(page === "som"){

            info.innerHTML = `

                VOLUME<br><br>

                <input
                    type="range"
                    id="volumeBar"
                    min="0"
                    max="100"
                    value="${Math.round(rainSound.volume * 100)}">

                <p id="volumeText">${Math.round(rainSound.volume * 100)}%</p>

            `;

            const volumeBar = document.getElementById("volumeBar");
            const volumeText = document.getElementById("volumeText");

            volumeBar.oninput = () => {

                const volume = volumeBar.value / 100;

                rainSound.volume = volume;

                volumeText.innerHTML = volumeBar.value + "%";

            };

        }



        // ======================
        // IMAGEM
        // ======================

        if(page === "imagem"){

            info.innerHTML = `

                BRILHO<br><br>

                <input
                    type="range"
                    id="brightnessBar"
                    min="50"
                    max="150"
                    value="100">

                <p id="brightnessText">100%</p>

            `;

            const brightnessBar = document.getElementById("brightnessBar");
            const brightnessText = document.getElementById("brightnessText");

            brightnessBar.oninput = () => {

                document.body.style.filter =
                    "brightness(" + brightnessBar.value + "%)";

                brightnessText.innerHTML =
                    brightnessBar.value + "%";

            };

        }



        // ======================
        // GRÁFICOS
        // ======================

        if(page === "graficos"){

            info.innerHTML = `

                QUALIDADE GRÁFICA<br><br>

                <button class="graphicBtn">BAIXA</button>

                <button class="graphicBtn selecionado">MÉDIA</button>

                <button class="graphicBtn">ALTA</button>

            `;

            document.querySelectorAll(".graphicBtn").forEach(btn => {

                btn.onclick = () => {

                    document.querySelectorAll(".graphicBtn").forEach(b => {

                        b.classList.remove("selecionado");

                    });

                    btn.classList.add("selecionado");

                };

            });

        }



        // ======================
        // CONTROLES
        // ======================

        if(page === "controles"){

            info.innerHTML = `

                CONTROLES<br><br>

                <div class="controle">

                    <span>W A S D</span>

                    <p>MOVIMENTO</p>

                </div>

                <div class="controle">

                    <span>E</span>

                    <p>INTERAGIR</p>

                </div>

                <div class="controle">

                    <span>SHIFT</span>

                    <p>MENU</>

                    </div>

           `;

        }

    };

});
