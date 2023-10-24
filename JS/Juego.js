//<-------------------------------------Variable------------------------------------->

//<------------Variables de los sprite del juego------------>
//fondo
let fondoJuego;

//La nave del jugador
let naveJu;

//El disparo de la nave
let laser;

//Variable que guarda el botón para disparar
let Disparo;

//Variable que permitirá el movimiento de la nave
let cursores;

//Variable que está asociado a los enemigos
let enemigos;

//Variable que sirve para la música de la intro
let musicaIntroduccion;

//Variable que sirve para la música del juego
let musicaJuego;

//Variable que se asocia a la imagen de un enemigo
let enemigo, enemigo1, enemigo2, enemigo3, enemigo4, enemigo5 ;
//<------------------------>


//<-----------Variables internas para funcionamiento------------->
//Variable que se asocia a la cantidad de marcianos
let cantMar = 0;

//Tiempo entre disparos
let Cadencia = 0;

//Variable que se asocia a la cantidad de marcianos que han sido eliminados
let cantMuer = 0;

//Variable que determina si has ganado el juego
let ganaste = false;
//<------------------------>

//<------------Asociamos el Phaser al html------------>
//Cargamos la libreria
const juego = new Phaser.Game(700, 700, Phaser.CANVAS, 'bloque_juego');
//<------------------------>

//<-------------------------------------------------------------------------->


//<-------------------------------------Funciones adicionales------------------------------------->
//Función que se encarga de desender los enemigos
function desceder() {

    //Deciendo el grupo de enemigo en 10
    enemigos.y += 10;
}

//Función que comprueba si los enemigos de una fila ha desaparecido
function verificarFilaCompletaMuerta(fila) {

    // Se crea una constante que almacena enemigos que se encuentran en la fila especificada.
    const enemigosFila = enemigos.children.filter(enemigo => enemigo.y === fila * 50);

    // Verifica si todos los enemigos en la fila están muertos. Si todos los enemigos están muertos, la función devolverá true.
    return enemigosFila.every(enemigo => !enemigo.alive);
}

//Función que se encarga de las colisiones
function colision(bala,enemigo){

    //Elimina la bala
    bala.kill();

    //Elimina el enemigo
    enemigo.kill();

    //Aumenta el contador de muertes del enemigo en 1
    cantMuer++
    console.log(cantMuer)
}

//Función que se encarga de reinicar los valores para el correcto funcionamiento del juego
function reiniciarVariables() {
    // Restablece todas las variables necesarias al estado inicial.
    cantMar = 0;
    cantMuer = 0;
    ganaste = false;

}
//<-------------------------------------------------------------------------->



