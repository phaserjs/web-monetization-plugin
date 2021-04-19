---
title: Web Monetization for Games
subtitle: Parte 1 - ¿Qué es Web Monetization?
date: 
author: Richard Davey
twitter: photonstorm
---

# ¿Qué es Web Monetization?

![Logo Web Monetization](../img/part1/logo-web-monetization.svg)

Web Monetization es una API  de JavaScript que permite a los creadores monetizar su contenido creando un flujo de pagos constantes.

### ¿Cómo funciona?
El usuario se registra a un proveedor como Coil, paga una cantidad fija al mes y gracias a una extensión que se instala en el navegador (o un navegador con el sistema ya integrado), el usuario puede apoyar el contenido que está disfrutando. No te preocupes los pagos se hacen automáticamente y solo basta con que inicialices el plugin, ya lo veremos más adelante.

### ¿Dónde va el dinero que envía el proveedor?

Para poder obtener los micropagos es necesario tener una cartera/wallet (puedes ver las que hay disponible en el siguiente enlace [aquí](https://webmonetization.org/#wallets:~:text=Web%20Monetization%20Wallets)).

Gracias a la cartera/wallet tu puedes generar un punto de pago único por medio de Interledger protocol que es el que nos permite tener un flujo constante de micropagos.

El usuario accede a tu sitio o juego, el plugin con tu payment pointer configurado detecta que tiene la extensión de Coil (o del proveedor) y que tiene saldo, y luego empieza a generar el micro pago al desarrollador, en este punto el desarrollador decide qué beneficios dar al usuario gracias a los micropagos y luego el dinero llegará a tu cartera/wallet automáticamente.

### ¿Qué beneficios dar al usuario?
Cada desarrollador puede decidir que beneficios dar al usuario, como por ejemplo puedes hacer que tu juego no tenga más publicidad o dar más vidas o algo que ayude al usuario en el juego.

Web Monetization no pretende reemplazar la forma que haces dinero puedes verlo como un añadido más, algo que si lo agregas puedes generar más ingresos a cambio de darle un beneficio al jugador, es un win to win.

Para irte familiarizando con los conceptos te invito que visites la página del proveedor Coil y la de Web Monetization
