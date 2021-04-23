---
title: Web Monetization for Games
subtitle: Parte 2 - Coil y Uphold
date: 23rd April 2021
author: Richard Davey
twitter: photonstorm
---

# Coil y Uphold

### Coil

Como hemos mencionado en el capítulo previo el usuario necesita un proveedor para que el pueda ingresar dinero y que este se reparta automáticamente por todas las páginas visitadas (quieres saber más sobre cómo se reparte el dinero: clica [aqí](https://help.coil.com/docs/general-info/intro-to-coil/index.html#how-is-coil-different-from-other-membership-services-like-patreon-and-flattr)). 

Actualmente el proveedor principal es Coil así que tendrás que registrarte en la página oficial de Coil y asignar tu payment pointer para poder probar que tus juegos están habilitados para la monetización. Repasaremos las partes claves del proceso. 

- Ve a la página oficial de Coil [aquí](https://coil.com/) y crea una cuenta clicando en **Sing up**

![Home Page](../img/part2/1-homepage.png)

- Selecciona:  _Monetize Content_ opción. Ahora tienes que seleccionar sign-up:

![Sign Up](../img/part2/2-signup_to_monetize.png)

- Rellena tus datos correctamente:

![Fill user data](../img/part2/3-fill_user_data.png)

- Ve a tu correo, encuentra el código de verificación e ingresa el código:

![Verify Code](../img/part2/4-verify_code.png)

Tu cuenta de Coil está lista para poderla usar. Lo que sigue ahora es crear una billetera/wallet dígital.

### Uphold

Ahora necesitamos crear nuestra billetera/wallet para recibir los pagos. Para este proceso nosotros usaremos el servicio Uphold. Hay otros servicios disponibles pero nosotros veremos como hacerlo con Uphold porque para nosotros el proceso a la hora de verificar un usuario es sencillo, además de que actualmente cuenta con muchas monedas disponibles (al menos en el momento que se escribió esta sección). Si ya tienes una billetera/wallet con tu payment pointer puedes omitir esta sección.

Es útil comprender la relación entre Coil y Uphold, o servicios similares. Coil se usa para _distribuir_ los micropagos y Uphold se usa para recibirlos. Uphold generará los payment pointers de pago necesarios para habilitar la monetización web de su juego.

![Uphold configuration](../img/part2/5-coil_uphold_configuration.png)

Selecciona Uphold y luego clica en donde dice [Get a payment pointer](https://help.coil.com/docs/monetize/wallets/uphold/index.html)

Coil nos mostrará un tutorial bastante bueno de como obtener ese payment pointer desde Uphold, que es lo más importante para poder monetizar tu juego.

A este punto y después de haber creado tu cuenta en Uphold ya deberías tener tu payment pointer. Solo queda ponerlo en la configuración de tu cuenta de Coil y clica en "Finish".

![PaymentPointer configuration in Coil](../img/part2/6-paymentpointer_config.png)

Una vez realizado eso ya nos redirige al home:

![Homepage done](../img/part2/7-homepage_done.png)

### Extensión de Coil

Es posible que a este punto ya hayas instalado la extensión de Coil, pero si no lo has hecho, es hora de instalar la extensión en el navegador para probar si la monetización funciona correctamente en nuestros juegos.

Accede a [https://coil.com](https://coil.com) y baja hasta encontrar la sección **The Coil Extension and Puma Browser**.

![Coil extensión](../img/part2/8-coil_extension.png)

La extensión está disponible actualmente para Chrome, Samsung Internet, Firefox, Microsoft Edge y Brave Browser. Elija la extensión para el navegador que está utilizando. Alternativamente, puede instalar el navegador Puma, pero para esta serie de tutoriales asumiremos que está usando una extensión.

Una vez instalada la extensión podemos probar si todo está funcionando. Debería poder ver el icono de la extensión en la barra de herramientas de su navegador:

![Extension in browser](../img/part2/8-extension_toolbar.png)

Deberás adquirir una membresía de Coil para poder realizar estas pruebas, una vez realizada la membresía puedes ir a la página [oficial de Phaser](https://phaser.io). Si haces click en el icono de la extensión de Coil podrás ver el siguiente mensaje si eres miembro:

![Extension Coil is playing](../img/part2/9-coil_is_playing.png)

Si no eres miembro probablemente veas esto: 

![Extension Coil is not playing](../img/part2/10-coil_is_not_playing.png)

Y como puedes observar a pesar de que no somos miembros nos aparece en la parte inferior de la extensión que el sitio es monetizable.

Y con todo esto ya tenemos todo preparado para empezar a probar, nos vemos en el siguiente capítulo.
