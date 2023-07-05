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
