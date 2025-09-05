<script>

import Recipes from './recipes.vue'
import Week from './week.vue';
import Lista from './lista.vue'

export default {
  name: 'App',
  components: {
    Recipes,
    Week,
    Lista
  }
}

</script>

<template>

    <div class="df columna centerX centerY vh100 spacee w100">

    <div class="w90 df spacee">

      <Recipes id="recipes" class="w45 vh90 df centerX centerY glass" />

      <div class="df columna spaceb w45 centerY vh90">

        <Week class="glass w100" />
        <Lista id="list" class="glass w100 vh30" />

      </div>

    </div>

</div>

</template>