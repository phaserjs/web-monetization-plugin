---
title: Web Monetization for Games
subtitle: Parte 3 - Una descripción general del plugin
date: 
author: Richard Davey
twitter: photonstorm
---

# Una descripción general del plugin

Vamos a empezar a usar el plugin GameWebMonetization y a ver qué funciones están disponibles. 

Primero que todo recuerda que deberías tener tu payment pointer, si no lo tienes recuerda que lo has puesto en Coil así que lo podremos recuperar de acá.

Ve a la web de Coil y luego en Settings busca Payouts y verás tu payment pointer.


Ahora bien lo que haremos será generar una página simple de pruebas así que abre tu editor de código favorito (yo usaré Visual Studio Code), crea una carpeta en el escritorio (on donde quieras) y crea un index.html y un main.js, tal cual lo tengo en mi editor de código: 


Vamos a index.html y creamos su estructura básica llamando a main.js y definiéndolo como módulo para preparar todo, tal cual este modelo: 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Web Monetization</title>
</head>
<body>
    
    <script src="./main.js" type="module"></script>
</body>
</html>
```

Ahora, bajaremos el plugin y lo pondremos en el proyecto, justo en la raíz del mismo.

Como ya tenemos puesto el tipo módulo ya podremos cargar nuestro plugin desde main.js, usaremos imports aunque también podrías usar la versión es5 y cargarlo por medio del tag script y tendría que funcionar igual.

Vamos a main.js y le hacemos import a nuestro plugin arriba del todo: 

import { GameWebMonetization } from './GameWebMonetization.js';

Ahora en la siguiente línea para preparar el plugin hay que instanciarlo asignando una variable y colocando nuestro paymentPointer, te tiene que quedar así (recuerda poner tu paymentPointer): 
 
const gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});

Lo que hemos hecho hasta el momento es preparar el plugin, se ha instanciado y se ha asignado un payment pointer, ahora hay que iniciarlo. 
Abrimos nuestro index.html en el navegador (yo usaré Visual Studio Code y la extensión Live Server).
Una vez abierto aún te tendrá que salir que el sitio no es monetizable y esto es debido a que hemos preparado el plugin pero no hemos iniciado la monetización.

Volvamos a nuestro main.js y ahora iniciamos la monetización con el método start(), te tendría que quedar así: 

import { GameWebMonetization } from './GameWebMonetization.js';
 
const gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
 
gameWebMonetization.start();

Ahora si volvemos a la web y actualizamos veremos que nuestro sitio empieza a monetizar: 


Felicidades, ya solo con esa configuración puedes monetizar en todo momento pero también hay que darle alguna recompensa al usuario así que para eso tenemos diferentes métodos y propiedades que nos ayudarán a conocer el estado del plugin y vamos a ver algunas.

Métodos, eventos y propiedades

El plugin tiene diferentes eventos como son: start, stop, pending y progress.

Evento start.

Este evento es emitido cuando la API de monetización ha iniciado correctamente y se empieza a monetizar. 
Para usarlo simplemente ponemos en escucha el evento usando el método de escucha .on() y asignando el evento a escuchar GameWebMnetizationo.START, pon lo siguiente justo debajo de .start().

```javascript
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    // Here your code
});
```

En donde dice **Here your code** pondremos un console.log del argumento que nos manda el evento, y luego iremos a nuestra consola del navegador y observamos lo que nos ha devuelto, el código debería quedarte de esta manera:

```javascript
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    // Here your code
    console.log(event);
});
```

Como resultado en consola deberíamos tener algo así: 

Si te fijas tenemos nuestro paymentPointer y un requestId que es solo un id único, ni más ni menos. Ahora bien esto no es lo importante de este evento, necesitamos este evento para cuando queremos saber que se está monetizando el juego y poder mostrar algo de manera dinámica.
Así que ya sabes, usa este evento para saber cuando se inicia la monetización. 
Ahora bien hay que tener cuidado porque cada vez que cambias de ventana del navegador la monetización se detiene y tendrás otra emisión del evento start.

Propiedad isMonetized.

En el transcurso de tu juego a lo mejor solo te interesa conocer si se está monetizando o no de manera no tan dinámica y saber esto solo cuando se inicie una escena o cierta partida así que para eso tenemos la propiedad .isMonetized que es independiente del evento y que solo nos devuelve un booleano que solo conoceremos en qué estado está cuando esta propiedad es llamada.

Ahora le haremos un console.log antes de iniciar la monetización y luego otro console.log dentro del evento para ver sus cambios, pon el siguiente código: 

```javascript
var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});

