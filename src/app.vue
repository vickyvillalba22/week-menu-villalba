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



</script>

<template>

    <div class="padre df columna centerX centerY spacee w100">

    <div class="df spacee hijo">

      <Recipes id="recipes" class="mitad df centerX centerY glass" />

      <div class="df columna spaceb centerY mitad">

        <Week :days="days" class="glass w100" />
        <Lista :days="days" id="list" class="glass w100" />

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