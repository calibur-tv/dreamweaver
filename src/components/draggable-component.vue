<template>
  <div class="draggable-component">
    <draggable
      class="dragArea list-group"
      :list="list1"
      :group="{ name: 'layout', pull: 'clone', put: false }"
      item-key="_uid"
    >
      <template #item="{ element }">
        <div class="list-group-item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import Draggable from '../externals/draggable/vuedraggable.js'
import { createElement } from '@/utils'

export default {
  name: 'DraggableComponent',
  components: {
    Draggable
  },
  props: {},
  data() {
    return {
      list1: [
        createElement('main'),
        createElement('footer'),
        createElement('section'),
        createElement('header'),
        createElement('aside')
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
</style>
