const configBtn = document.getElementById("config");
const settingsScreen = document.getElementById("settingsScreen");
const backSettings = document.getElementById("backSettings");


// Abrir tela de configurações

configBtn.onclick = () => {

    settingsScreen.style.display = "block";

};



// Voltar para menu

backSettings.onclick = () => {

    settingsScreen.style.display = "none";

};




// Opções da configuração

const options = document.querySelectorAll(".settingOption");
const info = document.getElementById("settingInfo");



options.forEach(option => {


    option.onclick = () => {


        // remove seleção dos outros botões

        options.forEach(btn => {

            btn.classList.remove("ativo");

        });



        // coloca seleção no botão clicado

        option.classList.add("ativo");



        let page = option.dataset.page;



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

            W A S D → ANDAR<br>
            E → INTERAGIR<br>
            ESC → MENU

            `;

        }



    };


});
