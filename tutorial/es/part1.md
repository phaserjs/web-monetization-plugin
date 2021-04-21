---
title: Web Monetization for Games
subtitle: Parte 1 - ¿Qué es Web Monetization?
date: 
author: Richard Davey
twitter: photonstorm
---

# ¿Qué es Web Monetization?

![Logo Web Monetization](../img/part1/logo-web-monetization.svg)


En esencia, la monetización web es una JavaScript browser API que permite a los desarrolladores de juegos monetizar sus juegos mediante la creación de un flujo de pago constante. Mientras los jugadores juegan, los micropagos se envían a su billetera/wallet. También se propone como un estándar W3C. El objetivo es resolver un problema común:

"La capacidad de transferir dinero ha sido una omisión de la plataforma web desde hace mucho tiempo. Como resultado, la web sufre una avalancha de publicidad y modelos comerciales corruptos. La monetización web proporciona una forma abierta, nativa, eficiente y automática de compensar creadores.

Hasta hace poco, no había un protocolo abierto y neutral para transferir dinero. Interledger proporciona un método simple, independiente de la contabilidad y de la moneda para la transferencia de pequeñas cantidades de dinero. Esto abre la posibilidad de transmitir dinero, lo que hace posible la monetización web por primera vez."


### ¿Cómo funciona?

Los usuarios se registran con un proveedor de monetización web como [Coil](https://coil.com). Después de registrarse, pueden pagar una pequeña cantidad fija por mes y, gracias a la extensión del navegador Coil, o al usar un navegador que admita de forma nativa la monetización web, los usuarios apoyan automáticamente el contenido que disfrutan.

Esto sucede porque puede inicializar fácilmente el plugin de Game Web Monetization directamente desde sus juegos, lo que hace que el proceso sea completamente automático tanto para usted como para sus jugadores. Con el complemento en ejecución, los micropagos se transmiten directamente a su billetera/wallet, mientras los jugadores disfrutan de su juego. Puedes detectar si se está monetizando desde el código en el juego, permitiéndote ofrecer contenido extra o exclusivo a quienes te están apoyando.

### ¿Cómo se reciven los micropagos?

Para poder obtener los micropagos es necesario tener una billetera/wallet (puedes ver las que hay disponible en el siguiente enlace [aquí](https://webmonetization.org/#wallets:~:text=Web%20Monetization%20Wallets)).

Gracias a la billetera/wallet tu puedes generar un punto de pago único por medio de Interledger protocol que es el que nos permite tener un flujo constante de micropagos.

El usuario accede a tu juego, el plugin con tu payment pointer configurado detecta que tiene la extensión de Coil (o del proveedor) y que tiene saldo, y luego empieza a generar el micro pago al desarrollador, en este punto el desarrollador decide qué beneficios dar al usuario gracias a los micropagos y luego el dinero llegará a tu cartera/wallet automáticamente, todo sin molestar al usuario con ventanas de compra o formularios de tarjetas de crédito.

### ¿Qué beneficios dar al usuario?

Cada desarrollador puede decidir que beneficios dar al usuario, como por ejemplo puedes hacer que tu juego no tenga más publicidad o vídeos pre-roll. O bien, podrías darles una bonificación específica del juego, como potenciadores adicionales, personajes adicionales o niveles exclusivos. Depende completamente de ti.

Recomendamos encarecidamente que empieces a familiarizarte con los concepto principales leyendo la [página de Coil provider](https://coil.com/) y la página de [Web Monetization](https://webmonetization.org/).

Entonces, comencemos a implementar el plugin de Game Web Monetization en la Parte 2.
