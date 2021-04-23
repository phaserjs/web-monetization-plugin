---
title: Web Monetization para Juegos
subtitle: Parte 5 - Divide las ganancias
date: 23rd April 2021
author: Richard Davey
twitter: photonstorm
---

Con el plugin Game Web Monetization, es posible dividir los ingresos que recibe su juego entre varios Payment Pointers. La API de Web Monetization no puede hacer esto directamente, por lo que se utiliza un proceso conocido como distribución probabilística de ingresos. Puede [leer más](https://webmonetization.org/docs/probabilistic-rev-sharing) sobre este concepto en el sitio web de monetización web.

Como ha visto en tutoriales anteriores, debe pasar un objeto de configuración al complemento que contiene un `paymentPointer`. Esta es la dirección de la billetera / wallet que recibirá los pagos:

```javascript
const gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
```

Sin embargo, también puede proporcionar un Array de objetos de configuración y asignar a cada uno de ellos un valor de peso (`weight`), como este:

```javascript
const gameWebMonetization = new GameWebMonetization([
    {
        paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii',
        weight: 60
    },
    {
        paymentPointer: '$ilp.uphold.com/ziW6E7iwKUkp',
        weight: 40
    }
]);
```

Las propiedades de `weight` controlan el porcentaje de probabilidad de que el complemento seleccione ese proveedor de pago. Por lo tanto, el valor total de `weight` cuando se suman todos juntos no deben exceder de 100.

Depende de usted cómo se distribuyen los pesos. Por ejemplo, es posible que desee dividir uniformemente los pesos (weights) entre todos los miembros del equipo del juego. ¿O quizás le das al desarrollador un peso del 70% y al artista un peso del 30%? Depende completamente de ti. El valor de `weight` pasado controla directamente la posibilidad de que esa billetera/wallet sea seleccionada cuando se inicia la API de monetización web.

Aquí hay una prueba completa de `main.js` para que veas esto en acción:

```javascript
import { GameWebMonetization } from './GameWebMonetization.js';

const gameWebMonetization = new GameWebMonetization([
    {
        paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii',
        weight: 60
    },
    {
        paymentPointer: '$ilp.uphold.com/ziW6E7iwKUkp',
        weight: 40
    }
]);

gameWebMonetization.on(GameWebMonetization.START, (event) => {
    console.log('[inside event start] - The state: ', event);
});

gameWebMonetization.start();
```

Si ejecuta esta prueba muchas veces, verá que el puntero de pago se cambia en la consola:

![multiples payment pointer 1](part4/1-multiple-payment-pointers1.png)
![multiples payment pointer 2](part4/2-multiple-payment-pointers2.png)

Si es difícil saber quién es el propietario de cada puntero de pago, opcionalmente podemos pasar la propiedad `pointerName` en la configuración de esta manera:

```javascript
const gameWebMonetization = new GameWebMonetization([
    {
        paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii',
        weight: 60,
        pointerName: "Bob"
    },
    {
        paymentPointer: '$ilp.uphold.com/ziW6E7iwKUkp',
        weight: 40,
        pointerName: "Alice"
    }
]);
```
Para recuperar el nombre simplemente accedemos a la propiedad `pointerName` que nos ofrece el plugin:

```javascript
console.log('Paying into the wallet of', gameWebMonetization.pointerName);
```

Si vamos al navegador y lo actualizamos, podemos ver que se muestra el nombre:

![Pointer name 1](part4/3-pointer-name1.png)

Y si actualiza varias veces, verá que el nombre se cambia en función de los valores de peso (weight):

![Pointer name 2](part4/4-pointer-name2.png)

Incluso si eres la única persona involucrada en la creación de tu juego, aún puedes usar este sistema para distribuir pagos a tus billeteras digitales con diferentes monedas establecidas en ellas. Solo recuerde que una vez que se haya seleccionado Payment Povider, permanecerá activo durante toda la sesión del juego.