//<---------------------------------framework de pantallas----------------------------------------->
//<----------framework de la partida-------------->
//Variable que carga todos los elementos
let estadoPrincipal = {

    //<----------Pre descarga del framework-------------->
    //funcion que cargas las imagenes de los sprite
    preload: function () {
        //Cargamos la imagen de forndo con el nombre de fondo
        juego.load.image('fondo', 'img/fondo1.jpg');

        //Cargamos la imagen de la nave con el nombre de nave
        juego.load.image('nave', 'img/naves/nave8.png');

        //Cargamos la imagen de los disparos con el nombre de disparo
        juego.load.image('disparo', 'img/disparos/balasEspañolas.png');

        //Cargamos la imagen de los enemigos con el nombre de marciano
        juego.load.image('marciano', 'img/enemigo/enemigoNaranja.png');

        //Cargamos la imagen de los enemigos con el nombre de marciano
        juego.load.image('marciano1', 'img/enemigo/enemigoAnarillo.png');

        //Cargamos la imagen de los enemigos con el nombre de marciano
        juego.load.image('marciano2', 'img/enemigo/enemigoAzul.png');

        //Cargamos la imagen de los enemigos con el nombre de marciano
        juego.load.image('marciano3', 'img/enemigo/enemigoMorado.png');

        //Cargamos la imagen de los enemigos con el nombre de marciano
        juego.load.image('marciano4', 'img/enemigo/enemigoRojo.png');

        //Cargamos la imagen de los enemigos con el nombre de marciano
        juego.load.image('marciano5', 'img/enemigo/enemigoRosa.png');

        //Cargamos la imagen de los enemigos con el nombre de marciano
        juego.load.image('marciano6', 'img/enemigo/enemigoVerde.png');
        //Cargamos la imagen de los enemigos con el nombre de marciano
        juego.load.image('marciano7', 'img/enemigo/enemigoBlanco.png');


        juego.load.audio('musica', 'audio/Space Invaders.mp3');
    },
    //<------------------------>

    //<----------creación de los elementos del framework-------------->
    //funciones que crea los elementos del juego, dando posicion
    create: function () {

        reiniciarVariables();

        //Fondo
        //Insertamos el fondo al canvas con un tamaño específico con la imagen
        fondoJuego = juego.add.tileSprite(0, 0, 700, 700, 'fondo');

        //Nave
        //Insertamos la nave al canvas con una posición específica con la imagen

        naveJu = juego.add.sprite(juego.width / 2, 650, 'nave');
        juego.physics.enable(naveJu, Phaser.Physics.ARCADE);
        naveJu.body.immovable = true;
        naveJu.anchor.setTo(0.5);

        //Tecla de disparo
        //Asociamos los cursores a las teclas del teclado
        cursores = juego.input.keyboard.createCursorKeys();

        //Asociamos los disparos a la tecla espacio
        Disparo = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //Configuración de los disparos
        //Creamos un grupo para no saturar la memoria por los disparos
        laser = juego.add.group();

        //Habilita la funcionalidad de cuerpo físico para el laser.
        laser.enableBody = true;

        //Mete la fisicas arcade a los disparos
        laser.physicsBodyType = Phaser.Physics.ARCADE;

        //Crea un grupo de 20 con la imagenes asocioado a los disparos
        laser.createMultiple(20, 'disparo');

        //Establecemos el punto de anclaje en el centro del png
        laser.setAll('anchor.x', 0.5);

        //Establecemos el punto de anclaje en la base del png
        laser.setAll('anchor.y', 1);

        //Destruimos el laser al salir del canvas
        laser.setAll('outOfBoundsKill', true);

        //Comprueba si están dentro del canvas
        laser.setAll('checkWorldBounds', true);

        //Enemigos
        //Creamos un grupo para no saturar la memoria por los marcianos
        enemigos = juego.add.group()

        //Habilita la funcionalidad de cuerpo físico para los marcianos.
        enemigos.enableBody = true;

        //Mete la fisicas arcade a los marcianos
        enemigos.physicsBodyType = Phaser.Physics.ARCADE;

        //Creamos enemigos y los mostramos en pantalla
        //Bucle que permite la creacion de los enemigos de grupos de 7 emeigos en fila y 6 en calunmas
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 7; x++) {

                if (x === 0 || x === 1 ) {

                    //Creamos los enemigos segun la posicion asociada
                    enemigo = enemigos.create(x * 80, y * 50, 'marciano2');

                    //Ponemos el punto de apoyo en el medio
                    enemigo.anchor.setTo(0.5);

                }

                if (x === 2 || x === 3 || x === 4) {

                    //Creamos los enemigos segun la posicion asociada
                    enemigo = enemigos.create(x * 80, y * 50, 'marciano7');

                    //Ponemos el punto de apoyo en el medio
                    enemigo.anchor.setTo(0.5);

                }

                if (x === 5 || x === 6) {

                    //Creamos los enemigos segun la posicion asociada
                    enemigo = enemigos.create(x * 80, y * 50, 'marciano4');

                    //Ponemos el punto de apoyo en el medio
                    enemigo.anchor.setTo(0.5);

                }
                //Aumenta la el contador de marciano en 1
                cantMar++
            }

        }
        //Centramos un poco mejor los enemigos
        enemigos.x = 40;
        enemigos.y = 50;

        //Ahora le metemos la animacion
        let animacion = juego.add.tween(enemigos).to({x: 180}, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //Tras acer un loop decendera algo los enemigos
        animacion.onLoop.add(desceder, this)

        //Páramos la música de la intro
        musicaIntroduccion.stop();


        // Cargar la musica en la variable
        musicaJuego = juego.add.audio('musica');

        //Decimos que se escuchara en bucle en bucle
        musicaJuego.loop = true;

        //Hacemos que empiece ha sonar
        musicaJuego.play();



    },
    //<------------------------>

    //<----------actualización del framework-------------->
    //Función que se encarga de la actualización por pantalla de todos los elementos
    update: function () {

        //Condicional que comprueba si se presiona la tecla izquierda o la a
        if (cursores.left.isDown || juego.input.keyboard.isDown(Phaser.Keyboard.A)) {

            //Modifica la posicion de la nave a la izquierda
            naveJu.position.x -= 4;
        }

        //Condicional que comprueba si se presiona la tecla derecha o la d
        else if (cursores.right.isDown || juego.input.keyboard.isDown(Phaser.Keyboard.D)) {

            //Modifica la posicion de la nave a la derecha
            naveJu.position.x += 4;
        }

        //Creación de la variable para las balas
        let bala;

        //Condicional que comprueba si la tecla asociada a los disparos es presionada
        if (Disparo.isDown) {

            //Esta condición verifica si ha pasado suficiente tiempo desde el último disparo.
            if (juego.time.now > Cadencia) {

                //Coge la primera bala que existe de las 20
                bala = laser.getFirstExists(false);
            }

            //Comprueba si la bala existe
            if (bala) {

                //Coloca el disparo en la posicion de la nave
                bala.reset(naveJu.x, naveJu.y);

                //Ponemos velocidad a la vala para que balla para arriba
                bala.body.velocity.y = -300;

                //Le ponemos la diferencia de tiempo entre bala
                Cadencia = juego.time.now + 1300;
            }
        }

        //La eliminación de enemigos
        //Decteta la colisión de las balas a los enemigos, que llama un metodo
        juego.physics.arcade.overlap(laser, enemigos, colision, null, this);

        //Condicional que comprueba que todos los enemigos han sido eliminados
        if (cantMuer === cantMar){

            //Condicional que comprueba si ya no has ganado en la partida
            if (!ganaste){

                //Ponemos que se ha ganado la partida
                ganaste=true;

                //Cambiamos el framework al del final
                juego.state.start('Final');
            }
        }


        //Condiccional que comprueba si la primera fila ha muerto
         if (verificarFilaCompletaMuerta(1)) {

             //Condicional que comprueba si los enemigos superan cierto punto
            if (enemigos.y > 630) {

                //Cambiamos el framework al de la pantalla game over
                juego.state.start('Perder');
            }

            //Condiccional que comprueba si la segunda fila ha muerto
        }else if (verificarFilaCompletaMuerta(2)) {

             //Condicional que comprueba si los enemigos superan cierto punto
            if (enemigos.y > 580) {

                //Cambiamos el framework al de la pantalla game over
                juego.state.start('Perder');
            }

            //Condiccional que comprueba si la tercera fila ha muerto
        }else if (verificarFilaCompletaMuerta(3)) {

             //Condicional que comprueba si los enemigos superan cierto punto
            if (enemigos.y > 530) {

                //Cambiamos el framework al de la pantalla game over
                juego.state.start('Perder');
            }

            //Condiccional que comprueba si la cuarta fila ha muerto
        }else if (verificarFilaCompletaMuerta(4)) {

             //Condicional que comprueba si los enemigos superan cierto punto
            if (enemigos.y > 490) {

                //Cambiamos el framework al de la pantalla game over
                juego.state.start('Perder');
            }

            //Condiccional que comprueba si la quinta fila ha muerto
        }else if (verificarFilaCompletaMuerta(5)) {

             //Condicional que comprueba si los enemigos superan cierto punto
            if (enemigos.y > 430) {

                //Cambiamos el framework al de la pantalla game over
                juego.state.start('Perder');
            }
        }

    }
    //<------------------------>
};
//<------------------------>

