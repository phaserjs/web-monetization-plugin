---
title: Web Monetization for Games
subtitle: Part 4 - Methods, Properties and Plugin Events
date: 23rd April 2021
author: Richard Davey
twitter: photonstorm
---

Recuerde, en cualquier momento puede leer la [documentación completa de la API del plugin](https://photonstorm.github.io/gamewebmonetization/plugin/docs/) en GitHub.

El plugin emitirá cuatro eventos claves: 

1. `start`
2. `stop`
3. `pending`
4. `progress`

Puedes escuchar cada uno de estos eventos en el código de tu juego porque el plugin Game Web Monetization es un emisor de eventos. Esto significa que puede utilizar los siguientes métodos directamente en el complemento:

```js
once('event-name', eventHandler, context);
on('event-name', eventHandler, context);
off('event-name', eventHandler, context);
```

Si prefiere ser más detallado, puede usar `addListener` en lugar de` on` y `removeListener` en lugar de` off`. Usaremos la versión corta en el siguiente código.

### Evento start.

Este evento se emite cuando la API de Web Monetization se inicia correctamente.

Para usarlo, puede vincular su propio oyente al evento `GameWebMonetization.START`:

```javascript
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    // Here your code
});
```

**Sugerencia:** ¡Recuerde hacer esto _antes_ de llamar a `start()` en el complemento!

Para probarlo, vamos a hacer un console.log cuando el evento es disparado, para que podamos obeservar que nos devuelve en nuestra consola Dev Tool del navegador.

Agregue el siguiente código a su archivo `main.js`, _antes_ de llamar a `gameWebMonetization.start()`:

```javascript
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    console.log(event);
});
```

Si ahora prueba esto, debería ver lo siguiente en su consola Dev Tool:

![Result of Event Start](part3/6-resulteventstart.png)

Al manejador del evento (event) recibe un objeto que contiene las siguientes propiedades:

property | details
--- | ---
`paymentPointer` | Tu Payment Pointer. Es el mismo valor que has usado en la configuración.
`requestId` | Este valor es un ID de dessión o ID de monetización (UUID v4) generado por el agente de usuario.

Es posible que haya notado que nos han enviado tanto un `paymentPointer` como un` requestId`.

Puedes usar el evento `start` para saber que tu juego está siendo monetizado. En este punto, puede mostrar un mensaje al jugador, agradeciéndole o quizás desbloqueando algún contenido adicional.

**Importante:** Cada vez que cambia la ventana del navegador, o cambia a otra pestaña del navegador, la monetización se detiene. Cuando el jugador regrese a la ventana, el evento `start` se activará nuevamente. Así que tenga en cuenta este flujo en el código de su juego y trátelo de forma adecuada.

### Propiedad isMonetized.

El evento `start` es útil para saber cuándo _comienza_ la monetización, pero ¿qué pasa si quieres comprobar si tu juego está monetizado o no en algún lugar más profundo de tu código?

Para ello, puede utilizar la propiedad booleana `isMonetized`.

Esta propiedad se puede verificar en cualquier momento del juego y proporciona una respuesta simple de verdadero/falso (true/false) a la pregunta "¿Este jugador ha monetizado mi juego?"

Probemos esto modificando nuestro `main.js` para que la consola registre el estado de la propiedad antes y después del evento` start`:

```javascript
var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});

// New code:
console.log('Is monetized? ', gameWebMonetization.isMonetized);

gameWebMonetization.start();

// New code:
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    console.log('[inside event start] - Is monetized? ', gameWebMonetization.isMonetized);
});
```

Si prueba este código, verá que antes de que comience la monetización, la propiedad es `false` y cambia a `true` después de que se activa el evento `start`:

![ismonetized_result](part3/7-ismonetized_result.png)

Puedes comprobar la propiedad `isMonetized` en cualquier momento de tu juego. El complemento lo mantiene actualizado internamente, por lo que es seguro usarlo para otorgar al jugador un premio especial o un beneficio en el juego.

### Conocer el estado actual del plugin

El plugin pasa por distintos estados en su ciclo de vida:

1. **started** - El plugin se ha iniciado correctamente y está monetizando su contenido.
2. **stopped** - El plugin se ha detenido y no está monetizando correctamente el contenido.
3. **pending** - El plugin ha solicitado que se inicie la monetización y actualmente está negociando la puesta en marcha, pero aún no se ha completado este paso.

Para conocer el estado actual puede consultar la propiedad `state`.

Hagamos lo mismo que hicimos con `isMonetized` para ver el `state`. Aquí hay un `main.js` actualizado para probar esto:

```javascript
import { GameWebMonetization } from './GameWebMonetization.js';
 
var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
 
gameWebMonetization.start();

// New code
console.log('The state: ', gameWebMonetization.state);
 
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    // New code
    console.log('[inside event start] - The state: ', gameWebMonetization.state);
});
```

Y en la consola podrás ver lo siguiente: 

![the state](part3/8-thesate.png)

### Evento pending

Este evento se emite mientras la API de Web Monetization se prepara para comenzar a monetizar su sitio. Esto sucede después de llamar al método `start` en el complemento. La API entrará en un estado de 'pendiente', lo que significa que actualmente está negociando para comenzar con su Payment Pointer, pero aún no ha terminado de hacerlo. Si la negociación tiene éxito, el complemento emitirá su evento `START`.

Editemos nuestro `main.js` para demostrar este estado:

```javascript
import { GameWebMonetization } from './GameWebMonetization.js';
 
var gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
 
gameWebMonetization.start();

console.log('The state: ', gameWebMonetization.state);

// New code
gameWebMonetization.on(GameWebMonetization.PENDING, (event) => {
    console.log('[inside event pending] - The state: ', gameWebMonetization.state);
});
 
gameWebMonetization.on(GameWebMonetization.START, (event) => {
    console.log('[inside event start] - The state: ', gameWebMonetization.state);
});
```

Ahora vamos al navegador y veremos lo siguiente:

![Peding event](part3/9-pending_event.png)

Al mirar los registros de la consola, puede ver el flujo de la API en acción.

Si hay un problema para conectarse a su puntero de pago, entonces el flujo sería `PENDING` seguido del evento `STOP`. Si la conexión fue exitosa, el flujo sería `PENDING` seguido del evento `START`.

Si hay un error de red, por ejemplo, el wifi se desconecta, mientras que la solicitud todavía está `PENDIENTE`, permanecerá en este estado indefinidamente, sin llegar nunca al evento `STOP`. Por lo tanto, use siempre el booleano `isMonetized` en el código de su juego para estar al tanto del estado _actual_ de la monetización.

### Evento progress

Cuando la API de monetización web se conecte con éxito a su Payment Pointer, comenzará a transmitir micropagos a su billetera. Cada vez que esto suceda, disparará un evento `PROGRESS`.

Este evento contiene muchos datos útiles, incluida la cantidad que se acaba de transmitir a su billetera y puede usarlo en su juego para realizar un seguimiento del flujo de pago, o tal vez usarlo para mostrar visualmente una animación especial o similar.

Puedes usar el evento de esta manera:

```javascript
gameWebMonetization.on(GameWebMonetization.PROGRESS, (event) => {
    console.log('Progress: ', event);
});
```

Agregue lo anterior en su `main.js` y actualiza el navegador. Abra la consola para ver el resultado: 

![Progress event](part3/10-progress_event.png)

Este evento nos brinda muchas propiedades útiles:

property | details
--- | ---
`paymentPointer` | Tu Payment Pointer. Es el mismo valor que has usado en la configuración.
`requestId` | Este valor es un ID de dessión o ID de monetización (UUID v4) generado por el agente de usuario.
`amount` | La cantidad de destino recibida según se especifica en el paquete del protcolo Interledger (ILP).
`assetCode` | El código (normalmente tres caracteres) que identifica el tipo de unidad. Una unidad, por ejemplo podría ser una moneda (USD, XRP). 
`assetScale` | El número de lugares después del decimal para la cantidad. Por ejemplo, si tiene USD con una escala de activos de dos, entonces la unidad mínima divisible es centavos.
`receipt` | Recibo de STREAM codificado en base64 emitido por el receptor de Web Monetization al proveedor de Web Monetization como prueba de la cantidad total recibida en la transmisión.
`totalAmount` | La suma de lo que se ha recibido con el paymentPointer actual, si se cambia el paymentPointer, esta cantidad se reiniciará

Como puede ver, ¡son muchos datos útiles!

Quizás las propiedades más interesantes son `assetCode` y `totalAmount`. El `assetCode` es el tipo de moneda que estamos recibiendo, en este caso es la criptomoneda XRP. Aunque su billetera no esté configurada para XRP, esta es la moneda principal en la que Uphold transfiere. Sin embargo, no se preocupe, recibirá la moneda real deseada en su billetera. Si está utilizando un proveedor que no sea Uphold, debería ver que la moneda coincide con la establecida en su billetera.

El `totalAmount` es la cantidad de ingresos que hemos obtenido hasta ahora del jugador durante _esta sesión de juego_. Este contador se reinicia si se actualiza la página que contiene su juego. No persiste más que una sola sesión de juego.

Como su nombre lo indica, el evento `PROGRESS` le ayuda a realizar un seguimiento del proceso de monetización en todo momento. Debido a que el flujo de pagos a su billetera es constante, este evento se activa muchas veces. Durante las pruebas, vimos que se disparaba _cada 2 segundos_ que el juego se estaba ejecutando, pero la frecuencia real puede ser mayor o menor que esto. ¡Así que ten cuidado con lo que hace tu juego como resultado de este evento!

En lugar de usar este evento para crear animaciones en el juego, es mejor que pase la información que contiene y luego la use de sus propios eventos cronometrados en el juego.

### La propiedad `total`

Como vimos, el evento `PROGRESS` nos brinda muchos datos útiles. El plugin le ofrece una propiedad `total` que realiza un seguimiento de la cantidad total de pagos que un jugador ha transferido a su billetera/wallet durante su sesión de juego.

Este valor persiste incluso si cambian a otra aplicación y luego regresan a su juego.

Puede acceder al `total` en cualquier momento a través de la instancia del complemento:

```javascript
const currentTotal = gameWebMonetization.total;
```

La moneda del `total` variará según el servicio de billetera/wallet que esté utilizando. Uphold, usa XRP y luego lo convierte en la moneda elegida al final. Sin embargo, otros servicios de billetera se transmitirán a través del protocolo Interledger en la moneda real de su billetera/wallet.

Esta moneda se puede obtener a través de la propiedad `assetCode` enviada por el evento `PROGRESS`. Si no coincide con el de su billetera/wallet, es probable que esté usando XRP como moneda de cambio. Puede calcular cuánto ha recibido realmente, en la moneda que elija, utilizando la propiedad `assetScale`.

### Evento stop

Finalmente, tenemos el evento `STOP`. Este evento se emite cuando la API entra en un estado detenido. Esto podría deberse a que usted llama al método de `stop` del plugin o que el usuario detiene el pago a través de su navegador al realizar una acción como cambiar a otra pestaña o ventana del navegador.

Puedes ponerlo en escucha de la misma manera que los otros eventos. Modifiquemos nuestro `main.js` para manejar esto:

```javascript
gameWebMonetization.on(GameWebMonetization.STOP, (event) => {
    console.log('[inside event stop] - The state: ', gameWebMonetization.state);
});

```

Una vez que se crea el manejador de eventos, se emitirá si llamamos al método `stop` o cambiamos a otra pestaña del navegador.

Intente ejecutar lo anterior y luego cambiar dentro y fuera de la pestaña varias veces. Debería ver un evento `STOP` cada vez que haga esto:
 
![Event Stop](part3/11-stop_event.png)

Alternativamente, podríamos falsificar esta acción usando `setTimeout` para llamar al método `stop` por nosotros, como en el siguiente código:

```javascript
gameWebMonetization.on(GameWebMonetization.STOP, (receive) => {
    console.log('[inside event stop] - The state: ', gameWebMonetization.state);
});
 
setTimeout(() => {
    gameWebMonetization.stop();
}, 5000);
```

Ahora, si va a la consola, verá que se emite el evento de progreso y luego el complemento se detiene después de 5 segundos.

Puedes usar el evento `STOP` para saber cuándo se detuvo la monetización. Solo recuerde que es muy posible que comience de nuevo, es decir, si cambiaron de pestaña o aplicación.

### Como cambiar el paymentPointer

Si necesitas cambiar EL Payment Pointer que usa tu juego, puedes llamar al método `changePaymentPointer`.

Simplemente llame al método y pásele un nuevo objeto de configuración:

```javascript
gameWebMonetization.changePaymentPointer({
    paymentPointer: '$ilp.uphold.com/ziW6E7iwKUkp',
    pointerName: "Alice"
});
gameWebMonetization.restart();
```

Llamar a `changePaymentPointer()` solo prepara el complemento para el cambio, pero no lo hace. Para eso, necesita llamar al método `restart()`, como en el código de ejemplo anterior.

Los punteros de pago también se pueden proporcionar como una matriz ponderada. Esto le permite aprovechar el reparto de ingresos probabilístico, que trataremos en la siguiente parte del tutorial.