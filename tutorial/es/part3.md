---
title: Web Monetization for Games
subtitle: Parte 3 - Como usar el Plugin
date: 23rd April 2021
author: Richard Davey
twitter: photonstorm
---

Vamos a empezar a usar el plugin Game Web Monetization y a ver qué funciones están disponibles. 

Antes de que empecemos deberías estar registrado con Coil y con un proveedor de billetera/wallet digital como Uphold. Si aún no lo has hecho por favor regresa a la [Parte 2](part2) y hazla, ya que todo lo que sigue desde este punto se basa en esa parte. 

Logueate en el sitio oficial de [Coil](https://coil.com) y luego clica en **Settings** y busca **Payouts** y ahí verás tu Payment Pointer.

![PaymentPointer](part3/1-paymentpointer.png)

## Descargando el plugin

Descarga o consulta el repositorio [Game Web Monetization GitHub](https://github.com/photonstorm/gamewebmonetization). Si está familiarizado con el uso de git, puede realizar la descarga a través de http:

```
https://github.com/photonstorm/gamewebmonetization.git
```

O ssh:

```
git@github.com:photonstorm/gamewebmonetization.git
```

Si l prefieres puedes [descargar un archivo zip](https://github.com/photonstorm/gamewebmonetization/archive/refs/heads/main.zip) de todo el repositorio.

Una vez que los archivos estén en su computadora/ordenador, encontrará el plugin en la carpeta `plugin/dist/`, se llama `GameWebMonetization.js`.

## Creando una página de pruebas

Para comprobar que todo funciona, crearemos una página de prueba sencilla. Abra su editor favorito (para este tutorial usaremos VS Code), cree una nueva carpeta y dentro de ella guarde los archivos vacíos `index.html` y `main.js`.

![Base files](part3/2-basefiles.png)

Vamos a index.html y creamos su estructura básica llamando a main.js y definiéndolo como módulo, pega lo siguiente en tu index: 

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

copia el plugin desde `plugin/dist/GameWebMonetization.js` - pegue este archivo junto con el index y el main:

![Base](part3/3-basefileswithplutin.png)

Esta versión del plugin se expone como un ESM (Módulo ES), por lo que podemos cargarlo directamente en `main.js`. Para este tutorial usaremos importaciones y JavaScript moderno. Sin embargo, también puede encontrar las versiones ES5 y TypeScript del complemento en el repositorio de GitHub, en caso de que las necesite. Sin embargo, para el resto de este tutorial, asumiremos que está utilizando el ESM.

Editemos `main.js` para importar nuestro complemento:

```javascript
import { GameWebMonetization } from './GameWebMonetization.js';
```

Con el módulo importado podemos instanciar el complemento. El constructor requiere un objeto de configuración que contenga un `paymentPointer`. Por eso es importante que ya haya obtenido uno de su servicio de billetera.

Agregue lo siguiente a `main.js` y recuerde reemplazar el valor de `paymentPointer` a continuación por el suyo:

```javascript
const gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});

```

Lo que hemos hecho es importar el módulo, crear una instancia del complemento y asignarle un puntero de pago. Ahora, solo tenemos que empezar.

Abra `index.html` en un navegador. Para este tutorial usamos [Visual Studio Code](https://code.visualstudio.com/) con la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), pero puede usar cualquier método, siempre y cuando el archivo se sirva a su navegador (por un servidor web) y no solo se abra directamente.

Una vez abierto, seguirá apareciendo que el sitio no se puede monetizar. Esto se debe a que hemos preparado el plugin pero no hemos iniciado la monetización:

![no monetizable coil plugin](part3/4-nomonetizable.png)

Volvamos a nuestro **main.js** y ahora iniciamos la monetización con el método **start()**:

```javascript
import { GameWebMonetization } from './GameWebMonetization.js';
 
const gameWebMonetization = new GameWebMonetization({
    paymentPointer: '$ilp.uphold.com/zdXzL8aWJ4ii'
});
 
gameWebMonetization.start();
```

Ahora si volvemos a la web y actualizamos veremos que nuestro sitio empieza a monetizar: 

![is monetizable](part3/5-ismonetizable.png)

**Felicidades**. Esta página ahora está transmitiendo pequeñas cantidades de dinero a su billetera digital a través del protocolo Interledger. Si algo salió mal, recuerde verificar:

1. Que tiene una cuenta de Coil con una suscripción.
2. Que ha verificado completamente su servicio Uphold (u otra billetera)
3. Que la URL del Payment Pointer se haya cambiado en el código por la suya.
4. Que está usando un servidor para abrir la página de prueba, no abriéndola directamente en un navegador.
