alert("JS funcionando");

// ======================
// SONS
// ======================

const clickSound = new Audio("sons/click.mp3");
const transitionSound = new Audio("sons/transicao.mp3");
const rainSound = new Audio("sons/chuva.mp3");
const thunderSound = new Audio("sons/trovao.mp3");

rainSound.loop = true;


// ======================
// VOLUMES
// ======================

let volumes = JSON.parse(localStorage.getItem("volumes")) || {

    geral:100,
    click:50,
    transicao:70,
    chuva:35,
    trova:80

};


function atualizarVolumes(){

    clickSound.volume =
    (volumes.click / 100) *
    (volumes.geral / 100);


    transitionSound.volume =
    (volumes.transicao / 100) *
    (volumes.geral / 100);


    rainSound.volume =
    (volumes.chuva / 100) *
    (volumes.geral / 100);


    thunderSound.volume =
    (volumes.trova / 100) *
    (volumes.geral / 100);


    localStorage.setItem(
        "volumes",
        JSON.stringify(volumes)
    );

}


atualizarVolumes();



// ======================
// ELEMENTOS
// ======================

const startBtn = document.getElementById("start");

const configBtn = document.getElementById("config");

const menu = document.getElementById("menu");

const settingsScreen =
document.getElementById("settingsScreen");

const backSettings =
document.getElementById("backSettings");

const transitionScreen =
document.getElementById("transitionScreen");

const background =
document.getElementById("background");

const lightning =
document.getElementById("lightning");

const options =
document.querySelectorAll(".settingOption");

const info =
document.getElementById("settingInfo");


// NICKNAME

const nicknameScreen =
document.getElementById("nicknameScreen");

const backToMenu =
document.getElementById("backToMenu");

const continueToGender =
document.getElementById("continueToGender");

const playerName =
document.getElementById("playerName");


// GÊNERO

const genderScreen =
document.getElementById("genderScreen");

const male =
document.getElementById("male");

const female =
document.getElementById("female");

const backGender =
document.getElementById("backGender");


// PERSONAGEM

const characterScreen =
document.getElementById("characterScreen");

const backCharacter =
document.getElementById("backCharacter");

const finishCharacter =
document.getElementById("finishCharacter");


// JOGO

const gameScreen =
document.getElementById("gameScreen");




// ======================
// CHUVA
// ======================

document.addEventListener("click",()=>{

    rainSound.play().catch(()=>{});

},{once:true});




// ======================
// SOM BOTÕES
// ======================

document.querySelectorAll("button")
.forEach(button=>{


button.addEventListener("mouseenter",()=>{

    clickSound.currentTime=0;

    clickSound.play().catch(()=>{});

});


button.addEventListener("touchstart",()=>{

    clickSound.currentTime=0;

    clickSound.play().catch(()=>{});

});


});




// ======================
// CONFIGURAÇÕES
// ======================

configBtn.onclick=()=>{

    settingsScreen.style.display="block";

};


backSettings.onclick=()=>{

    settingsScreen.style.display="none";

};



options.forEach(option=>{


option.onclick=()=>{


options.forEach(btn=>{

btn.classList.remove("ativo");

});


option.classList.add("ativo");


let page =
option.dataset.page;



if(page==="som"){


info.innerHTML = `

VOLUME GERAL<br>

<input id="geral" type="range" min="0" max="100" value="${volumes.geral}">
<p>${volumes.geral}%</p>

<br>

VOLUME CLICK<br>

<input id="click" type="range" min="0" max="100" value="${volumes.click}">
<p>${volumes.click}%</p>

<br>

VOLUME TROVÃO<br>

<input id="trova" type="range" min="0" max="100" value="${volumes.trova}">
<p>${volumes.trova}%</p>

<br>

VOLUME TRANSIÇÃO<br>

<input id="transicao" type="range" min="0" max="100" value="${volumes.transicao}">
<p>${volumes.transicao}%</p>

<br>

VOLUME CHUVA<br>

<input id="chuva" type="range" min="0" max="100" value="${volumes.chuva}">
<p>${volumes.chuva}%</p>

`;


[
"geral",
"click",
"trova",
"transicao",
"chuva"

].forEach(id=>{


let barra =
document.getElementById(id);


barra.oninput=()=>{


volumes[id]=Number(barra.value);


atualizarVolumes();


barra.nextElementSibling.innerHTML =
barra.value+"%";


};


});


    }

    };

});

    // ======================
