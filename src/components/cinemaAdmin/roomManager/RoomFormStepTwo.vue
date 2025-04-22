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
  
  const toggleSeatSelection = (rowIndex, seatIndex) => {
    if (selectionMode.value === 'single') {
      const seatKey = `${rowIndex}-${seatIndex}`;
      const index = selectedSeats.value.findIndex(s => s === seatKey);
      
      if (index === -1) {
        selectedSeats.value = [seatKey];
      } else {
        selectedSeats.value = [];
      }
    } else if (selectionMode.value === 'row') {
      selectRow(rowIndex);
    } else if (selectionMode.value === 'column') {
      selectColumn(seatIndex);
    } else if (selectionMode.value === 'multi') {
      const seatKey = `${rowIndex}-${seatIndex}`;
      const index = selectedSeats.value.findIndex(s => s === seatKey);
      
      if (index === -1) {
        selectedSeats.value.push(seatKey);
      } else {
        selectedSeats.value.splice(index, 1);
      }
    }
  };
  
  const selectRow = (rowIndex) => {
    const rowSeats = [];
    
    for (let i = 0; i < localRoomData.value.layout[rowIndex].length; i++) {
      rowSeats.push(`${rowIndex}-${i}`);
    }
    const allSelected = rowSeats.every(seat => selectedSeats.value.includes(seat));
    
    if (allSelected) {
      selectedSeats.value = selectedSeats.value.filter(seat => !rowSeats.includes(seat));
    } else {
      rowSeats.forEach(seat => {
        if (!selectedSeats.value.includes(seat)) {
          selectedSeats.value.push(seat);
        }
      });
    }
  };
  
  const selectColumn = (columnIndex) => {
    const columnSeats = [];
    
    for (let i = 0; i < localRoomData.value.layout.length; i++) {
      columnSeats.push(`${i}-${columnIndex}`);
    }

    const allSelected = columnSeats.every(seat => selectedSeats.value.includes(seat));
    
    if (allSelected) {
      selectedSeats.value = selectedSeats.value.filter(seat => !columnSeats.includes(seat));
    } else {
      columnSeats.forEach(seat => {
        if (!selectedSeats.value.includes(seat)) {
          selectedSeats.value.push(seat);
        }
      });
    }
  };
  
  const handleMouseEnter = (rowIndex, seatIndex) => {
    if (isDragging.value && selectionMode.value === 'multi') {
      const seatKey = `${rowIndex}-${seatIndex}`;
      if (!selectedSeats.value.includes(seatKey)) {
        selectedSeats.value.push(seatKey);
      }
    }
  };
  
  const clearSelection = () => {
    selectedSeats.value = [];
  };
  
  const saveStateToUndoStack = () => {
    redoStack.value = [];
    undoStack.value.push(JSON.parse(JSON.stringify(localRoomData.value.layout)));
    if (undoStack.value.length > 20) {
      undoStack.value.shift();
    }
  };
  
  const applyToSelected = () => {
    if (selectedSeats.value.length === 0) return;
    
    
    saveStateToUndoStack();
    
    
    selectedSeats.value.forEach(seatKey => {
      const [rowIndex, seatIndex] = seatKey.split('-').map(Number);
      if (rowIndex >= 0 && rowIndex < localRoomData.value.layout.length &&
          seatIndex >= 0 && seatIndex < localRoomData.value.layout[rowIndex].length) {
        localRoomData.value.layout[rowIndex][seatIndex].type = currentSeatType.value;
      }
    });

    selectedSeats.value = [];
  };
  
  const undoAction = () => {
    if (undoStack.value.length === 0) return;
    redoStack.value.push(JSON.parse(JSON.stringify(localRoomData.value.layout)));
    localRoomData.value.layout = undoStack.value.pop();
    selectedSeats.value = [];
  };
  
  const redoAction = () => {
    if (redoStack.value.length === 0) return;

    undoStack.value.push(JSON.parse(JSON.stringify(localRoomData.value.layout)));
    localRoomData.value.layout = redoStack.value.pop();
    selectedSeats.value = [];
  };
  

  const addRow = (position) => {
    
    saveStateToUndoStack();
    
    const newRow = [];
    const rowLength = localRoomData.value.layout[0].length;

    for (let i = 0; i < rowLength; i++) {
      newRow.push({
        type: localRoomData.value.defaultSeatType,
        row: position === 'top' ? 0 : localRoomData.value.layout.length,
        column: i
      });
    }

    if (position === 'top') {
      localRoomData.value.layout.unshift(newRow);

      for (let i = 1; i < localRoomData.value.layout.length; i++) {
        for (let j = 0; j < localRoomData.value.layout[i].length; j++) {
          localRoomData.value.layout[i][j].row = i;
        }
      }
    } else {
      localRoomData.value.layout.push(newRow);
    }

    localRoomData.value.rows = localRoomData.value.layout.length;
    selectedSeats.value = [];
  };
  
  const addColumn = (position) => {
    saveStateToUndoStack();

    for (let i = 0; i < localRoomData.value.layout.length; i++) {
      const newSeat = {
        type: localRoomData.value.defaultSeatType,
        row: i,
        column: position === 'left' ? 0 : localRoomData.value.layout[i].length
      };
      
      if (position === 'left') {
        localRoomData.value.layout[i].unshift(newSeat);
        for (let j = 1; j < localRoomData.value.layout[i].length; j++) {
          localRoomData.value.layout[i][j].column = j;
        }
      } else {
        localRoomData.value.layout[i].push(newSeat);
      }
    }
    localRoomData.value.seatsPerRow = localRoomData.value.layout[0].length;
    console.log("add column",localRoomData.value);
    selectedSeats.value = [];
  };
  
  const removeRow = (position) => {
    if (localRoomData.value.layout.length <= 1) return;
    saveStateToUndoStack();
    if (position === 'top') {
      localRoomData.value.layout.shift();
      for (let i = 0; i < localRoomData.value.layout.length; i++) {
        for (let j = 0; j < localRoomData.value.layout[i].length; j++) {
          localRoomData.value.layout[i][j].row = i;
        }
      }
    } else {
      localRoomData.value.layout.pop();
    }

    localRoomData.value.rows = localRoomData.value.layout.length;
    selectedSeats.value = [];
  };
  
  const removeColumn = (position) => {
    if (localRoomData.value.layout[0].length <= 1) return;

    saveStateToUndoStack();

    for (let i = 0; i < localRoomData.value.layout.length; i++) {
      if (position === 'left') {
        localRoomData.value.layout[i].shift();
        for (let j = 0; j < localRoomData.value.layout[i].length; j++) {
          localRoomData.value.layout[i][j].column = j;
        }
      } else {
        localRoomData.value.layout[i].pop();
      }
    }
    localRoomData.value.seatsPerRow = localRoomData.value.layout[0].length;
    selectedSeats.value = [];
  };

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