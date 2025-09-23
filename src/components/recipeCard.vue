<script setup lang="ts">

    import { ref } from 'vue'

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

  <div class="card-inner df wrap" :class="{ flipped: mostrarInfo }">

  <!--card-front-->
  <div v-if="!mostrarInfo" class="card-front df columna spaceb">

    <img :src="receta.imagen" alt="Imagen de receta" class="objCover" />
    <h3 class="w100">{{ receta.titulo }}</h3>

    <div class="botones df spaceb w100 centerY centerX">
      <button @click.stop="toggleInfo" class="fitContent sinBorde fondoAzul blanco">Más info</button>
    </div>

  </div>

  <!--card-back-->
  <div v-else class="card-back df columna">
      <h3>{{ receta.titulo }}</h3>
      <ul class="sinItem">
          <li v-for="(ing, i) in receta.ingredientes || []" :key="i">
              {{ receta.ingredientes[i].nombre }} - {{ receta.ingredientes[i].medida }}
          </li>
      </ul>
      <button @click.stop="toggleInfo" class="fitContent sinBorde fondoAzul blanco">Volver</button>
  </div>

  </div>

</template>

<style scoped>

h3{
  font-size: 15px;
  font-weight: 500;
}

.card-inner{
  width: 30%;
}

.card-front, .card-back {

  width: 100%;
  height: 35vh;

  border-radius: 10px;
  padding: 1rem;

  background: #fff;

}
.card-front img {
  width: 100%;
  border-radius: 8px;
}
.card-front h3{
  text-align: left;
}

.card-back{
  gap: 10px;

  overflow: hidden;
  overflow-y: scroll;
}

.card-back h3{
  font-weight: 600;
}

button{
  padding: 5px 8px;
  border-radius: 5px;
}

@media screen and (max-width: 900px){

  .card-front, .card-back {

  width: 100%;
  height: 25vh;

  border-radius: 10px;
  padding: 1rem;

  background: #fff;

  }

  .card-front img{
    height: 12vh;
  }

  .card-inner{
    width: 45%;
  }

  h3{
    font-size: 12px;
    width: 100%;
    /*border: 2px solid red;*/
  }
  button{
    font-size: 10px;
  }
  li{
    font-size: 12px;
  }

}



</style>