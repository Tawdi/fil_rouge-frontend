<template>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Tools Panel -->
      <ToolsPanel
        v-model:selection-mode="selectionMode"
        v-model:current-seat-type="currentSeatType"
        :selected-seats="selectedSeats"
        :room-data="localRoomData"
        :undo-stack="undoStack"
        :redo-stack="redoStack"
        @clear-selection="clearSelection"
        @apply-to-selected="applyToSelected"
        @undo="undoAction"
        @redo="redoAction"
        @add-row="addRow"
        @add-column="addColumn"
        @remove-row="removeRow"
        @remove-column="removeColumn"
        @continue="$emit('continue')"
      />
      
      <!-- Seat Layout Editor -->
      <SeatLayoutEditor
        class="lg:col-span-3"
        :room-data="localRoomData"
        :selection-mode="selectionMode"
        :selected-seats="selectedSeats"
        :is-dragging="isDragging"
        @toggle-seat="toggleSeatSelection"
        @select-row="selectRow"
        @select-column="selectColumn"
        @mouse-enter="handleMouseEnter"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
  import ToolsPanel from '@/components/cinemaAdmin/roomManager/ToolsPanel.vue';
  import SeatLayoutEditor from '@/components/cinemaAdmin/roomManager/SeatLayoutEditor.vue';
  
  const props = defineProps({
    roomData: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['update:room-data', 'continue']);

  const localRoomData = ref({ ...props.roomData });

  watch(localRoomData, (newValue) => {
    emit('update:room-data', newValue);
  }, { deep: true });

  watch(() => props.roomData, (newValue) => {
    localRoomData.value = { ...newValue };
  }, { deep: true });

  const selectionMode = ref('single');
  const currentSeatType = ref('Standard');
  const selectedSeats = ref([]);
  const isDragging = ref(false);
  const undoStack = ref([]);
  const redoStack = ref([]);
  
  onMounted(() => {
    document.addEventListener('mousedown', () => {
      isDragging.value = true;
    });
    
    document.addEventListener('mouseup', () => {
      isDragging.value = false;
    });
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', () => {
      isDragging.value = true;
    });
    
    document.removeEventListener('mouseup', () => {
      isDragging.value = false;
    });
  });
  </script>