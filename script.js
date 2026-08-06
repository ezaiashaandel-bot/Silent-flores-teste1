alert("JS funcionando");

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

const menu = document.getElementById("menu");
const gameScreen = document.getElementById("gameScreen");

const settingsScreen = document.getElementById("settingsScreen");
const backSettings = document.getElementById("backSettings");

const transitionScreen = document.getElementById("transitionScreen");

const background = document.getElementById("background");

const lightning = document.getElementById("lightning");

const options = document.querySelectorAll(".settingOption");
const info = document.getElementById("settingInfo");




// ======================
// INICIAR CHUVA
// ======================

document.addEventListener("click", () => {

    rainSound.play().catch(()=>{});

},{once:true});





// ======================
// SOM DOS BOTÕES
// ======================

document.querySelectorAll("button").forEach(button=>{


    button.addEventListener("mouseenter",()=>{

        clickSound.currentTime = 0;

        clickSound.play().catch(()=>{});

    });


    button.addEventListener("touchstart",()=>{

        clickSound.currentTime = 0;

        clickSound.play().catch(()=>{});

    });


});





// ======================
// CONFIGURAÇÕES
// ======================

configBtn.onclick = ()=>{

    settingsScreen.style.display="block";

};



backSettings.onclick = ()=>{

    settingsScreen.style.display="none";

};





// ======================
// CONFIGURAÇÕES
// ======================

options.forEach(option=>{


option.onclick=()=>{


    options.forEach(btn=>{

        btn.classList.remove("ativo");

    });


    option.classList.add("ativo");


    const page = option.dataset.page;



    if(page==="som"){


        info.innerHTML=`

        VOLUME<br><br>

        <input 
        type="range"
        id="volumeBar"
        min="0"
        max="100"
        value="35">


        <p id="volumeText">
        35%
        </p>

        `;


        const bar=document.getElementById("volumeBar");
        const text=document.getElementById("volumeText");


        bar.oninput=()=>{


            rainSound.volume=bar.value/100;

            text.innerHTML=bar.value+"%";


        };


    }





    if(page==="imagem"){


        info.innerHTML=`

        BRILHO<br><br>


        <input
        type="range"
        id="brightnessBar"
        min="50"
        max="150"
        value="100">


        <p id="brightnessText">
        100%
        </p>

        `;


        const bar=document.getElementById("brightnessBar");
        const text=document.getElementById("brightnessText");


        bar.oninput=()=>{


            background.style.filter =
            "brightness("+bar.value+"%)";


            text.innerHTML =
            bar.value+"%";


        };


    }





    if(page==="graficos"){

    info.innerHTML=`

    QUALIDADE GRÁFICA<br><br>

    <button class="graphicBtn">
    BAIXA
    </button>

    <button class="graphicBtn selecionado">
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





    if(page==="controles"){


        info.innerHTML=`

        CONTROLES<br><br>


        W A S D<br>
        MOVIMENTO<br><br>


        E<br>
        INTERAGIR<br><br>


        SHIFT<br>
        CORRER

        `;


    }


};


});





// ======================
// TRANSIÇÃO
// ======================


function diminuirChuva(callback){


let volume = rainSound.volume;


let fade=setInterval(()=>{


volume-=0.02;


if(volume<=0){


clearInterval(fade);


rainSound.volume=0;


callback();


return;


}


rainSound.volume=volume;


},50);


}





function aumentarChuva(){


let volume=0;


rainSound.volume=0;


rainSound.play().catch(()=>{});



let fade=setInterval(()=>{


volume+=0.02;


if(volume>=0.35){


volume=0.35;


clearInterval(fade);


}


rainSound.volume=volume;


},50);


}





function iniciarTransicao(){


diminuirChuva(()=>{


transitionScreen.classList.add("show");


transitionSound.currentTime=0;

transitionSound.play().catch(()=>{});



setTimeout(()=>{


transitionScreen.classList.remove("show");


aumentarChuva();


},3000);



});


}





// ======================
// JOGAR
// ======================


startBtn.onclick=()=>{


iniciarTransicao();


setTimeout(()=>{


menu.style.display="none";

gameScreen.style.display="block";


},3000);


};





// ======================
// TROVÃO
// ======================


function relampago(){


lightning.classList.add("flash");


thunderSound.currentTime=0;


thunderSound.play().catch(()=>{});


setTimeout(()=>{


lightning.classList.remove("flash");


},120);


}





setInterval(()=>{


if(Math.random()>0.7){


relampago();


}


},5000);

// ======================
// RELÂMPAGO SUAVE
// ======================

function relampago(){

    const posicoes = [
        "left",
        "center",
        "right"
    ];

    const lado =
        posicoes[Math.floor(Math.random()*3)];

    if(lado==="left"){

        lightning.style.background =
        "radial-gradient(circle at 20% 50%, rgba(255,255,255,.22) 0%, rgba(255,255,255,.12) 35%, rgba(255,255,255,.05) 65%, rgba(255,255,255,0) 100%)";

    }

    if(lado==="center"){

        lightning.style.background =
        "radial-gradient(circle at center, rgba(255,255,255,.22) 0%, rgba(255,255,255,.12) 35%, rgba(255,255,255,.05) 65%, rgba(255,255,255,0) 100%)";

    }

    if(lado==="right"){

        lightning.style.background =
        "radial-gradient(circle at 80% 50%, rgba(255,255,255,.22) 0%, rgba(255,255,255,.12) 35%, rgba(255,255,255,.05) 65%, rgba(255,255,255,0) 100%)";

    }

    lightning.style.transition = "none";
    lightning.style.opacity = "0.22";

    requestAnimationFrame(() => {

        lightning.style.transition = "opacity .35s ease-out";
        lightning.style.opacity = "0";

    });

    setTimeout(() => {

        thunderSound.currentTime = 0;
        thunderSound.play().catch(()=>{});

    },300);

}

setInterval(()=>{

    relampago();

},15000);
