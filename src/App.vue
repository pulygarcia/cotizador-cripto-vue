<script setup>
  import {reactive} from 'vue';
  import useCripto from './composables/useCripto'

  import Alerta from './components/Alerta.vue'
  import Moneda from './components/Moneda.vue'
  import Cotizacion from './components/Cotizacion.vue'

  const {monedas, url, criptos, cotizacion, obtenerCotizacion, loading, error, mostrarResultado} = useCripto();

  
  const cotizar = reactive({
    moneda: '',
    criptomoneda: ''
  })

  const cotizarCripto = () => {
    if(Object.values(cotizar).includes('')){
      error.value = 'Completa los campos';
      setTimeout(() => {
        error.value = '';
      }, 3000);

      return;
    }

    obtenerCotizacion(cotizar);
  }

  mostrarResultado;
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizá tus <span>criptomonedas</span></h1>

    <div class="iconos">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-coin-bitcoin" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff9300" fill="none"  stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M9 8h4.09c1.055 0 1.91 .895 1.91 2s-.855 2 -1.91 2c1.055 0 1.91 .895 1.91 2s-.855 2 -1.91 2h-4.09" />
        <path d="M10 12h4" />
        <path d="M10 7v10v-9" />
        <path d="M13 7v1" />
        <path d="M13 16v1" />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-currency-ethereum" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6 12l6 -9l6 9l-6 9z" />
      <path d="M6 12l6 -3l6 3l-6 2z" />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-binance" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffbf00" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6 8l2 2l4 -4l4 4l2 -2l-6 -6z" />
      <path d="M6 16l2 -2l4 4l3.5 -3.5l2 2l-5.5 5.5z" />
      <path d="M20 10l2 2l-2 2l-2 -2z" />
      <path d="M4 10l2 2l-2 2l-2 -2z" />
      <path d="M12 10l2 2l-2 2l-2 -2z" />
      </svg>
    </div>

    <div class="contenido">
      <form class="formulario"
        @submit.prevent="cotizarCripto"
      >
        <Alerta v-if="error">
          {{ error }}
        </Alerta>

        <div class="campo">
          <label for="moneda">Moneda</label>
          <select id="moneda"
            v-model="cotizar.moneda"
          >
            <option value="" disabled selected>--Seleccionar moneda--</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">{{ moneda.texto }}</option>
          </select>
        </div>
        <div class="campo">
          <label for="cripto">Criptomoneda</label>
          <select id="cripto"
            v-model="cotizar.criptomoneda"
          >
            <option value="" disabled selected>--Seleccionar criptomoneda--</option>
            <option v-for="cripto in criptos" :value="cripto.CoinInfo.Name">{{ cripto.CoinInfo.FullName }}</option>
          </select>
        </div>

        <input type="submit" value="Cotizar">

        <Moneda v-if="loading"/>
        
      </form>
      

      <Cotizacion 
        v-if="mostrarResultado"
        :cotizacion="cotizacion"
      />

    </div>
  </div>
</template>
