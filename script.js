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


const startBtn =
document.getElementById("start");


const configBtn =
document.getElementById("config");


const menu =
document.getElementById("menu");



const nicknameScreen =
document.getElementById("nicknameScreen");


const playerName =
document.getElementById("playerName");


const backToMenu =
document.getElementById("backToMenu");


const continueToGender =
document.getElementById("continueToGender");



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




// CONFIG


const settingsScreen =
document.getElementById("settingsScreen");


const backSettings =
document.getElementById("backSettings");


const options =
document.querySelectorAll(".settingOption");


const info =
document.getElementById("settingInfo");



// TRANSIÇÃO


const transitionScreen =
document.getElementById("transitionScreen");



const background =
document.getElementById("background");



const lightning =
document.getElementById("lightning");



console.log("Elementos carregados");

// ======================
// INICIAR CHUVA
// ======================

document.addEventListener("click",()=>{

    rainSound.play().catch(()=>{});

},{once:true});




// ======================
// SOM DOS BOTÕES
// ======================

document.querySelectorAll("button")
.forEach(button=>{


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





options.forEach(option=>{


    option.onclick = ()=>{


        options.forEach(btn=>{

            btn.classList.remove("ativo");

        });



        option.classList.add("ativo");


        let page = option.dataset.page;




        if(page==="som"){


            info.innerHTML = `

            VOLUME GERAL<br>

            <input id="geral" type="range" min="0" max="100" value="${volumes.geral}">

            <br><br>


            VOLUME CHUVA<br>

            <input id="chuva" type="range" min="0" max="100" value="${volumes.chuva}">

            `;


            ["geral","chuva"].forEach(id=>{


                let barra =
                document.getElementById(id);



                barra.oninput = ()=>{


                    volumes[id] =
                    Number(barra.value);


                    atualizarVolumes();

                };


            });


        }




        if(page==="controles"){


            info.innerHTML = `


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


        menu.style.display="none";


        nicknameScreen.style.display="block";


    },3000);



};






// ======================
// VOLTAR NICKNAME
// ======================


backToMenu.onclick = ()=>{


    iniciarTransicao();



    setTimeout(()=>{


        nicknameScreen.style.display="none";


        menu.style.display="flex";


    },3000);



};






// ======================
// NICKNAME → GÊNERO
// ======================


continueToGender.onclick = ()=>{


    let nome =
    playerName.value.trim();



    if(nome===""){


        alert("Digite seu nickname");


        return;

    }



    localStorage.setItem(
        "playerName",
        nome
    );



    iniciarTransicao();



    setTimeout(()=>{


        nicknameScreen.style.display="none";


        genderScreen.style.display="block";


    },3000);



};






// ======================
// GÊNERO
// ======================


function escolherGenero(genero){


    localStorage.setItem(
        "genero",
        genero
    );



    iniciarTransicao();



    setTimeout(()=>{


        genderScreen.style.display="none";


        characterScreen.style.display="block";


    },3000);



}




male.onclick = ()=>{

    escolherGenero("masculino");

};



female.onclick = ()=>{

    escolherGenero("feminino");

};





backGender.onclick = ()=>{


    genderScreen.style.display="none";


    nicknameScreen.style.display="block";


};





// ======================
// PERSONAGEM
// ======================


backCharacter.onclick = ()=>{


    characterScreen.style.display="none";


    genderScreen.style.display="block";


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





// ======================
// SALVAR NOME AO ABRIR
// ======================


let nomeSalvo =
localStorage.getItem("playerName");


if(nomeSalvo){


    playerName.value = nomeSalvo;


}





console.log("Silent Forest carregado!");
