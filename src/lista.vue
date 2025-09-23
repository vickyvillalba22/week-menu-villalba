<script setup>

import { ref } from 'vue'
import { defineProps, defineEmits } from "vue"

//recibo el array del padre (app.vue)
const props = defineProps({
    ingredientes: Array
})

const emit = defineEmits(['generarLista', 'descargarLista'])

</script>

<template>

    <section class="df columna spacee centerY">

        <h2 class="w90">Mi lista de compras</h2>

        <div class="w90 df spaceb centerY">

            <div id="lugarLista" class="w50 fondoBlanco">
                <ul v-if="props.ingredientes.length > 0" class="sinItem">
                    <li v-for="(ingrediente, i) in props.ingredientes" :key="i">
                        {{ ingrediente.nombre }} – {{ ingrediente.medida }}
                    </li>
                </ul>
                <p v-else>Aún no hay ingredientes</p>
            </div>

            <div class="botones df columna spacee">

                <button @click="emit('generarLista')" class="ajusteBoton sinBorde fondoAzul blanco">Generar lista de compras</button>

                <button 
                @click="emit('descargarLista')"
                class="ajusteBoton sinBorde fondoRojo blanco">Descargar como PDF</button>

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

        overflow: hidden;
        overflow-y: scroll;

        padding: 15px;
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