// TRANSIÇÃO
// ======================

function iniciarTransicao(){

    transitionScreen.classList.add("show");

    transitionSound.currentTime = 0;

    transitionSound.play().catch(()=>{});


    setTimeout(()=>{

        transitionScreen.classList.remove("show");

    },3000);

}



// ======================
// JOGAR → NICKNAME
// ======================

startBtn.onclick = ()=>{


    iniciarTransicao();


    setTimeout(()=>{


        menu.style.display = "none";


        nicknameScreen.style.display = "block";


    },3000);


};





// ======================
// VOLTAR AO MENU
// ======================

backToMenu.onclick = ()=>{


    iniciarTransicao();


    setTimeout(()=>{


        nicknameScreen.style.display = "none";


        menu.style.display = "flex";


    },3000);


};





// ======================
// CONTINUAR NICKNAME
// ======================

continueToGender.onclick = ()=>{


    let nome = playerName.value.trim();



    if(nome === ""){


        alert("Digite seu nickname");


        return;


    }



    localStorage.setItem(
        "playerName",
        nome
    );



    iniciarTransicao();



    setTimeout(()=>{


        setTimeout(()=>{

    nicknameScreen.style.display="none";
    genderScreen.style.display="block";

},3000);




};


// ======================
// ESCOLHA DE GÊNERO
// ======================

male.onclick = ()=>{

    localStorage.setItem("gender","Masculino");

    iniciarTransicao();

    setTimeout(()=>{

        genderScreen.style.display="none";
        characterScreen.style.display="block";

    },3000);

};



female.onclick = ()=>{

    localStorage.setItem("gender","Feminino");

    iniciarTransicao();

    setTimeout(()=>{

        genderScreen.style.display="none";
        characterScreen.style.display="block";

    },3000);

};



backGender.onclick = ()=>{

    iniciarTransicao();

    setTimeout(()=>{

        genderScreen.style.display="none";
        nicknameScreen.style.display="block";

    },3000);

};




// ======================
// PERSONAGEM
// ======================

backCharacter.onclick = ()=>{

    iniciarTransicao();

    setTimeout(()=>{

        characterScreen.style.display="none";
        genderScreen.style.display="block";

    },3000);

};



finishCharacter.onclick = ()=>{

    iniciarTransicao();

    setTimeout(()=>{

        characterScreen.style.display="none";
        gameScreen.style.display="block";

    },3000);

};


// ======================
// RELÂMPAGO
// ======================

function relampago(){


    let lados = [

        "left",
        "center",
        "right"

    ];



    let lado =
    lados[Math.floor(Math.random()*3)];



    if(lado==="left"){


        lightning.style.background =

        "radial-gradient(circle at 20% 50%,rgba(255,255,255,.22),transparent 70%)";


    }



    if(lado==="center"){


        lightning.style.background =

        "radial-gradient(circle at center,rgba(255,255,255,.22),transparent 70%)";


    }



    if(lado==="right"){


        lightning.style.background =

        "radial-gradient(circle at 80% 50%,rgba(255,255,255,.22),transparent 70%)";


    }



    lightning.style.opacity=".22";



    setTimeout(()=>{


        lightning.style.opacity="0";


    },350);



    setTimeout(()=>{


        thunderSound.currentTime=0;


        thunderSound.play().catch(()=>{});


    },300);



}




setInterval(()=>{


    relampago();


},15000);
