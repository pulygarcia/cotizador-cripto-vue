import {ref, onMounted, computed} from 'vue';

export default function useCripto() {

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'ARG', texto: 'Peso Argentino'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])

    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD';

    const criptos = ref([]);

    onMounted(() => {
        fetch(url)
          .then(respuesta => respuesta.json())
          .then(({Data}) => {
            criptos.value = Data;
          })
    })

    const cotizacion = ref({});
    const loading = ref(false);
    const error = ref('');

    const obtenerCotizacion = async(cotizar) => {
        const {moneda, criptomoneda} = cotizar;
    
        loading.value = true;
        await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`)
                .then(resultado => resultado.json())
                .then(datos => {
                  cotizacion.value = datos.DISPLAY[criptomoneda][moneda];
                })
        loading.value = false;
    }

    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0;
    })



    return{
        monedas,
        url,
        criptos,
        cotizacion,
        loading,
        error,
        obtenerCotizacion,
        mostrarResultado
    }
}