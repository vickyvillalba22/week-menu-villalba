<script setup>

import { ref } from 'vue'
import draggable from 'vuedraggable'
import { defineProps, defineEmits } from "vue"

//recibo el array del padre (app.vue)
const props = defineProps({
    days: Array
})

const emit = defineEmits(['vaciar'])

const eliminadas = []

</script>

<template>

    <div class="menuSemanal df columna spacee centerX centerY">

    <div class="w90 df spaceb centerY centerX">

        <h2>Mi menú semanal</h2>

        <button @click="emit('vaciar')" class="ajusteBoton sinBorde fondoRojo blanco">Vaciar menú</button>

    </div>

    <div id="semana" class="w90">

        <div v-for="(day, dayIndex) in days" class="textCenter dia df columna"> 

            <h4 class="textCenter">{{ day.name }}</h4>

            <draggable 
                :list="day.comidasAgregadas" 
                class="comidas df columna" 
                :group="{ name: 'recetas', pull: true, put: true}" 
                item-key="id"
                >

                <template #item="{element, index}">

                    <div class="cardcita">
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
            class="df centerX w100">

            <!-- Slot item requerido -->
            <template #item="{ element }"></template>

            <template #footer>

                <div class="df centerY spacee w35 elementoEliminadas">

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

    .w90{
        width: 90%;
    }
    .w35{
        width: 35%;
    }

    #semana{
        display: grid;
        grid-template-columns: repeat(5, 18%);
        gap: 10px;
        padding: 10px;

        place-content: center;
    }
    .dia{
        height: 35vh;
        gap: 10px;
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
    button{
        font-size: 14px;
        padding: 6px;
        border-radius: 8px;
    }
    .comidas{
        height: 35vh;
        gap: 10px;
    }

    .cardcita{
        width: 100%;
        border-radius: 8px;
        padding: 10px;
        background-color: white;
    }
    .cardcita p{
        font-size: 13px;
    }

    .placeholder{
        font-size: 12px;
        color: gray;
    }

    @media screen and (max-width: 900px){
        #semana{
            display: grid;
            grid-template-columns: repeat(5, 18%);
            gap: 5px;
            padding: 10px;

            place-content: center;
        }
        h2{
            font-size: medium;
        }
        h4{
            font-size: 12px;
        }
        .placeholder{
            font-size: 10px;
        }
        button{
            font-size: 12px;
        }
        #semana{
            width: 100%;
        }
        .elementoEliminadas{
            width: 70%;
        }

        .cardcita p{
            font-size: 10px;
        }
    }

</style>