//<----------framework de la Introducción-------------->

let estadoIntroduccion = {
    preload: function () {
        // Carga cualquier recurso necesario para la introducción, como imágenes o música.
        juego.load.image('fondo', 'img/fondo1.jpg')
        juego.load.audio('musica1', 'audio/A Theme For Space.mp3')
    },
    create: function () {
        // Crea un objeto de sonido para la música de introducción.
        musicaIntroduccion = juego.add.audio('musica1');
        musicaIntroduccion.loop = true;
        musicaIntroduccion.play();
        //Fondo
        //Insertamos el fondo al canvas con un tamaño específico con la imagen
        fondoJuego = juego.add.tileSprite(0, 0, 700, 700, 'fondo');
        // Crea la pantalla de introducción. Puedes agregar texto, imágenes u otros elementos.
        let TituloIntroduccion = juego.add.text(juego.width / 2,  200, 'La invasión francesa', {
            fontSize: '32px',
            fill: '#fff'
        });
        TituloIntroduccion.anchor.setTo(0.5);
        let textoIntroduccion = juego.add.text(juego.width / 2, juego.height / 2 - 50, 'Los franceses espaciales quiere invadir nuestro mundo', {
            fontSize: '20px',
            fill: '#fff'
        });
        textoIntroduccion.anchor.setTo(0.5);
        let textoIntroduccion1 = juego.add.text(juego.width / 2, juego.height / 2 -10  , 'y tu mision es detenerlos', {
            fontSize: '20px',
            fill: '#fff'
        });
        textoIntroduccion1.anchor.setTo(0.5);

        let FraseFIntroduccion = juego.add.text(juego.width / 2,  juego.height / 2 +100, 'Pulsa Enter para zarpar', {
            fontSize: '32px',
            fill: '#fff'
        });
        FraseFIntroduccion.anchor.setTo(0.5);

        // Escucha la tecla "Enter" (código 13) para iniciar el juego principal.
        juego.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.iniciarJuego, this);
    },
    iniciarJuego: function () {
        // Inicia el framework principal
        juego.state.start('principal');

    },
};



