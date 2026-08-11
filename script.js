// ======================================================
// SILENT FOREST
// SCRIPT PRINCIPAL — VERSÃO CORRIGIDA
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Silent Forest: JS carregado!");

    // ==================================================
    // SONS
    // ==================================================

    const clickSound = new Audio("sons/click.mp3");
    const transitionSound = new Audio("sons/transicao.mp3");
    const rainSound = new Audio("sons/chuva.mp3");
    const thunderSound = new Audio("sons/trovao.mp3");

    rainSound.loop = true;


    // ==================================================
    // VOLUMES
    // ==================================================

    let volumes =
        JSON.parse(localStorage.getItem("volumes")) || {
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
        document.getElementById("nicknameScreen");

    const playerName =
        document.getElementById("playerName");

    const backToMenu =
        document.getElementById("backToMenu");

    const continueToCharacter =
        document.getElementById("continueToCharacter");


    // PERSONAGEM

    const characterSelectScreen =
        document.getElementById("characterSelectScreen");

    const characterCard =
        document.getElementById("characterCard");

    const characterName =
        document.getElementById("characterName");

    const backCharacter =
        document.getElementById("backCharacter");

    const finishCharacter =
        document.getElementById("finishCharacter");


    // PLATAFORMA

    const platformScreen =
        document.getElementById("platformScreen");

    const pcButton =
        document.getElementById("pcButton");

    const mobileButton =
        document.getElementById("mobileButton");

    const backPlatform =
        document.getElementById("backPlatform");


    // JOGO

    const gameScreen =
        document.getElementById("gameScreen");

    const gameWorld =
        document.getElementById("gameWorld");

    const player =
        document.getElementById("player");

    const mobileControls =
        document.getElementById("mobileControls");


    // JOYSTICK

    const joystick =
        document.getElementById("joystick");

    const joystickKnob =
        document.getElementById("joystickKnob");

    const runButton =
        document.getElementById("runButton");

    const interactButton =
        document.getElementById("interactButton");


    // CONFIGURAÇÕES

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


    // FUNDO

    const background =
        document.getElementById("background");


    // RELÂMPAGO

    const lightning =
        document.getElementById("lightning");


    // ==================================================
    // VARIÁVEIS
    // ==================================================

    let personagemSelecionado = false;

    let plataformaSelecionada =
        localStorage.getItem("platform") || null;


    // ==================================================
    // JOYSTICK
    // ==================================================

    let joystickX = 0;
    let joystickY = 0;
    let joystickAtivo = false;


    // ==================================================
    // MOVIMENTO
    // ==================================================

    let playerX = 1500;
    let playerY = 1500;

    let velocidadeNormal = 3;
    let velocidadeCorrendo = 6;

    let correndo = false;

    const teclas = {};


    // ==================================================
    // SPRITES
    // ==================================================

    const sprites = {

        parado:
            "sprites/parado.png",

        frente:
            "sprites/correr_frente.png",

        atras:
            "sprites/correr_atras.png",

        direita:
            "sprites/correr_direita.png",

        esquerda:
            "sprites/correr_esquerda.png"

    };


    // ==================================================
    // INFORMAÇÕES DOS SPRITES
    // ==================================================
    //
    // IMPORTANTE:
    //
    // Não colocamos mais:
    //
    // 490px
    // 466px
    // 498px
    //
    // O JS vai descobrir automaticamente
    // o tamanho REAL de cada PNG.
    //
    // Cada folha possui 4 frames.
    //
    // ==================================================

    const spriteInfo = {};

    Object.keys(sprites).forEach(direcao => {

        spriteInfo[direcao] = {
            frames: 4,
            largura: 0,
            altura: 0,
            larguraFrame: 0,
            carregado: false
        };

    });


    // ==================================================
    // ESTADO DA ANIMAÇÃO
    // ==================================================

    let direcaoAtual = "frente";

    let andando = false;

    let frameAtual = 0;

    let ultimoFrame = 0;

    // Tempo entre os frames.
    // Menor = mais rápido.
    const velocidadeAnimacao = 120;


    // ==================================================
    // CARREGAR SPRITES
    // ==================================================

    Object.keys(sprites).forEach(direcao => {

        const imagem = new Image();

        imagem.onload = () => {

            const largura =
                imagem.naturalWidth;

            const altura =
                imagem.naturalHeight;

            const totalFrames =
                spriteInfo[direcao].frames;

            const larguraFrame =
                largura / totalFrames;


            spriteInfo[direcao].largura =
                largura;

            spriteInfo[direcao].altura =
                altura;

            spriteInfo[direcao].larguraFrame =
                larguraFrame;

            spriteInfo[direcao].carregado =
                true;


            console.log(
                `Sprite ${direcao}:`,
                largura,
                "x",
                altura,
                "| frame:",
                larguraFrame,
                "x",
                altura
            );


            // Se for o sprite atual,
            // aplica imediatamente.
            if (direcaoAtual === direcao) {

                aplicarSprite(direcao);

            }

        };


        imagem.onerror = () => {

            console.error(
                "Erro ao carregar sprite:",
                sprites[direcao]
            );

        };


        imagem.src =
            sprites[direcao];

    });


    // ==================================================
    // APLICAR SPRITE
    // ==================================================

    function aplicarSprite(direcao) {

        if (!player) return;


        const dados =
            spriteInfo[direcao];

        if (!dados) return;

        if (!dados.carregado) return;


        const larguraFrame =
            dados.larguraFrame;

        const altura =
            dados.altura;


        // ----------------------------------------------
        // TROCA A IMAGEM
        // ----------------------------------------------

        player.style.backgroundImage =
            `url("${sprites[direcao]}")`;


        // ----------------------------------------------
        // TAMANHO EXATO DE UM FRAME
        // ----------------------------------------------

        player.style.width =
            `${larguraFrame}px`;

        player.style.height =
            `${altura}px`;


        // ----------------------------------------------
        // TAMANHO EXATO DA FOLHA
        // ----------------------------------------------

        player.style.backgroundSize =
            `${dados.largura}px ${dados.altura}px`;


        // ----------------------------------------------
        // POSIÇÃO DO FRAME
        // ----------------------------------------------

        const posicaoX =
            frameAtual * larguraFrame;


        player.style.backgroundPosition =
            `-${posicaoX}px 0px`;

    }


    // ==================================================
    // ANIMAÇÃO DOS FRAMES
    // ==================================================

    function atualizarAnimacao(tempo) {

        if (!player) {

            requestAnimationFrame(
                atualizarAnimacao
            );

            return;

        }


        // =================================================
        // PERSONAGEM ANDANDO
        // =================================================

        if (andando) {

            const dados =
                spriteInfo[direcaoAtual];


            if (
                dados &&
                dados.carregado &&
                tempo - ultimoFrame >=
                velocidadeAnimacao
            ) {

                frameAtual++;

                if (
                    frameAtual >=
                    dados.frames
                ) {

                    frameAtual = 0;

                }


                aplicarSprite(
                    direcaoAtual
                );


                ultimoFrame =
                    tempo;

            }

        }


        // =================================================
        // PERSONAGEM PARADO
        // =================================================

        else {

            frameAtual = 0;

            aplicarSprite("parado");

        }


        requestAnimationFrame(
            atualizarAnimacao
        );

    }


    requestAnimationFrame(
        atualizarAnimacao
    );


    // ==================================================
    // ALTERAR DIREÇÃO
    // ==================================================

    function atualizarDirecao(
        movimentoX,
        movimentoY
    ) {

        if (
            movimentoX === 0 &&
            movimentoY === 0
        ) {

            return;

        }


        // Vertical possui prioridade
        // quando o movimento é maior.

        if (
            Math.abs(movimentoY) >
            Math.abs(movimentoX)
        ) {

            if (movimentoY < 0) {

                // W
                direcaoAtual =
                    "atras";

            } else {

                // S
                direcaoAtual =
                    "frente";

            }

        } else {

            if (movimentoX > 0) {

                // D
                direcaoAtual =
                    "direita";

            } else {

                // A
                direcaoAtual =
                    "esquerda";

            }

        }

    }


    // ==================================================
    // CHUVA
    // ==================================================

    function iniciarChuva() {

        rainSound
            .play()
            .catch(() => {});

    }


    document.addEventListener(
        "click",
        iniciarChuva,
        { once: true }
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

                btn.classList.remove("ativo");

            });


            option.classList.add("ativo");


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
                        document.getElementById(id);

                    if (!barra) return;


                    barra.oninput = () => {

                        volumes[id] =
                            Number(barra.value);

                        atualizarVolumes();


                        const valor =
                            document.getElementById(
                                "valor" +
                                id.charAt(0).toUpperCase() +
                                id.slice(1)
                            );


                        if (valor) {

                            valor.textContent =
                                barra.value + "%";

                        }

                    };

                });

            }


            // ==========================================
            // IMAGEM
            // ==========================================

            if (page === "imagem") {

                const brilhoSalvo =
                    localStorage.getItem("brilho") || 100;


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
                                bar.value + "%";

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

                    <strong>PC</strong><br>

                    W A S D<br>
                    MOVIMENTO<br><br>

                    SHIFT<br>
                    CORRER<br><br>

                    E<br>
                    INTERAGIR<br><br>

                    <strong>CELULAR</strong><br>

                    JOYSTICK<br>
                    MOVIMENTO<br><br>

                    BOTÃO CORRER<br>
                    CORRER<br><br>

                    BOTÃO E<br>
                    INTERAGIR

                `;

            }

        };

    });


    // ==================================================
    // TRANSIÇÃO
    // ==================================================

    function iniciarTransicao(callback) {

        transitionScreen.classList.add("show");

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
    // PERSONAGEM → PLATAFORMA
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

                platformScreen.style.display =
                    "block";

            });

        };

    }


    // ==================================================
    // PLATAFORMA → PC
    // ==================================================

    if (pcButton) {

        pcButton.onclick = () => {

            selecionarPlataforma("pc");

        };

    }


    // ==================================================
    // PLATAFORMA → CELULAR
    // ==================================================

    if (mobileButton) {

        mobileButton.onclick = () => {

            selecionarPlataforma("mobile");

        };

    }


    // ==================================================
    // ESCOLHER PLATAFORMA
    // ==================================================

    function selecionarPlataforma(plataforma) {

        plataformaSelecionada =
            plataforma;


        localStorage.setItem(
            "platform",
            plataforma
        );


        iniciarTransicao(() => {

            platformScreen.style.display =
                "none";

            gameScreen.style.display =
                "block";

            configurarControles();

        });

    }


    // ==================================================
    // PLATAFORMA → PERSONAGEM
    // ==================================================

    if (backPlatform) {

        backPlatform.onclick = () => {

            iniciarTransicao(() => {

                platformScreen.style.display =
                    "none";

                characterSelectScreen.style.display =
                    "block";

            });

        };

    }


    // ==================================================
    // CONFIGURAR CONTROLES
    // ==================================================

    function configurarControles() {

        if (!mobileControls) return;


        if (
            plataformaSelecionada ===
            "mobile"
        ) {

            mobileControls.style.display =
                "block";

        } else {

            mobileControls.style.display =
                "none";

        }

    }


    // ==================================================
    // JOYSTICK
    // ==================================================

    function atualizarJoystick(
        touchX,
        touchY
    ) {

        if (!joystick) return;


        const rect =
            joystick.getBoundingClientRect();


        const centroX =
            rect.left +
            rect.width / 2;


        const centroY =
            rect.top +
            rect.height / 2;


        let dx =
            touchX -
            centroX;


        let dy =
            touchY -
            centroY;


        const distancia =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        const limite =
            rect.width / 2 -
            30;


        if (distancia > limite) {

            dx =
                (dx / distancia) *
                limite;

            dy =
                (dy / distancia) *
                limite;

        }


        joystickX =
            dx / limite;

        joystickY =
            dy / limite;


        joystickKnob.style.transform =
            `translate(
                calc(-50% + ${dx}px),
                calc(-50% + ${dy}px)
            )`;

    }


    function resetarJoystick() {

        joystickX = 0;
        joystickY = 0;

        joystickKnob.style.transform =
            "translate(-50%,-50%)";

    }


    if (joystick) {

        joystick.addEventListener(
            "touchstart",
            event => {

                event.preventDefault();

                joystickAtivo = true;

                const touch =
                    event.touches[0];

                atualizarJoystick(
                    touch.clientX,
                    touch.clientY
                );

            },
            { passive: false }
        );


        joystick.addEventListener(
            "touchmove",
            event => {

                if (!joystickAtivo)
                    return;

                event.preventDefault();

                const touch =
                    event.touches[0];

                atualizarJoystick(
                    touch.clientX,
                    touch.clientY
                );

            },
            { passive: false }
        );


        joystick.addEventListener(
            "touchend",
            event => {

                event.preventDefault();

                joystickAtivo = false;

                resetarJoystick();

            },
            { passive: false }
        );

    }


    // ==================================================
    // BOTÃO CORRER — CELULAR
    // ==================================================

    if (runButton) {

        runButton.addEventListener(
            "touchstart",
            event => {

                event.preventDefault();

                correndo = true;

                runButton.style.background =
                    "#8b0000";

            },
            { passive: false }
        );


        runButton.addEventListener(
            "touchend",
            event => {

                event.preventDefault();

                correndo = false;

                runButton.style.background =
                    "rgba(20,20,20,.8)";

            },
            { passive: false }
        );


        runButton.addEventListener(
            "touchcancel",
            () => {

                correndo = false;

                runButton.style.background =
                    "rgba(20,20,20,.8)";

            }
        );

    }


    // ==================================================
    // BOTÃO INTERAGIR
    // ==================================================

    if (interactButton) {

        interactButton.addEventListener(
            "touchstart",
            event => {

                event.preventDefault();

                console.log(
                    "Interagir!"
                );

            },
            { passive: false }
        );

    }


    // ==================================================
    // CONTROLES PC
    // ==================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                plataformaSelecionada !==
                "pc"
            ) return;


            const tecla =
                event.key.toLowerCase();


            teclas[tecla] = true;


            if (
                event.key === "Shift"
            ) {

                correndo = true;

            }


            // Evita comportamento do navegador
            // com teclas de movimento.

            if (
                [
                    "w",
                    "a",
                    "s",
                    "d",
                    "shift"
                ].includes(tecla)
            ) {

                event.preventDefault();

            }

        }
    );


    document.addEventListener(
        "keyup",
        event => {

            if (
                plataformaSelecionada !==
                "pc"
            ) return;


            const tecla =
                event.key.toLowerCase();


            teclas[tecla] = false;


            if (
                event.key === "Shift"
            ) {

                correndo = false;

            }

        }
    );


    // ==================================================
    // MOVIMENTO + CÂMERA
    // ==================================================

    function atualizarMovimento() {

        requestAnimationFrame(
            atualizarMovimento
        );


        if (!gameScreen) return;


        if (
            gameScreen.style.display !==
            "block"
        ) {

            andando = false;

            return;

        }


        let movimentoX = 0;
        let movimentoY = 0;


        // =================================================
        // CELULAR
        // =================================================

        if (
            plataformaSelecionada ===
            "mobile"
        ) {

            movimentoX =
                joystickX;

            movimentoY =
                joystickY;

        }


        // =================================================
        // PC
        // =================================================

        if (
            plataformaSelecionada ===
            "pc"
        ) {

            if (teclas["w"]) {

                movimentoY -= 1;

            }

            if (teclas["s"]) {

                movimentoY += 1;

            }

            if (teclas["a"]) {

                movimentoX -= 1;

            }

            if (teclas["d"]) {

                movimentoX += 1;

            }

        }


        // =================================================
        // NORMALIZAR DIAGONAL
        // =================================================

        const distancia =
            Math.sqrt(
                movimentoX *
                movimentoX +
                movimentoY *
                movimentoY
            );


        if (distancia > 1) {

            movimentoX /=
                distancia;

            movimentoY /=
                distancia;

        }


        // =================================================
        // VERIFICAR MOVIMENTO
        // =================================================

        andando =
            movimentoX !== 0 ||
            movimentoY !== 0;


        // =================================================
        // DIREÇÃO
        // =================================================

        if (andando) {

            atualizarDirecao(
                movimentoX,
                movimentoY
            );

        }


        // =================================================
        // VELOCIDADE
        // =================================================

        const velocidadeAtual =
            correndo
                ? velocidadeCorrendo
                : velocidadeNormal;


        // =================================================
        // MOVIMENTAR
        // =================================================

        playerX +=
            movimentoX *
            velocidadeAtual;

        playerY +=
            movimentoY *
            velocidadeAtual;


        // =================================================
        // LIMITES DO MAPA
        // =================================================

        const larguraMapa =
            gameWorld.offsetWidth;

        const alturaMapa =
            gameWorld.offsetHeight;


        const larguraPersonagem =
            player.offsetWidth;

        const alturaPersonagem =
            player.offsetHeight;


        playerX =
            Math.max(
                0,
                Math.min(
                    larguraMapa -
                    larguraPersonagem,
                    playerX
                )
            );


        playerY =
            Math.max(
                0,
                Math.min(
                    alturaMapa -
                    alturaPersonagem,
                    playerY
                )
            );


        // =================================================
        // POSIÇÃO
        // =================================================

        player.style.left =
            playerX + "px";

        player.style.top =
            playerY + "px";


        // =================================================
        // CÂMERA
        // =================================================

        const centroX =
            window.innerWidth / 2 -
            playerX -
            larguraPersonagem / 2;


        const centroY =
            window.innerHeight / 2 -
            playerY -
            alturaPersonagem / 2;


        gameWorld.style.transform =
            `translate(${centroX}px, ${centroY}px)`;

    }


    requestAnimationFrame(
        atualizarMovimento
    );


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


    setInterval(
        relampago,
        15000
    );


    // ==================================================
    // CARREGAR NOME
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
    // CARREGAR PERSONAGEM
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
    // CARREGAR PLATAFORMA
    // ==================================================

    if (
        plataformaSelecionada ===
        "mobile"
    ) {

        configurarControles();

    }


    // ==================================================
    // SPRITE INICIAL
    // ==================================================

    if (player) {

        // Começa parado olhando para frente.

        direcaoAtual =
            "frente";

        frameAtual =
            0;

        aplicarSprite(
            "parado"
        );

    }


    // ==================================================
    // FINAL
    // ==================================================

    console.log(
        "Silent Forest carregado com sucesso!"
    );

});
