<template>
  <el-input
    v-model="size"
    :disabled="tail === 'auto'"
    type="number"
    placeholder="请输入内容"
    class="update-margin-input"
  >
    <template #prepend>
      {{ chineseName }}
    </template>
    <template #append>
      <el-select
        v-model="tail"
        :popper-append-to-body="false"
        placeholder="单位"
      >
        <el-option
          label="px"
          value="px"
        />
        <el-option
          label="自适应"
          value="auto"
        />
      </el-select>
    </template>
  </el-input>
</template>

<script>
const ATTR_MAP = {
  'top': '上',
  'right': '右',
  'bottom': '下',
  'left': '左'
}
const ATTR_ORDER = Object.keys(ATTR_MAP)

export default {
  name: 'UpdateMergeInput',
  components: {},
  props: {
    attr: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    node() {
      return this.$store.state.node
    },
    size: {
      get() {
        const margin = this.node.attrs.style.margin
        if (!margin) {
          return 0
        }

        if (this.tail === 'auto') {
          return 'auto'
        }

        return parseInt(margin.split(' ')[ATTR_ORDER.indexOf(this.attr)])
      },
      set(val) {
        return this.$store.commit('UPDATE_MARGIN', {
          order: ATTR_ORDER.indexOf(this.attr),
          value: val ? `${val}${this.tail}` : `0${this.tail}`
        })
      }
    },
    tail: {
      get() {
        const margin = this.node.attrs.style.margin
        if (!margin) {
          return 'px'
        }

        const value = margin.split(' ')[ATTR_ORDER.indexOf(this.attr)]
        if (!value) {
          return 'px'
        }

        if (value !== 'auto') {
          return 'px'
        }

        return 'auto'
      },
      set(val) {
        return this.$store.commit('UPDATE_MARGIN', {
          order: ATTR_ORDER.indexOf(this.attr),
          value: val === 'auto' ? val : `${this.size === 'auto' ? 0 : this.size}${val}`
        })
      }
    },
    chineseName() {
      return ATTR_MAP[this.attr] + '边距'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.update-margin-input {
  .el-select .el-input {
    width: 120px;
  }

  .el-input-group__prepend {
    width: 89px;
  }

  .el-input-group__append {
    background-color: #fff;
  }

  .el-select__caret,
  .el-input__inner {
    cursor: pointer !important;
  }
}
</style>
