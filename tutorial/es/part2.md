---
title: Web Monetization for Games
subtitle: Parte 2 - Coil y Uphold
date: 
author: Richard Davey
twitter: photonstorm
---

# Coil y Uphold

### Coil

Como hemos mencionado en el capítulo previo el usuario necesita un proveedor para que el pueda ingresar dinero y que este se reparta automáticamente por todas las páginas visitadas (quieres saber más sobre cómo se reparte el dinero: clica [aqí](https://help.coil.com/docs/general-info/intro-to-coil/index.html#how-is-coil-different-from-other-membership-services-like-patreon-and-flattr))j. Actualmente como proveedor podremos usar a Coil así que tendrás que registrarte en la página oficial y asignar tu payment pointer para poder probar que todo esté funcionando correctamente.

- Ve a la página oficial de Coil [aquí](https://coil.com/) y crea una cuenta clicando en **Sing up**

![Home Page](../img/part2/1-homepage.png)

- Selecciona: Monetize Content (Sign up to monetize)

![Sign Up](../img/part2/2-signup_to_monetize.png)

- Rellena tus datos correctamente

![Fill user data](../img/part2/3-fill_user_data.png)

- Ve a tu correo e ingresa el código de verificación

![Verify Code](../img/part2/4-verify_code.png)

### Uphold

Una vez ingresado el código ahora necesitamos crear nuestra cartera/wallet para recibir los pagos, la elección acá es tuya pero nos resultó más sencillo usar Uphold y la validación del usuario es más fácil y rápida, además que tiene muchas monedas disponibles, así que ahora hay que crear una cuenta en uphold pero antes recuerda lo siguiente: Coil es usado para distribuir el dinero que ingrese el usuario pero como desarrollador te interesa saber que todo esté funcionando así que haremos pruebas de monetización pero lo más importante como desarrollador es generar tu cartera y obtener el payment pointer, así que con Uphold ya sería suficiente.

![Uphold configuration](../img/part2/5-coil_uphold_configuration.png)

Selecciona Uphold y luego clica en donde dice [Get a payment pointer](https://help.coil.com/docs/monetize/wallets/uphold/index.html) Coil nos mostrará un tutorial bastante bueno de como obtener ese payment pointer que es lo más importante para poder monetizar tu contenido ya que gracias a ese payment pointer podrás recibir el dinero.

A este punto y después de haber creado tu cuenta en Uphold ya deberías tener tu payment pointer y solo queda ponerlo en la configuración de tu cuenta de Coil y clica en: Finish.

![PaymentPointer configuration in Coil](../img/part2/6-paymentpointer_config.png)

Una vez realizado eso ya nos redirige al home.

![Homepage done](../img/part2/7-homepage_done.png)

### Extensión de Coil

Llegó la hora de instalar la extensión de Coil para que podamos hacer las pruebas correctamente.

Clica en donde dice Home o accede a [https://coil.com](https://coil.com) y baja hasta encontrar **Install the Coil Extension**  or **The Puma Browser** app.

![Coil extensión](../img/part2/8-coil_extension.png)

Una vez instalada la extensión podemos probar si todo está funcionando.
Podrás ver la extensión en tu barra de extensiones de tu navegador: 

![Extension in browser](../img/part2/8-extension_toolbar.png)

Es probable que necesites convertirte en miembro y pagar 5 dólares la primera vez para realizar estas pruebas.

A este punto si estás en la página oficial de phaser: (https://phaser.io) y clicas el icono de la extensión de Coil podrás ver lo siguiente.

Si eres miembro:

![Extension Coil is playing](../img/part2/9-coil_is_playing.png)

Si no eres miembro probablemente veas esto: 

![Extension Coil is not playing](../img/part2/10-coil_is_not_playing.png)

Y como puedes observar a pesar de que no somos miembros nos aparece en la parte inferior de la extensión que el sitio es monetizable.

Y con todo esto ya tenemos todo preparado para empezar a probar, nos vemos en el siguiente capítulo.
