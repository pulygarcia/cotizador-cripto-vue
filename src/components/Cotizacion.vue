<script setup>
    defineProps({
        cotizacion:{
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="contenedor-resultado">
        <h2>Cotización</h2>

        <div class="resultado">
            <img :src="'https://cryptocompare.com' + cotizacion.IMAGEURL" alt="">

            <div>
                <p>Precio: <span>{{ cotizacion.PRICE }}</span></p>
                <p>Mayor alcance del día: <span>{{ cotizacion.HIGHDAY }}</span></p>
                <p>Menor alcance del día: <span>{{ cotizacion.LOWDAY }}</span></p>
                <p>Variación en 24 horas: <span>{{ cotizacion.CHANGEPCT24HOUR }}</span></p>
                <p>Ultima actualización: <span>{{ cotizacion.LASTUPDATE }}</span></p>
            </div>
        </div>
    </div>
</template>