<template>
  <div @dragover.prevent.stop="onDragOver">
    
    <transition-group name="draggable-item-list">
      
      <draggable-item
        v-for="(item, index) in items"
        :key="item.id"
        :item="item"
        :containerId="id"
        :position="index"
        @itemDragOver="onItemDragOver"
        @dragenter.prevent
      >
                     
        <slot name="item" :item="item.data">
        </slot>
        <v-btn icon="mdi-close" @click="deleteQuestion(item.id)"></v-btn>  
      </draggable-item>
      <li :key="100000" class="p-4 flex justify-between items-center bg-white shadow rounded-lg">
        <v-btn icon="mdi-plus-outline" @click="addQuestion()"></v-btn>
  </li>
    </transition-group>
  </div>
</template>

<script>
import { toRefs } from "vue";
import DraggableItem from "./DraggableItem.vue";
import { useDraggableContainer } from "../../composables/draggable.ts";

import { watch } from "vue"
import _ from "lodash"

export default {
  name: "Draggable",
  methods: {
    addQuestion: function() {
      let mx = -1
      for (let i = 0; i < this.items.length; ++i) {
        mx = Math.max(mx, this.items[i].id)
      }
      this.items.push({
        id: mx + 1,
        data: {
        title: 'Pytanie ' + this.items.length,
        type: 'ShortTextAnswer',
        options: [],
        is_required: false
        }
      })
    },
    deleteQuestion: function(id) {
      let index = -1
      for (let i = 0; i < this.items.length; ++i) {
        if (this.items[i].id == id) {
          index = i;
        }
      }
      this.items.splice(index, 1)
    }
  },
  components: {
    DraggableItem
  },
  props: {
    modelValue: Array,
    transition: {
      default: "0",
      type: String
    }
  },
  emits: [
          'update:modelValue'
      ],
  setup(props, context) {
    const { modelValue } = toRefs(props);
    const {
      id,
      items,
      onDragOver,
      onItemDragOver,
    } = useDraggableContainer(modelValue, context);
    watch(() => _.cloneDeep(items), (currentValue, oldValue) => {
      context.emit('update:modelValue', currentValue)
    })
    console.log('watch')
    return { id, items, onDragOver, onItemDragOver };
  },
  computed: {
    transitionStyle() {
      return `transform ${this.transition}ms`;
    }
  }
};
</script>

<style scoped>
.draggable-item-list-move {
  transition: v-bind(transitionStyle);
}
</style>
