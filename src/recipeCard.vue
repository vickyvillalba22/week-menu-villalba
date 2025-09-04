<script setup lang="ts">

    import { ref } from 'vue'

    defineProps(['titulo', 'imagen', 'descripcion'])

</script>

<template>

  <div class="cardRecipe">
    <img :src="imagen" alt="Imagen de receta" />
    <h3>{{ titulo }}</h3>
    <p>{{ descripcion }}</p>
    <button>Mas info</button>
    <button>Agregar</button>
  </div>

</template>

<style scoped>

.cardRecipe {

    width: 30%;
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    background: #fff;

}
.cardRecipe img {
  width: 100%;
  border-radius: 8px;
}

</style>