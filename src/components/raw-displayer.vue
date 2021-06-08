<template>
  <pre>{{ valueString }}</pre>
</template>

<script>
export default {
  name: "RawDisplayer",
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  computed: {
    valueString() {
      return JSON.stringify(this.value, null, 2);
    }
  }
};
</script>

<style scoped>
pre {
  text-align: start;
}
</style>
