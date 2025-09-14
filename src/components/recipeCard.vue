<script setup lang="ts">

    import { ref } from 'vue'

    import MasInfo from './mas-info.vue'

    defineProps<{ 
      titulo: string; 
      imagen: string; 
      ingredientes?: string[] 
    }>()

</script>

<template>

  <div class="cardRecipe df columna spaceb">

    <img :src="imagen" alt="Imagen de receta" />
    <h3 class="w100">{{ titulo }}</h3>

    <div class="botones df spaceb w100 centerY centerX">
      <MasInfo />
    </div>

  </div>

</template>

<style scoped>

h3{
  font-size: 15px;
  font-weight: 500;
}

.cardRecipe {

  width: 30%;
  height: 35vh;

  border-radius: 10px;
  padding: 1rem;

  text-align: center;
  background: #fff;

}
.cardRecipe img {
  width: 100%;
  border-radius: 8px;
}
.cardRecipe h3{
  text-align: left;
}



</style>