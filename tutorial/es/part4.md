---
title: Web Monetization for Games
subtitle: Part 4 - Divide las ganancias
date: 23rd April 2021
author: Richard Davey
twitter: photonstorm
---

Con el plugin Game Web Monetization, es posible dividir los ingresos que recibe su juego entre varios Payment Pointers. La API de monetización web no puede hacer esto directamente, por lo que utiliza un proceso conocido como distribución probabilística de ingresos. Puede [leer más] (https://webmonetization.org/docs/probabilistic-rev-sharing) sobre este concepto en el sitio web de monetización web.

Como ha visto en tutoriales anteriores, debe pasar un objeto de configuración al complemento que contiene un `paymentPointer`. Esta es la dirección de la billetera que recibirá los pagos: