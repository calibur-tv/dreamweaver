<template>
  <el-input
    v-model="size"
    placeholder="请输入内容"
    class="update-rect-input"
  >
    <template #prepend>
      {{ chineseName }}
    </template>
    <template #append>
      <el-select
        v-model="tail"
        placeholder="单位"
      >
        <el-option
          label="px"
          value="px"
        />
        <el-option
          label="百分比"
          value="%"
        />
      </el-select>
    </template>
  </el-input>
</template>

<script>
const POS_ENUM = ['top', 'left']
const TRANSFORM_ENUM = ['translate-x', 'translate-y']

export default {
  name: 'UpdateRectInput',
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
        const { style } = this.node.attrs
        let value = '0'
        if (POS_ENUM.includes(this.attr)) {
          value = style[this.attr] || '0'
        } else if (style.transform) {
          // translate(10px, 10px)
          value = style.transform
              .replace('translate(', '')
              .replace(')', '')
              .split(',')[TRANSFORM_ENUM.indexOf(this.attr)]
        }

        return value
            .replace('px', '')
            .replace('%', '')
      },
      set(val) {
        return this.$store.commit('UPDATE_RECT', {
          attr: POS_ENUM.includes(this.attr) ? this.attr : 'translate',
          order: TRANSFORM_ENUM.includes(this.attr) ? /-x/.test(this.attr) ? 0 : 1 : -1,
          value: val ? `${val}${this.tail}` : `0${this.tail}`
        })
      }
    },
    tail: {
      get() {
        const { style } = this.node.attrs
        let value = 'px'
        if (POS_ENUM.includes(this.attr)) {
          value = style[this.attr] || 'px'
        } else if (style.transform) {
          // translate(10px, 10px)
          value = style.transform
              .replace('translate(', '')
              .replace(')', '')
              .split(',')[TRANSFORM_ENUM.indexOf(this.attr)]
        }

        return value.replace(/\d/g, '').replace('-', '')
      },
      set(val) {
        return this.$store.commit('UPDATE_RECT', {
          attr: POS_ENUM.includes(this.attr) ? this.attr : 'translate',
          order: TRANSFORM_ENUM.includes(this.attr) ? /-x/.test(this.attr) ? 0 : 1 : -1,
          value: `${this.size}${val}`
        })
      }
    },
    chineseName() {
      return {
        'top': '顶部距离',
        'left': '左边距离',
        'translate-x': '水平偏移',
        'translate-y': '竖直偏移'
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
.update-rect-input {
  .el-select .el-input {
    width: 120px;
  }

  .el-input-group__append {
    background-color: #fff;
  }
}
</style>
