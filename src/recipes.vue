<script setup lang="ts">

  import { ref, onMounted } from 'vue'

  import RecipeCard from './components/recipeCard.vue'
  import draggable from 'vuedraggable'

  import { type Receta, type Ingrediente } from './types/receta'

  let appTitle = "Recetas ideales para cada día"

  //armo el lugar donde vendrá el array de categorias: reactivo y con tipo. y defino su valor inicial: array vacio
  const categorias = ref<string[]>([])
  interface Categoria { strCategory: string }

  //array de recetas procesadas
  const recetas = ref<Receta[]>([])

  //tipo de lo que viene de la api
  type ApiReceta = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    [key: string]: string | null; // para cubrir strIngredientN, strMeasureN
  };

  //funcion que procesa los ingredientes de cada receta
  function extraerIngredientes (detalle: ApiReceta): Ingrediente[] {

    //array donde se insertarán los ingredientes de tipo Ingrediente
    const ingredientes: Ingrediente[] = []

    //recorro los ingredientes, los junto con sus medidas y los pusheo al array
    for(let i=1; i<21; i++){
      let nombre = detalle[`strIngredient${i}`]
      let medida = detalle[`strMeasure${i}`]

      if (nombre && nombre !== ""){
        ingredientes.push({
          nombre: nombre,
          medida: medida
        })
      }
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
        data.meals.map(async (meal: ApiReceta)=>{
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
      //console.log(recetas.value);
      
      

    } catch (error) {
      console.log(error); 
    }
  }

</script>

<template> 

  <div class="recipes"> <!--este es el componente recipes-->

    <div id="cont1" class="df columna">
    <!--titulo princi dinamico-->
    <h1 v-html="appTitle" class="w100"></h1>

    <!--buscador-->
    <div id="buscador" class="df spaceb w100">
      <input type="text" name="" class="barra sinBorde bordeRedondo">
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
      <draggable :list="recetas" item-key="id" id="meals" class="df wrap w100" :group="{ name: 'recetas', pull: 'clone', put: false}
      ">

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
    width: 90%;
    height: 80vh;
  }

  #categorias{
    gap: 10px;
  }

  #buscador{
    height: 30px;
  }

  .barra{
    width: 85%;
  }

  .fondoBlanco{
    background-color: white;
  }

  #meals{
    gap: 15px;
    overflow: hidden;
    overflow: auto;
    scroll-behavior: smooth;
    height: 50vh;
  }

</style>
