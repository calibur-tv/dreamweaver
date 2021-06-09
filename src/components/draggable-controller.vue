<template>
  <teleport
    v-if="teleportId > -1"
    :to="'#dl-' + teleportId"
  >
    <div class="draggable-controller">
      <createNodeBtn />
      <deleteNodeBtn />
      <ElPopover
        :width="372"
        transition="none"
        trigger="click"
        popper-class="draggable-popover"
      >
        <template #reference>
          <el-button
            icon="el-icon-edit"
            circle
            plain
            type="primary"
          />
        </template>
        <div class="tools">
          <div>
            <UpdateLayoutSelect />
            <updatePositionSelect />
          </div>
          <div>
            <UpdateSizeInput attr="width" />
            <UpdateSizeInput attr="height" />
          </div>
          <div>
            <UpdateMergeInput attr="top" />
            <UpdateMergeInput attr="right" />
            <UpdateMergeInput attr="bottom" />
            <UpdateMergeInput attr="left" />
          </div>
          <div>
            <updateRectInput attr="top" />
            <updateRectInput attr="left" />
            <updateRectInput attr="translate-x" />
            <updateRectInput attr="translate-y" />
          </div>
        </div>
      </ElPopover>
    </div>
  </teleport>
</template>

<script>
import createNodeBtn from './tools/create-node'
import deleteNodeBtn from './tools/delete-node'
import UpdateLayoutSelect from './tools/update-layout'
import UpdateSizeInput from './tools/update-size'
import UpdateMergeInput from './tools/update-margin'
import updatePositionSelect from './tools/update-position'
import updateRectInput from './tools/update-rect'

export default {
  name: 'DraggableController',
  components: {
    createNodeBtn,
    deleteNodeBtn,
    UpdateLayoutSelect,
    UpdateSizeInput,
    UpdateMergeInput,
    updatePositionSelect,
    updateRectInput,
  },
  data() {
    return {
      teleportId: -1
    }
  },
  computed: {
    node() {
      return this.$store.state.node
    },
    parent() {
      return this.$store.state.parent
    }
  },
  watch: {
    node: {
      handler(newVal) {
        this.teleportId = newVal._uid
      },
      immediate: true
    },
    parent() {
      this.teleportId = -1
      this.$nextTick(() => {
        this.teleportId = this.node._uid
      })
    }
  }
}
</script>

<style lang="scss">
.draggable-controller {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}

.draggable-popover {
  .tools {
    display: flex;
    flex-direction: column;
  }
}
</style>
