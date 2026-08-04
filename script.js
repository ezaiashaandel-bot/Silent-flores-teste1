// =====================
// SONS DO JOGO
// =====================

const clickSound = new Audio("sons/click.mp3");
const transitionSound = new Audio("sons/transicao.mp3");
const rainSound = new Audio("sons/chuva.mp3");
const thunderSound = new Audio("sons/trovao.mp3");


clickSound.volume = 0.5;
transitionSound.volume = 0.7;
rainSound.volume = 0.35;
thunderSound.volume = 0.8;

rainSound.loop = true;



// =====================
// CONFIGURAÇÕES
// =====================

const configBtn = document.getElementById("config");
const settingsScreen = document.getElementById("settingsScreen");
const backSettings = document.getElementById("backSettings");

const options = document.querySelectorAll(".settingOption");
const info = document.getElementById("settingInfo");


// Abrir configurações

configBtn.onclick = () => {

    settingsScreen.style.display = "block";

};


// Voltar

backSettings.onclick = () => {

    settingsScreen.style.display = "none";

};




// Opções

options.forEach(option => {


    option.onclick = () => {


        options.forEach(btn => {

            btn.classList.remove("ativo");

        });


        option.classList.add("ativo");


        let page = option.dataset.page;



        // SOM

        if(page === "som"){


            info.innerHTML = `

            VOLUME<br><br>

            <input 
            type="range"
            id="volumeBar"
            min="0"
            max="100"
            value="70">


            <p id="volumeText">
            70%
            </p>

            `;


            const volumeBar = document.getElementById("volumeBar");
            const volumeText = document.getElementById("volumeText");


            volumeBar.oninput = () => {

                volumeText.innerHTML = volumeBar.value + "%";

            };


        }




        // IMAGEM

        if(page === "imagem"){


            info.innerHTML = `

            BRILHO<br><br>


            <input
            type="range"
            id="brightnessBar"
            min="0"
            max="100"
            value="60">


            <p id="brightnessText">
            60%
            </p>

            `;


            const brightnessBar = document.getElementById("brightnessBar");
            const brightnessText = document.getElementById("brightnessText");


            brightnessBar.oninput = () => {

                brightnessText.innerHTML = brightnessBar.value + "%";

            };


        }




        // GRÁFICOS

        if(page === "graficos"){


            info.innerHTML = `

            QUALIDADE GRÁFICA<br><br>


            <button class="graphicBtn">
            BAIXA
            </button>

            <button class="graphicBtn">
            MÉDIA
            </button>

            <button class="graphicBtn">
            ALTA
            </button>


            `;


            const graphicBtns = document.querySelectorAll(".graphicBtn");


            graphicBtns.forEach(btn => {


                btn.onclick = () => {


                    graphicBtns.forEach(b => {

                        b.classList.remove("selecionado");

                    });


                    btn.classList.add("selecionado");


                };


            });


        }





        // CONTROLES

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

            <span>ESC</span>
            <p>MENU</p>

            </div>


            <div class="controle">

            <span>SHIFT</span>
            <p>CORRER</p>

            </div>

            `;


        }


    };


});




// =====================
// SOM AO PASSAR NOS BOTÕES
// =====================

document.querySelectorAll("button").forEach(button => {


    button.addEventListener("mouseenter", () => {


        clickSound.currentTime = 0;
        clickSound.play();


    });



    // Celular

    button.addEventListener("touchstart", () => {


        clickSound.currentTime = 0;
        clickSound.play();


    });


});




// =====================
// CHUVA
// =====================

window.addEventListener("load", () => {


    rainSound.play().catch(() => {


        console.log("Chuva aguardando interação.");


    });


});
