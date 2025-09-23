<script setup lang="ts">

    import { ref } from 'vue'

    import MasInfo from './mas-info.vue'
    import { type Receta } from '../types/receta'

    defineProps<{ 
      receta: Receta
    }>()

    //creo una var reactiva para el estado de la card
    const mostrarInfo = ref(false) 

    function toggleInfo(){

      //if(e?.stopPropagation) e.stopPropagation()

      //cambio el estado 
      mostrarInfo.value = !mostrarInfo.value
    }

</script>

<template>

  <div class="card-inner" :class="{ flipped: mostrarInfo }">

  <!--card-front-->
  <div v-if="!mostrarInfo" class="card-front df columna spaceb">

    <img :src="receta.imagen" alt="Imagen de receta" />
    <h3 class="w100">{{ receta.titulo }}</h3>

    <div class="botones df spaceb w100 centerY centerX">
      <button @click.stop="toggleInfo">Más info</button>
    </div>

  </div>

  <!--card-back-->
  <div v-else class="card-back">
      <h3>{{ receta.titulo }}</h3>
      <ul>
          <li v-for="(ing, i) in receta.ingredientes || []" :key="i">
              {{ receta.ingredientes[i].nombre }} - {{ receta.ingredientes[i].medida }}
          </li>
      </ul>
      <button @click.stop="toggleInfo">Volver</button>
  </div>

  </div>

</template>

<style scoped>

h3{
  font-size: 15px;
  font-weight: 500;
}

.card-front {

  width: 30%;
  height: 38vh;

  border-radius: 10px;
  padding: 1rem;

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