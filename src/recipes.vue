<script setup lang="ts">

  import { ref, onMounted } from 'vue'

  import RecipeCard from './components/recipeCard.vue'
  import draggable from 'vuedraggable'

  let appTitle = "Recetas ideales para cada día"

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

  //funcion que recibe una meal y devuelve los ingredientes en un array de strings. uso any porque TheMealDB tiene 20 campos dinámicos.
  function extraerIngredientes (meal: any): string[]{

    const ingredientes: string[] =[]

    for(let i=1; i<=3; i++){
      let ingrediente = meal[`strIngredient${i}`];
      let cantidad = meal[`strMeasure${i}`];
      ingredientes.push(`${cantidad} ${ingrediente}`)
    }

    return ingredientes
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

      //armo un array de promesas con los detalles de cada receta
      const recetasCompletas = await Promise.all(
        data.meals.map(async (meal: Meal)=>{
          const detalleData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
          const detalleRes = await detalleData.json()
          const detalle = detalleRes.meals[0]

          return {
            id: meal.idMeal,
            titulo: meal.strMeal,
            imagen: meal.strMealThumb,
            descripcion: "Descripción pendiente",
            ingredientes: extraerIngredientes(detalle)
          };

        })
      );

      recetas.value = recetasCompletas
      console.log(recetas);
      

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
      <draggable :list="recetas" item-key="id" id="meals" class="df wrap vh50 w100" :group="{ name: 'recetas', pull: 'clone', put: false}">

        <template #item="{ element }">
          <RecipeCard
            :titulo="element.titulo"
            :imagen="element.imagen"
            :ingredientes="element.ingredientes"
          />
        </template>

      </draggable>

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
