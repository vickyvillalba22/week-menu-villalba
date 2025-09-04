<script setup lang="ts">

    import { ref } from 'vue'

    import MasInfo from './components/mas-info.vue'

    defineProps<{
      titulo: string
      imagen: string
    }>()

</script>

<template>

  <div class="cardRecipe">
    <img :src="imagen" alt="Imagen de receta" />
    <h3>{{ titulo }}</h3>

    <MasInfo />
    <button>Agregar</button>
  </div>

</template>

<style scoped>

h3{
  font-size: 15px;
  font-weight: 300;
}

.cardRecipe {

    width: 30%;
    height: 30vh;
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