<script setup>

import { ref } from 'vue'
import draggable from 'vuedraggable'
import { defineProps, defineEmits } from "vue"

//recibo el array del padre (app.vue)
const props = defineProps({
    days: Array
})

const eliminadas = []

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

        <div v-for="day in days" class="textCenter dia"> 

            <h4>{{ day.name }}</h4>

            <draggable 
                :list="day.comidasAgregadas" 
                class="comidas df columna" 
                :group="{ name: 'recetas', pull: true, put: true}" 
                item-key="id">

                <template #item="{element}">

                    <div class="fondoBlanco cardcita">
                        <p>{{ element.titulo }}</p>
                    </div>

                </template>

                  <template #footer>
                    <p 
                    v-if="day.comidasAgregadas.length === 0" 
                    class="placeholder">
                    Arrastra aquí tus recetas
                    </p>
                </template>

            </draggable>

        </div>

        <draggable 
            :list="eliminadas" 
            item-key="id" 
            :group="{ name: 'recetas', pull: false, put: true }" id="eliminadas" 
            class="df centerX">

            <!-- Slot item requerido -->
            <template #item="{ element }"></template>

            <template #footer>

                <div class="df centerY w40 spacee">

                    <i class="fi fi-rr-circle-trash df centerY"></i>

                    <p class="placeholder">Arrastra aquí para eliminar</p>

                </div>

            </template>

        </draggable>
        

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
    .dia{
        height: 35vh;
    }
    #eliminadas{
        grid-column: 1 / span 5;

        background-color: rgba(255, 255, 255, 0.881);
        border-radius: 10px;
        padding: 5px;
    }
    #eliminadas i{
        font-size: 25px;
        color: #FA7459;
    }
    h4{
        padding: 5px;
    }
    button{
        font-size: 16px;
    }
    .comidas{
        height: 35vh;
        gap: 10px;
    }

    .cardcita{
        border-radius: 8px;
        padding: 10px;

    }
    .cardcita p{
        font-size: 13px;
    }

    .placeholder{
        font-size: 12px;
        color: gray;
    }

</style>

