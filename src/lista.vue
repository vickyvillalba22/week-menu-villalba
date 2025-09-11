<script setup>



</script>

<template>

    <section class="df columna spacee centerY">

        <h2 class="w90">Mi lista de compras</h2>

        <div class="w90 df spaceb centerY">

            <div id="lugarLista" class="w50 fondoBlanco"></div>

            <div class="w45 h100 df columna spacee">
                <button class="ajusteBoton sinBorde fondoAzul blanco">Generar lista de compras</button>
                <button class="ajusteBoton sinBorde fondoRojo blanco">Descargar como PDF</button>
            </div>
        </div>

    </section>

</template>

<style scoped>

    #lugarLista{
        height: 15vh;
        border-radius: 15px;
    }
    button{
        font-size: 16px;
        padding: 7px 15px;
    }

</style>

