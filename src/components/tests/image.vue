<template>
  <img
    :src="src"
    :alt="alt"
  >
</template>

<script>
export default {
  name: 'Image',
  components: {},
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  },
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
