<script setup>

import { ref } from 'vue'

//recibo el array del padre (app.vue)
const props = defineProps({
    days: Array
})

const listaIngredientes = ref([])

function generarLista (){

    const ingredientes = []

    for (let day of props.days){

        for (let comida of day.comidasAgregadas){
            ingredientes.push(comida.ingredientes)
        }

    }

    listaIngredientes.value = ingredientes

}



</script>

<template>

    <section class="df columna spacee centerY">

        <h2 class="w90">Mi lista de compras</h2>

        <div class="w90 df spaceb centerY">

            <div id="lugarLista" class="w50 fondoBlanco"></div>

            <div class="botones df columna spacee">

                <button @click="generarLista" class="ajusteBoton sinBorde fondoAzul blanco">Generar lista de compras</button>

                <button class="ajusteBoton sinBorde fondoRojo blanco">Descargar como PDF</button>

            </div>
        </div>

    </section>

</template>

<style scoped>

    .w90{
        width: 90%;
    }
    .w50{
        width: 50%;
    }

    #lugarLista{
        height: 15vh;
        border-radius: 15px;
        background-color: white;
    }

    .botones{
        width: 45%;
        height: 15vh;
    }

    button{
        font-size: 16px;
        padding: 7px 15px;
    }

</style>

