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

            ALTA

            `;


        }





        // CONTROLES

        if(page === "controles"){


            info.innerHTML = `

            CONTROLES<br><br>

            W A S D → ANDAR<br>
            E → INTERAGIR<br>
            ESC → MENU

            `;


        }


    };


});
