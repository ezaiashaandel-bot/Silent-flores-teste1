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


const gameScreen =
document.getElementById("gameScreen");


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




// ======================
// CHUVA
// ======================


document.addEventListener("click",()=>{


rainSound.play().catch(()=>{});


},{once:true});





// ======================
// CLICK BOTÕES
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





// SOM


if(page==="som"){



info.innerHTML=`

VOLUME GERAL<br>

<input id="geral"
type="range"
min="0"
max="100"
value="${volumes.geral}">


<p>${volumes.geral}%</p>



VOLUME CLICK<br>

<input id="click"
type="range"
min="0"
max="100"
value="${volumes.click}">



<p>${volumes.click}%</p>



VOLUME TROVÃO<br>

<input id="trova"
type="range"
min="0"
max="100"
value="${volumes.trova}">



<p>${volumes.trova}%</p>




VOLUME TRANSIÇÃO<br>

<input id="transicao"
type="range"
min="0"
max="100"
value="${volumes.transicao}">



<p>${volumes.transicao}%</p>




VOLUME CHUVA<br>

<input id="chuva"
type="range"
min="0"
max="100"
value="${volumes.chuva}">



<p>${volumes.chuva}%</p>

`;



["geral",
"click",
"trova",
"transicao",
"chuva"]

.forEach(id=>{


let barra =
document.getElementById(id);


barra.oninput=()=>{


volumes[id]=
Number(barra.value);


atualizarVolumes();


barra.nextElementSibling.innerHTML =
barra.value+"%";


};


});


}







// IMAGEM


if(page==="imagem"){


let brilho =
localStorage.getItem("brilho")
||100;



info.innerHTML=`

BRILHO<br><br>


<input id="brightnessBar"
type="range"
min="50"
max="150"
value="${brilho}">


<p>${brilho}%</p>

`;



let bar =
document.getElementById(
"brightnessBar"
);



bar.oninput=()=>{


background.style.filter =
`brightness(${bar.value}%)`;


localStorage.setItem(
"brilho",
bar.value
);


bar.nextElementSibling.innerHTML =
bar.value+"%";


};



}





// CONTROLES


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


let volume =
rainSound.volume;


let fade =
setInterval(()=>{


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


rainSound.play().catch(()=>{});


atualizarVolumes();


}





function iniciarTransicao(){


diminuirChuva(()=>{


transitionScreen.classList.add("show");


transitionSound.currentTime=0;


transitionSound.play()
.catch(()=>{});



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
// TROVÃO ALEATÓRIO
// ======================


function relampago(){



let posicoes=[

"left",
"center",
"right"

];



let lado =
posicoes[
Math.floor(Math.random()*3)
];



let efeito;



if(lado==="left"){


efeito =
"radial-gradient(circle at 20% 50%,rgba(255,255,255,.22),transparent 70%)";


}



if(lado==="center"){


efeito =
"radial-gradient(circle at center,rgba(255,255,255,.22),transparent 70%)";


}



if(lado==="right"){


efeito =
"radial-gradient(circle at 80% 50%,rgba(255,255,255,.22),transparent 70%)";


}



lightning.style.background =
efeito;



lightning.style.opacity=".22";



setTimeout(()=>{


lightning.style.opacity="0";


},350);




setTimeout(()=>{


thunderSound.currentTime=0;


thunderSound.play()
.catch(()=>{});


},300);



}




setInterval(()=>{


relampago();


},15000);