let estadoPerdido = {
    preload: function () {
        // Carga cualquier recurso necesario para la introducción, como imágenes o música.
        juego.load.image('fondo1', 'img/como-se-ve-el-infierno.jpg')

        juego.load.audio('musica1', 'audio/Himno Nacional de Francia.mp3')
    },
    create: function () {

        reiniciarVariables();

        // Detén la música de introducción (si se está reproduciendo).
        if (musicaJuego) {
            musicaJuego.stop();
        }
        // Crea un objeto de sonido para la música de introducción.
        musicaIntroduccion = juego.add.audio('musica1');
        musicaIntroduccion.loop = true;
        musicaIntroduccion.play();
        //Fondo
        //Insertamos el fondo al canvas con un tamaño específico con la imagen
        fondoJuego = juego.add.tileSprite(0, 0, 700, 700, 'fondo1');
        // Crea la pantalla de introducción. Puedes agregar texto, imágenes u otros elementos.
        let TituloIntroduccionF = juego.add.text(juego.width / 2,  200, 'Has perdido', {
            fontSize: '32px',
            fill: '#fff'
        });
        TituloIntroduccionF.anchor.setTo(0.5);
        let textoSubte = juego.add.text(juego.width / 2, juego.height / 2 - 50, 'Los franceses espaciales han invadido nuestro mundo', {
            fontSize: '20px',
            fill: '#fff'
        });
        textoSubte.anchor.setTo(0.5);
        let textoIntroduccion1 = juego.add.text(juego.width / 2, juego.height / 2 -10  , 'No pudiste frenarlos y nuestro mundo cayo', {
            fontSize: '20px',
            fill: '#fff'
        });
        textoIntroduccion1.anchor.setTo(0.5);

        let FraseFinal = juego.add.text(juego.width / 2,  juego.height / 2 +80, 'Pulsa Enter para volver atras en el tiempo', {
            fontSize: '32px',
            fill: '#fff'
        });
        FraseFinal.anchor.setTo(0.5);

        // Escucha la tecla "Enter" (código 13) para iniciar el juego principal.
        juego.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.TerminarJuego, this);
    },
    TerminarJuego: function () {
        // Inicia el framework principal
        juego.state.start('principal');

    },
};


let estadofinal = {
    preload: function () {
        // Carga cualquier recurso necesario para la introducción, como imágenes o música.
        juego.load.image('fondo1', 'img/fondoFinal.png')

        juego.load.audio('musica1', 'audio/Himno de España.mp3')
    },
    create: function () {

        reiniciarVariables();

        // Detén la música de introducción (si se está reproduciendo).
        if (musicaJuego) {
            musicaJuego.stop();
        }
        // Crea un objeto de sonido para la música de introducción.
        musicaIntroduccion = juego.add.audio('musica1');
        musicaIntroduccion.loop = true;
        musicaIntroduccion.play();
        //Fondo
        //Insertamos el fondo al canvas con un tamaño específico con la imagen
        fondoJuego = juego.add.tileSprite(0, 0, 700, 700, 'fondo1');
        // Crea la pantalla de introducción. Puedes agregar texto, imágenes u otros elementos.
        let textoIntroduccion = juego.add.text(juego.width / 2, juego.height / 2 - 50, 'Has ganado\nSi quiere repetir \nPulse Start', {
            fontSize: '40px',
            fill: '#84fd49'
        });
        textoIntroduccion.anchor.setTo(0.5);


        // Escucha la tecla "Enter" (código 13) para iniciar el juego principal.
        juego.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.TerminarJuego, this);
    },
    TerminarJuego: function () {

        // Inicia el framework principal
        juego.state.start('principal');

    },
};
juego.state.add('introduccion', estadoIntroduccion);
juego.state.start('introduccion');
juego.state.add('Final', estadofinal);
juego.state.add('Perder', estadoPerdido);
juego.state.add('principal', estadoPrincipal);