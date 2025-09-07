<script setup>

import { ref } from 'vue'
import draggable from 'vuedraggable'

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
            name: "Miercoles",
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

function vaciarMenu (array){

    for(let day of array){
        day.comidasAgregadas.length = 0
    }

}

</script>

<template>

    <div class="menuSemanal df columna spacee centerY">

    <div class="w90 df spaceb centerY">

        <h2>Mi menú semanal</h2>

        <button @click="vaciarMenu(days)" class="ajusteBoton sinBorde fondoRojo blanco">Vaciar menú</button>

    </div>

    <div id="semana" class="w100">

        <div v-for="day in days" class="textCenter"> 

            <h4>{{ day.name }}</h4>

            <draggable :list="day.comidasAgregadas" class="comidas" group="recetas" item-key="id">

                <template #item="{element}">
                    <div class="fondoBlanco cardcita">
                        <p>{{ element.titulo }}</p>
                    </div>
                </template>

            </draggable>

        </div>

    </div>

    </div>

</template>

<style scoped>

    .menuSemanal{
        height: 55vh;
    }

    #semana{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        padding: 10px;
    }
    h4{
        padding: 5px;
    }
    button{
        font-size: 16px;
    }
    .comidas{
        height: 35vh;
    }

    .cardcita{
        border-radius: 8px;
        padding: 10px;
    }
    .cardcita p{
        font-size: 13px;
    }

</style>

