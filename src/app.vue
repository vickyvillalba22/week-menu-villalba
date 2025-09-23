<script setup>

import Recipes from './recipes.vue'
import Week from './week.vue';
import Lista from './lista.vue'
import { ref } from 'vue';

//array de días
const days = ref([
        {
            name: "Lunes",
            comidasAgregadas: []
        },
                {
            name: "Martes",
            comidasAgregadas: []
        },
                {
            name: "Miércoles",
            comidasAgregadas: []
        },
                {
            name: "Jueves",
            comidasAgregadas: []
        },
                {
            name: "Viernes",
            comidasAgregadas: []
        },
    ])

const listaIngredientes = ref([])

function generarLista (){

    const ingredientes = []

    for (let day of days.value){

        for (let comida of day.comidasAgregadas){
            ingredientes.push(...comida.ingredientes)
        }

    }

    listaIngredientes.value = ingredientes
    //console.log(listaIngredientes.value);

}

function vaciarMenu (array){

    for(let day of array){
        day.comidasAgregadas.length = 0
    }

    generarLista()
    

}

function descargarLista(){

    const doc = new jsPDF()

    doc.text("Lista de ingredientes", 10, 20)

    doc.save("ingredientes.pdf")

}



</script>

<template>

    <div class="padre df columna centerX centerY spacee w100">

    <div class="df spacee hijo">

      <Recipes id="recipes" class="mitad df centerX centerY glass" />

      <div class="df columna spaceb centerY mitad">

        <Week :days="days" class="glass w100" @vaciar="vaciarMenu(days)" />
        <Lista :ingredientes="listaIngredientes"
        @generarLista="generarLista"
        @descargarLista = "descargarLista" id="list" class="glass w100" />

      </div>

    </div>

</div>

</template>

<style scoped>

    .padre{
        height: 100vh;
    }

    .hijo{
        width: 90%;
    }

    .mitad{
        width: 45%;
        height: 90vh;
    }

    #list{
        height: 30vh;
    }

</style>