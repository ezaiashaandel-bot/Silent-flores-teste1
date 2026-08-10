// ======================================================
// SILENT FOREST
// SCRIPT PRINCIPAL
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Silent Forest: JS carregado!");



    // ==================================================
    // SONS
    // ==================================================

    const clickSound =
        new Audio("sons/click.mp3");

    const transitionSound =
        new Audio("sons/transicao.mp3");

    const rainSound =
        new Audio("sons/chuva.mp3");

    const thunderSound =
        new Audio("sons/trovao.mp3");


    rainSound.loop = true;



    // ==================================================
    // VOLUMES
    // ==================================================

    let volumes =
        JSON.parse(
            localStorage.getItem("volumes")
        ) || {

            geral: 100,
            click: 50,
            transicao: 70,
            chuva: 35,
            trova: 80

        };



    function atualizarVolumes() {

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




    // ==================================================
    // ELEMENTOS
    // ==================================================

    const startBtn =
        document.getElementById("start");


    const configBtn =
        document.getElementById("config");


    const menu =
        document.getElementById("menu");



    // NICKNAME

    const nicknameScreen =
        document.getElementById(
            "nicknameScreen"
        );


    const playerName =
        document.getElementById(
            "playerName"
        );


    const backToMenu =
        document.getElementById(
            "backToMenu"
        );


    const continueToCharacter =
        document.getElementById(
            "continueToCharacter"
        );



    // PERSONAGEM

    const characterSelectScreen =
        document.getElementById(
            "characterSelectScreen"
        );


    const characterCard =
        document.getElementById(
            "characterCard"
        );


    const characterPreview =
        document.getElementById(
            "characterPreview"
        );


    const characterName =
        document.getElementById(
            "characterName"
        );


    const backCharacter =
        document.getElementById(
            "backCharacter"
        );


    const finishCharacter =
        document.getElementById(
            "finishCharacter"
        );



    // JOGO

    const gameScreen =
        document.getElementById(
            "gameScreen"
        );



    // CONFIGURAÇÕES

    const settingsScreen =
        document.getElementById(
            "settingsScreen"
        );


    const backSettings =
        document.getElementById(
            "backSettings"
        );


    const options =
        document.querySelectorAll(
            ".settingOption"
        );


    const info =
        document.getElementById(
            "settingInfo"
        );



    // TRANSIÇÃO

    const transitionScreen =
        document.getElementById(
            "transitionScreen"
        );



    // FUNDO

    const background =
        document.getElementById(
            "background"
        );



    // RELÂMPAGO

    const lightning =
        document.getElementById(
            "lightning"
        );




    // ==================================================
    // VERIFICAÇÃO
    // ==================================================

    console.log(
        "Elementos encontrados:",
        {

            startBtn,
            configBtn,
            menu,

            nicknameScreen,
            playerName,

            characterSelectScreen,
            characterCard,
            characterPreview,

            gameScreen,

            settingsScreen,
            transitionScreen

        }
    );




    // ==================================================
    // CHUVA
    // ==================================================

    function iniciarChuva() {

        rainSound
            .play()
            .catch(() => {

                console.log(
                    "Chuva aguardando interação do usuário."
                );

            });

    }


    document.addEventListener(
        "click",
        iniciarChuva,
        { once:true }
    );




    // ==================================================
    // SOM DOS BOTÕES
    // ==================================================

    document
        .querySelectorAll("button")
        .forEach(button => {


            button.addEventListener(
                "mouseenter",
                () => {

                    clickSound.currentTime = 0;

                    clickSound
                        .play()
                        .catch(() => {});

                }
            );


            button.addEventListener(
                "touchstart",
                () => {

                    clickSound.currentTime = 0;

                    clickSound
                        .play()
                        .catch(() => {});

                }
            );


        });




    // ==================================================
    // CONFIGURAÇÕES
    // ==================================================

    if (configBtn) {

        configBtn.onclick = () => {

            settingsScreen.style.display =
                "block";

        };

    }



    if (backSettings) {

        backSettings.onclick = () => {

            settingsScreen.style.display =
                "none";

        };

    }



    options.forEach(option => {

        option.onclick = () => {


            options.forEach(btn => {

                btn.classList.remove(
                    "ativo"
                );

            });


            option.classList.add(
                "ativo"
            );


            const page =
                option.dataset.page;



            // ==========================================
            // SOM
            // ==========================================

            if (page === "som") {


                info.innerHTML = `

                    VOLUME GERAL<br>

                    <input
                        id="geral"
                        type="range"
                        min="0"
                        max="100"
                        value="${volumes.geral}"
                    >

                    <p id="valorGeral">
                        ${volumes.geral}%
                    </p>

                    <br>


                    VOLUME CLICK<br>

                    <input
                        id="click"
                        type="range"
                        min="0"
                        max="100"
                        value="${volumes.click}"
                    >

                    <p id="valorClick">
                        ${volumes.click}%
                    </p>

                    <br>


                    VOLUME CHUVA<br>

                    <input
                        id="chuva"
                        type="range"
                        min="0"
                        max="100"
                        value="${volumes.chuva}"
                    >

                    <p id="valorChuva">
                        ${volumes.chuva}%
                    </p>

                    <br>


                    VOLUME TROVÃO<br>

                    <input
                        id="trova"
                        type="range"
                        min="0"
                        max="100"
                        value="${volumes.trova}"
                    >

                    <p id="valorTrova">
                        ${volumes.trova}%
                    </p>

                    <br>


                    VOLUME TRANSIÇÃO<br>

                    <input
                        id="transicao"
                        type="range"
                        min="0"
                        max="100"
                        value="${volumes.transicao}"
                    >

                    <p id="valorTransicao">
                        ${volumes.transicao}%
                    </p>

                `;



                const barras = [

                    "geral",
                    "click",
                    "chuva",
                    "trova",
                    "transicao"

                ];



                barras.forEach(id => {


                    const barra =
                        document.getElementById(
                            id
                        );


                    if (!barra) return;



                    barra.oninput = () => {


                        volumes[id] =
                            Number(
                                barra.value
                            );


                        atualizarVolumes();



                        const valor =
                            document.getElementById(
                                "valor" +
                                id
                                    .charAt(0)
                                    .toUpperCase() +
                                id.slice(1)
                            );


                        if (valor) {

                            valor.textContent =
                                barra.value +
                                "%";

                        }

                    };


                });

            }




            // ==========================================
            // IMAGEM
            // ==========================================

            if (page === "imagem") {


                const brilhoSalvo =
                    localStorage.getItem(
                        "brilho"
                    ) || 100;



                info.innerHTML = `

                    BRILHO<br><br>

                    <input
                        id="brightnessBar"
                        type="range"
                        min="50"
                        max="150"
                        value="${brilhoSalvo}"
                    >

                    <p id="valorBrilho">
                        ${brilhoSalvo}%
                    </p>

                `;



                const bar =
                    document.getElementById(
                        "brightnessBar"
                    );



                if (bar && background) {


                    background.style.filter =
                        "brightness(" +
                        brilhoSalvo +
                        "%)";



                    bar.oninput = () => {


                        background.style.filter =
                            "brightness(" +
                            bar.value +
                            "%)";


                        localStorage.setItem(
                            "brilho",
                            bar.value
                        );


                        const valor =
                            document.getElementById(
                                "valorBrilho"
                            );


                        if (valor) {

                            valor.textContent =
                                bar.value +
                                "%";

                        }

                    };

                }

            }




            // ==========================================
            // CONTROLES
            // ==========================================

            if (page === "controles") {


                info.innerHTML = `

                    CONTROLES<br><br>

                    <strong>W A S D</strong><br>
                    MOVIMENTO<br><br>

                    <strong>E</strong><br>
                    INTERAGIR<br><br>

                    <strong>SHIFT</strong><br>
                    CORRER

                `;

            }

        };

    });




    // ==================================================
    // TRANSIÇÃO
    // ==================================================

    function iniciarTransicao(
        callback
    ) {


        transitionScreen.classList.add(
            "show"
        );


        transitionSound.currentTime = 0;


        transitionSound
            .play()
            .catch(() => {});



        setTimeout(() => {


            transitionScreen.classList.remove(
                "show"
            );


            if (callback) {

                callback();

            }


        }, 3000);

    }




    // ==================================================
    // JOGAR → NICKNAME
    // ==================================================

    if (startBtn) {

        startBtn.onclick = () => {


            iniciarTransicao(() => {


                menu.style.display =
                    "none";


                nicknameScreen.style.display =
                    "block";


            });

        };

    }




    // ==================================================
    // NICKNAME → MENU
    // ==================================================

    if (backToMenu) {

        backToMenu.onclick = () => {


            iniciarTransicao(() => {


                nicknameScreen.style.display =
                    "none";


                menu.style.display =
                    "flex";


            });

        };

    }




    // ==================================================
    // NICKNAME → PERSONAGEM
    // ==================================================

    if (continueToCharacter) {

        continueToCharacter.onclick = () => {


            const nome =
                playerName.value.trim();



            if (nome === "") {


                alert(
                    "Digite seu nickname."
                );


                return;

            }



            localStorage.setItem(
                "playerName",
                nome
            );



            iniciarTransicao(() => {


                nicknameScreen.style.display =
                    "none";


                characterSelectScreen.style.display =
                    "block";


            });

        };

    }




    // ==================================================
    // SELEÇÃO DO PERSONAGEM
    // ==================================================

    let personagemSelecionado =
        false;



    if (characterCard) {

        characterCard.onclick = () => {


            personagemSelecionado =
                !personagemSelecionado;



            if (personagemSelecionado) {


                characterCard.classList.add(
                    "selected"
                );


                characterName.textContent =
                    "Personagem selecionado";


                localStorage.setItem(
                    "character",
                    "personagem1"
                );


            } else {


                characterCard.classList.remove(
                    "selected"
                );


                characterName.textContent =
                    "Personagem";


                localStorage.removeItem(
                    "character"
                );

            }

        };

    }




    // ==================================================
    // PERSONAGEM → NICKNAME
    // ==================================================

    if (backCharacter) {

        backCharacter.onclick = () => {


            iniciarTransicao(() => {


                characterSelectScreen.style.display =
                    "none";


                nicknameScreen.style.display =
                    "block";


            });

        };

    }




    // ==================================================
    // PERSONAGEM → JOGO
    // ==================================================

    if (finishCharacter) {

        finishCharacter.onclick = () => {


            if (!personagemSelecionado) {


                alert(
                    "Escolha um personagem primeiro."
                );


                return;

            }



            iniciarTransicao(() => {


                characterSelectScreen.style.display =
                    "none";


                gameScreen.style.display =
                    "block";


            });

        };

    }




    // ==================================================
    // RELÂMPAGO
    // ==================================================

    function relampago() {


        if (!lightning) return;



        const lados = [

            "left",
            "center",
            "right"

        ];



        const lado =
            lados[
                Math.floor(
                    Math.random() *
                    lados.length
                )
            ];



        if (lado === "left") {


            lightning.style.background =
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,.22), transparent 70%)";

        }



        if (lado === "center") {


            lightning.style.background =
                "radial-gradient(circle at center, rgba(255,255,255,.22), transparent 70%)";

        }



        if (lado === "right") {


            lightning.style.background =
                "radial-gradient(circle at 80% 50%, rgba(255,255,255,.22), transparent 70%)";

        }



        lightning.style.opacity =
            ".22";



        setTimeout(() => {


            lightning.style.opacity =
                "0";


        }, 350);



        setTimeout(() => {


            thunderSound.currentTime =
                0;


            thunderSound
                .play()
                .catch(() => {});


        }, 300);

    }



    setInterval(() => {

        relampago();

    }, 15000);




    // ==================================================
    // CARREGAR NOME SALVO
    // ==================================================

    const nomeSalvo =
        localStorage.getItem(
            "playerName"
        );


    if (
        nomeSalvo &&
        playerName
    ) {

        playerName.value =
            nomeSalvo;

    }




    // ==================================================
    // CARREGAR PERSONAGEM SALVO
    // ==================================================

    const personagemSalvo =
        localStorage.getItem(
            "character"
        );


    if (
        personagemSalvo ===
        "personagem1"
    ) {


        personagemSelecionado =
            true;


        if (characterCard) {

            characterCard.classList.add(
                "selected"
            );

        }


        if (characterName) {

            characterName.textContent =
                "Personagem selecionado";

        }

    }




    // ==================================================
    // FINAL
    // ==================================================

    console.log(
        "Silent Forest carregado com sucesso!"
    );

});
