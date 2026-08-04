const configBtn = document.getElementById("config");
const settingsScreen = document.getElementById("settingsScreen");
const backSettings = document.getElementById("backSettings");


// Abrir configurações
configBtn.onclick = () => {

    settingsScreen.style.display = "block";

};


// Voltar para o menu
backSettings.onclick = () => {

    settingsScreen.style.display = "none";

};



// Opções de configuração

const options = document.querySelectorAll(".settingOption");
const info = document.getElementById("settingInfo");


options.forEach(option => {


    option.onclick = () => {


        let page = option.dataset.page;


        if(page === "som"){

            info.innerHTML = `
            VOLUME<br><br>
            🔊 ███████░░ 70%
            `;

        }


        if(page === "imagem"){

            info.innerHTML = `
            BRILHO<br><br>
            ☀ ██████░░░ 60%
            `;

        }


        if(page === "graficos"){

            info.innerHTML = `
            QUALIDADE GRÁFICA<br><br>
            ALTA
            `;

        }


        if(page === "controles"){

            info.innerHTML = `
            CONTROLES<br><br>
            W A S D<br>
            MOVIMENTO
            `;

        }


    };


});