console.log('Is monetized? ', gameWebMonetization.isMonetized);

gameWebMonetization.start();

gameWebMonetization.on(GameWebMonetization.START, (receive) => {
    // Here your code
    console.log('[inside event start] - Is monetized? ', gameWebMonetization.isMonetized);
});
```
Ahora si vamos a la consola del navegador podremos observar que antes de que se inicie la monetización y se genere el evento tendremos un false y luego true (true es cuando se está monetizando).



Ahora bien, llama a .isMonetized en cualquier parte de tu juego en donde quieras comprobar el estado en ese momento y dar algún premio o beneficio al usuario.

Estado actual del plugin
El plugin pasa por distintos estados que son los mismos estados como lo son: started, stopped o pending.
Para saber el estado basta con llamar a la propiedad .state, hagamos lo mismo que hicimos con isMonetized pero cambiandolo por state, te tendría que quedar el siguiente código: 
```javascript
import { GameWebMonetization } from './GameWebMonetization.js';
 
var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
 
console.log('The state: ', gameWebMonetization.state);
 
gameWebMonetization.start();
 
gameWebMonetization.on(GameWebMonetization.START, (receive) => {
    // Here your code
    console.log('[inside event start] - The state: ', gameWebMonetization.state);
});

```
Y en la consola podrás ver lo siguiente: 


Evento pending
Ahora te estarás preguntando: ¿y para qué sirve pending?
Pues este evento o estado emitido cuando el API de webmonetization se prepara para iniciar la monetization: 
Así que copiaremos el evento start que tenemos en escucha y su console.log pero cambiando la palabra start por pending, tendrías que tener ahora este código: 


```javascript
import { GameWebMonetization } from './GameWebMonetization.js';
 
var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
 
console.log('The state: ', gameWebMonetization.state);
 
gameWebMonetization.start();
 
gameWebMonetization.on(GameWebMonetization.PENDING, (receive) => {
    // Here your code
    console.log('[inside event pending] - The state: ', gameWebMonetization.state);
});
 
gameWebMonetization.on(GameWebMonetization.START, (receive) => {
    // Here your code
    console.log('[inside event start] - The state: ', gameWebMonetization.state);
});
 

```
Ahora vamos al navegador y veremos lo siguiente: 

Si te fijas ahora ya obtenemos el estado pendiente. En receive recibimos lo mismo que en el evento **start** así que no hace falta ver que hay ahí dentro.

Evento progress
Este evento se emite cuando hay un flujo de monetización constante.
Usaremos el siguiente código para saber el progreso: 

```javascript
gameWebMonetization.on(GameWebMonetization.PROGRESS, (receive) => {
    // Here your code
    console.log('Progress: ', receive);
});
 

```
Esta vez hemos usado un console.log a receive para ver que nos está devolviendo, si abrimos la consola veremos lo siguiente: 

Suena un poco raro, pero esto nos ayudará el progreso de la monetización en cada momento, este event se emite bastantes veces así que cuidado con él.
Si te fijas lo más destacable sería ver el assetCode y totalAmount.
El assetCode es el tipo de moneda que estamos recibiendo, en este caso es la criptomoneda XRP (no te preocupes, tu wallet convertirá las monedas automáticamente).
El totalAmount es la cantidad de ingresos que vamos obteniendo por un usuario (este contador se reinicia cada vez que el usuario reinicia el juego).

Evento stop
Y por último también tenemos el evento stop, así que copia el evento start y cambia start por stop, te tendría que quedar así: 


```javascript
 
gameWebMonetization.on(GameWebMonetization.STOP, (receive) => {
    // Here your code
    console.log('[inside event stop] - The state: ', gameWebMonetization.state);
});

```
Una vez puesto el evento no se va a emitir hasta que llamemos el método stop(), ahora bien lo que haremos será llamar ese método pasado un tiempo.
Usa setTimeout con cinco segundos y llama al método stop(), te tendría que quedar el siguiente código:
 
```javascript
gameWebMonetization.on(GameWebMonetization.STOP, (receive) => {
    // Here your code
    console.log('[inside event stop] - The state: ', gameWebMonetization.state);
});
 
setTimeout(() => {
    gameWebMonetization.stop();
}, 5000);
 

```
Ahora bien, si vas a la consola podrás ver que se emite el evento progress y luego se detiene el plugin y emite el evento stop: 


Puedes usar el evento de stop para saber en qué momento se detiene tu juego pero recuerda que este evento se emitirá también cuando cambies de ventana ya que se detendrá la monetización.
