<template>
  <el-input
    v-model="size"
    :disabled="size === 'auto'"
    placeholder="请输入内容"
    class="update-size-input"
  >
    <template slot="prepend">
      设置{{ chineseName }}
    </template>
    <el-select
      slot="append"
      v-model="tail"
      placeholder="单位"
    >
      <el-option
        label="自适应"
        value=""
      />
      <el-option
        label="px"
        value="px"
      />
      <el-option
        v-if="attr === 'height'"
        label="vh"
        value="vh"
      />
      <el-option
        v-if="attr === 'width'"
        label="vw"
        value="vw"
      />
    </el-select>
  </el-input>
</template>

<script>
export default {
  name: 'UpdateSizeInput',
  props: {
    attr: {
      type: String,
      required: true
    }
  },
  computed: {
    node() {
      return this.$store.state.node
    },
    size: {
      get() {
        const size = this.node.attrs.style[this.attr]
        if (!size) {
          return 'auto'
        }

        if (size === this.tail) {
          return 0
        }

        return parseInt(size)
      },
      set(val) {
        return this.$store.commit('UPDATE_SIZE', {
          attr: this.attr,
          size: val ? `${val}${this.tail}` : `0${this.tail}`
        })
      }
    },
    tail: {
      get() {
        const size = this.node.attrs.style[this.attr]
        if (size) {
          return size.replace(/\d/g, '')
        }

        return ''
      },
      set(val) {
        if (!val) {
          return this.$store.commit('UPDATE_SIZE', {
            attr: this.attr,
            size: val
          })
        }

        const size = this.size === 'auto' ? 0 : this.size

        return this.$store.commit('UPDATE_SIZE', {
          attr: this.attr,
          size: `${size}${val}`
        })
      }
    },
    chineseName() {
      return {
        'width': '宽度',
        'height': '高度'
      }[this.attr]
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.update-size-input {
  .el-select .el-input {
    width: 120px;
  }

  .el-input-group__append {
    background-color: #fff;
  }
}
</style>
