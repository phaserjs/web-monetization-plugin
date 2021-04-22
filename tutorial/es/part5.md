---
title: Web Monetization for Games
subtitle: Parte 5 - Como usar el plugin en un juego real
date: 
author: Richard Davey
twitter: photonstorm
---
# Como usar el plugin en un juego real

### Conociendo el proyecto

Ya llegó la hora de implementar el plugin dentro de nuestro juego.

Baja el juego de pruebas en el siguiente repositorio [aquí](https://github.com/photonstorm/gamewebmonetization) y dentro de ese repositorio encontrarás el juego en la siguiente ruta: **tutorial/examples/3Candies**.

Copia la carpeta en el sitio que quieras y arrastra la carpeta en tu Visual Studio Code o tu editor de texto favorito.

Dentro de la carpeta del juego podremos ver un **index.html** un **src** y la carpeta donde se aloja **phaser**, ya todo está preconfigurado así que solo nos interesa ir a **src**.

Dentro de **src** tenemos una carpeta llamada **plugins** y ahí es donde pondremos nuestro plugin, en el juego ya lo tenemos descargado así que no tendrás que preocuparte de volverlo a poner, de todas formas si necesitas bajar el plugin recuerda que lo tienes en este enlace: [aquí](https://github.com/photonstorm/gamewebmonetization/blob/main/plugin/dist/GameWebMonetization.js).

![Structure folder](../img/part5/1-structure_folders.png)

Ahora lo siguiente más importante que tenemos serán las escenas, como verás tenemos 4 escenas, **Intro**, **BackgroundScene**, **Menu** y **MainScene** que es la escena principal del juego.

![Scenes folder](../img/part5/2-scenes_folder.png)

Otra cosa que deberías prestar atención es al archivo que gestiona las variables globales, este archivo está dentro de **src**.

![Global vars](../img/part5/3-global_vars.png)

Si abres el archivo verás una sección comentada en donde pondremos nuestra configuración del plugin, pero mientras puedes observar que hemos definido un **background_selected**, esta variable nos servirá para activar o desactivar el menú premium ya que será usada por las escenas **Menu** y **BackgroundScene**.
Puedes jugar un poco y cambiar normal a premium, y observar los cambios, pero por favor devuelvela a "normal".

![Normal selected](../img/part5/4-background_selected.png)

El juego ya está completo y preparado para otorgar beneficios al usuario como por ejemplo: 
* Un mensaje personalizado al usuario si se está monetizando.
* La posibilidad de cambiar el fondo en la partida por un fondo más colorido.
* Tener 1 vida extra durante la partida.

Inicia el juego con tu servidor favorito (yo usaré la extensión de Live Server de Visual Studio Code), ve al navegador y podrás observar que el juego ha empezado: 

![First start game](../img/part5/5-first_start_game.png)

Si te fijas hemos preparado una escena de introducción y es porque esta escena la usaremos para iniciar la monetización, la monetización tarda unos segundos hasta que se pueda resolver si se está monetizando o no y gracias a esta escena podemos darle tiempo al plugin a empezar a monetizar el juego.

<br />

### Configurando el plugin

Bien, llegó el momento de poner el plugin en nuestro juego, vamos al archivo **global_vars.js** e importamos el plugin (esto lo hemos visto en los tutoriales anteriores), luego de importar vamos a exportar la variable para que pueda ser llamada en otro lado del juego, tu código debería verse de esta manera: 

![Config payment pointer and plugin](../img/part5/6-config_paymentpointer_and_plugin.png)

Recuerda que aún no empezarás a monetizar nada así que vamos a configurar eso en el archivo **intro.js**.

Vamos a nuestra escena **Intro**, importamos nuestro gamewebmonetization de **global_vars.js** de esta forma: 

```javascript
import { gamewebmonetization } from "../global_vars.js";
```
una vez hecho esto vamos a iniciar nuestro plugin con **.start()**, vamos a **init ()** e inmediatamente llamamos al método **.start()**.

![Start Monetization](../img/part5/7-start_monetization.png)

Ahora si reinicias tu juego verás que ya estarás monetizando.

![Is monetized with extension Coil](../img/part5/8-ismonetized_extension.png)

Monetizar está bien pero ahora hay que empezar a darle bonificaciones al usuario o algún mensaje que indique los agradecimientos por apoyarnos.
En el proyecto ya tenemos preparado un mensaje para eso en forma de imágenes con texto que se encuentran en la carpeta de **assets**, estos archivos son **intro.png** e **introthanks.png**

![Intro image](../img/part5/9-intro.png)

![Intro image](../img/part5/10-introthanks.png)

Así que lo que haremos será cambiar esos mensajes de agradecimientos en el intro.

Para poder cambiar los mensajes bajamos y justo debajo de **const intro** (en donde agregamos la imagen a escena) vamos a usar nuestro evento **start** y cambiar la textura de nuestra imagen (recuerda que ya hemos cargado todas las imágenes del proyecto por ti), seguro que ya recuerdas cual es, así que tu código tiene que quedarte más o menos así: 

```javascript
        const intro = this.add.image(x, 240, 'intro');
 
        // Plugin here
        gamewebmonetization.on("start", () => {
            intro.setTexture("introthanks");
        });
```

Volvamos a nuestro juego y observemos que es lo que ocurre.

![Change intro thanks](../img/part5/11-change_intro_thanks.gif)

¡Bien ya tenemos un mensaje de agradecimientos personalizado para nuestro usuario!

<br />

### Cambiando el fondo

Ahora si probamos a ir al menú tenemos los botones para cambiar de fondo, si clicamos el del fondo premium veremos que nos sale una notificación de que es necesario tener el plugin así que ahora vamos a agregar ese fondo exclusivo al usuario.

El sistema de cambio de fondos ya está completamente implementado, si te fijas si vas al archivo **Menu.js** verás que dentro de **init ()** tienes una variable llamada **this.isMonetized = false** y si analizas lo que hace un poco más abajo verás que nos ayuda a gestionar el fondo gracias a **background_selected.active** que está declarado en **global_var.js** una vez que se presione un botón u otro se cambiará el background activo y se pondrá en normal o premium y gracias a esto luego **BackgroundScene.js** sabrá automáticamente que fondo usar.

Bien, dentro de **Menu.js** solo vamos a usar el método **.isMonetized**, así que recuerda importar la instancia de nuestro plugin:

```javascript
import { background_selected, gamewebmonetization } from "../global_vars.js";
```

Así que asigna a this.isMonetized a gamewebmonetization.isMonetized y ya automáticamente si cambias el estado del botón verás que te dejará cambiar de fondo y podrás jugar con los fondos que quieras, tu código te tendría que quedar así: 

![Change background to premium](../img/part5/12-menu_background_premium.png)

Ahora si pruebas a jugar otra vez, verás que ya tienes la opción de cambiar de fondo.

![Change background gif](../img/part5/13-premium_background.gif)

### Vidas extras

Ahora por último vamos a hacer que el usuario tenga una vida extra exclusiva, ve a la escena principal **MainScene.js** y si te fijas también tenemos la variable llamada this.isMonetized pero si bajas hasta el método create verás está linea: 

```javascript
        // Lifes
        this.lifes = new Lifes(this, this.isMonetized);
```

En la instanciación de las vidas si te fijas le estamos pasando **this.isMonetized**, acá perfectamente podríamos poner true o false, juega un poco con eso y prueba el juego, pero recuerda dejar this.isMonetized como estaba antes.

Vamos hasta el método **init()** e reasignamos this.isMonetized tal cual lo hicimos con el Menu, recuerda de importar **gamewebmonetization**, te tendría que quedar así: 

![Extra life is monetized](../img/part5/14-extra_life_ismonetized.png)

Si inicias la partida verás que ahora tendrás 3 vidas y una de ellas es de oro por lo tanto es la vida extra que le damos al usuario.

![Extra life gif](../img/part5/15-extra_life.gif)

Como has visto hay muchas posibilidades a la hora de usar el plugin de monetización y como hemos mencionado antes todo depende de lo que quieras darle al usuario.