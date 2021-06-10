<template>
  <ul>
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'List',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log(this.$slots)
  },
  methods: {}
}
</script>

<style lang="scss">
</style>
