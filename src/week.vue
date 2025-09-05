<script setup>

    const days = [
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
    ]

</script>

<template>

    <div class="menuSemanal df columna spacee centerY">

    <div class="w90 df spaceb centerY">
        <h2>Mi menú semanal</h2>
        <button class="ajusteBoton sinBorde fondoRojo blanco">Vaciar menú</button>
    </div>

    <div id="semana" class="w100">

        <div 
            v-for="day in days"
            class="textCenter"
        > 

        <h4>
        {{ day.name }} 
        </h4>

        <div class="comidas"></div>
    
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

</style>

