<script setup lang="ts">

  import { ref, onMounted } from 'vue'

  import RecipeCard from './recipeCard.vue'

  let appTitle = "Recetas ideales para cada día"

  //base de datos de ejemplo
  /*const recetas = [
  {
    id: 1,
    titulo: "Pizza Margherita",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion: "Clásica pizza italiana con tomate, mozzarella y albahaca."
  },
  {
    id: 2,
    titulo: "Tarta de Manzana",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion: "Tarta casera de manzanas frescas con canela y masa crujiente."
  },
  {
    id: 3,
    titulo: "Ensalada César",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion: "Lechuga fresca, crutones y aderezo César casero."
  },
  {
    id: 4,
    titulo: "Spaghetti Boloñesa",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion: "Pasta al dente con salsa boloñesa rica en carne y tomate."
  },
  {
    id: 5,
    titulo: "Sopa de Calabaza",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion: "Sopa cremosa de calabaza con un toque de nuez moscada."
  },
  {
    id: 6,
    titulo: "Brownie de Chocolate",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion: "Brownie húmedo y chocolatoso, perfecto para postre."
  }
  ]*/

  //armo el lugar donde vendrá el array de categorias: reactivo y con tipo. y defino su valor inicial: array vacio
  const categorias = ref<string[]>([])
  interface Categoria { strCategory: string }

  //armo el array donde vendrán las recetas de cada categoria, vacio para que cuando se haga el fetch, se le asigne el resultado
  const recetas = ref<any[]>([])
  interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  }

  //traigo los datos onMounted
  onMounted(async ()=>{

    try {

      const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      const data = await res.json()

      //extraer el nombre de cada categoria
      categorias.value = data.meals.map((cat: Categoria) => cat.strCategory)
      
    } catch (error) {

      console.log(error);
      
    }

  })

  //funcion fetch para mostrar recetas luego de tocar una de las categorías
  async function mostrarRecetas(categoria: string){
    try {

      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
      const data = await res.json()

      //le actualizo el contenido a recetas que ya está declarado arriba
      recetas.value = data.meals.map((meal: Meal) => ({
          id: meal.idMeal,
          titulo: meal.strMeal,
          imagen: meal.strMealThumb,
          descripcion: "Descripción pendiente"
      }))

    } catch (error) {
      console.log(error); 
    }
  }

</script>

<template> 

  <div class="w90 vh90"> <!--este es el componente recipes-->

    <div id="cont1" class="w90 df columna">
    <!--titulo princi dinamico-->
    <h1 v-html="appTitle" class="w100"></h1>

    <!--buscador-->
    <div id="buscador" class="df spaceb w100">
      <input type="text" name="" id="buscador" class="w80 sinBorde bordeRedondo">
      <button id="buscar" class="ajusteBoton sinBorde fondoTransparente"><i class="fi fi-rr-search"></i></button>
      <button id="filtrar" class="fondoRojo sinBorde ajusteBoton blanco"><i class="fi fi-rr-filter"></i></button>
    </div>

    <!--categorias-->
    <div id="categorias" class="w100 df wrap">

      <button @click="mostrarRecetas(cat)" v-for="cat in categorias" :key="cat" class="ajusteBoton sinBorde fondoBlanco">
        {{ cat }}
      </button>

    </div>

    <!--recetas-->
    <div id="meals" class="df wrap vh50 w100">

      <RecipeCard
        v-for="receta in recetas"
        :key="receta.id"
        :titulo="receta.titulo"
        :imagen="receta.imagen"
      />

    </div>

    </div>

  </div>

  
</template>

<style scoped>

  #cont1{
    gap: 20px;
    height: 80vh;
  }

  #categorias{
    gap: 10px;
  }

  #buscador{
    height: 30px;
  }

  #meals{
    gap: 15px;
    overflow: hidden;
    overflow: auto;
    scroll-behavior: smooth;
  }

</style>
