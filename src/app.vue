<script>

import Recipes from './recipes.vue'

export default {
  name: 'App',
  components: {
    Recipes
  }
}

</script>

<template>

    <div class="df columna centerX centerY vh100 spacee w100">

    <div class="w90 df spacee">

      <Recipes id="recipes" class="w45 vh90 df centerX centerY" />

      <div class="df columna spaceb w45 centerY vh90">
        <section id="week" class="fondoGris w100 vh40"></section>
        <section id="list" class="fondoGris w100 vh40"></section>
      </div>

    </div>

</div>

</template>