<template>
<div class="lg:col-span-1 bg-[#1a1a1a] rounded-lg p-6">
    <h2 class="text-xl font-bold mb-6">Customization Tools</h2>
    
    <div class="space-y-6">
    <!-- Selection Mode -->
    <div>
        <label class="block text-sm font-medium text-[#999999] mb-2">Selection Mode</label>
        <div class="flex flex-wrap gap-2">
        <button 
            @click="$emit('update:selection-mode', 'single')"
            :class="[
            'px-3 py-1.5 rounded-md text-sm flex items-center',
            selectionMode === 'single' 
                ? 'bg-[#e50000] text-white' 
                : 'bg-[#262626] text-white hover:bg-[#333333]'
            ]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse-pointer-click mr-1"><path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/></svg>
            Single
        </button>
        <button 
            @click="$emit('update:selection-mode', 'row')"
            :class="[
            'px-3 py-1.5 rounded-md text-sm flex items-center',
            selectionMode === 'row' 
                ? 'bg-[#e50000] text-white' 
                : 'bg-[#262626] text-white hover:bg-[#333333]'
            ]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-horizontal mr-1"><circle cx="12" cy="9" r="1"/><circle cx="19" cy="9" r="1"/><circle cx="5" cy="9" r="1"/><circle cx="12" cy="15" r="1"/><circle cx="19" cy="15" r="1"/><circle cx="5" cy="15" r="1"/></svg>
            Row
        </button>
        <button 
            @click="$emit('update:selection-mode', 'column')"
            :class="[
            'px-3 py-1.5 rounded-md text-sm flex items-center',
            selectionMode === 'column' 
                ? 'bg-[#e50000] text-white' 
                : 'bg-[#262626] text-white hover:bg-[#333333]'
            ]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-vertical mr-1"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
            Column
        </button>
        <button 
            @click="$emit('update:selection-mode', 'multi')"
            :class="[
            'px-3 py-1.5 rounded-md text-sm flex items-center',
            selectionMode === 'multi' 
                ? 'bg-[#e50000] text-white' 
                : 'bg-[#262626] text-white hover:bg-[#333333]'
            ]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse-pointer-square mr-1"><path d="M21 11V5a2 2 0 0 0-2-2H9"/><path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M9 3 5 7l4 4"/></svg>
            Multi
        </button>
        </div>
    </div>
    
    <!-- Seat Type -->
    <div>
        <label class="block text-sm font-medium text-[#999999] mb-2">Seat Type</label>
        <div class="grid grid-cols-2 gap-2">
        <button 
            @click="$emit('update:current-seat-type', 'Standard')"
            :class="[
            'px-3 py-1.5 rounded-md text-sm flex items-center justify-center',
            currentSeatType === 'Standard' 
                ? 'bg-blue-500/20 border border-blue-500 text-blue-300' 
                : 'bg-[#262626] text-white hover:bg-[#333333]'
            ]"
        >
            Standard
        </button>
        <button 
            @click="$emit('update:current-seat-type', 'VIP')"
            :class="[
            'px-3 py-1.5 rounded-md text-sm flex items-center justify-center',
            currentSeatType === 'VIP' 
                ? 'bg-purple-500/20 border border-purple-500 text-purple-300' 
                : 'bg-[#262626] text-white hover:bg-[#333333]'
            ]"
        >
            VIP
        </button>
        <button 
            @click="$emit('update:current-seat-type', 'Accessible')"
            :class="[
            'px-3 py-1.5 rounded-md text-sm flex items-center justify-center',
            currentSeatType === 'Accessible' 
                ? 'bg-green-500/20 border border-green-500 text-green-300' 
                : 'bg-[#262626] text-white hover:bg-[#333333]'
            ]"
        >
            Accessible
        </button>
        <button 
            @click="$emit('update:current-seat-type', 'None')"
            :class="[
            'px-3 py-1.5 rounded-md text-sm flex items-center justify-center',
            currentSeatType === 'None' 
                ? 'bg-red-500/20 border border-red-500 text-red-300' 
                : 'bg-[#262626] text-white hover:bg-[#333333]'
            ]"
        >
            Remove
        </button>
        </div>
    </div>
    
    <!-- Actions -->
    <div>
        <label class="block text-sm font-medium text-[#999999] mb-2">Actions</label>
        <div class="space-y-2">
        <button 
            @click="$emit('apply-to-selected')"
            class="w-full px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
            :disabled="selectedSeats.length === 0"
            :class="{ 'opacity-50 cursor-not-allowed': selectedSeats.length === 0 }"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mr-1"><path d="M20 6 9 17l-5-5"/></svg>
            Apply to Selected ({{ selectedSeats.length }})
        </button>
        
        <button 
            @click="$emit('clear-selection')"
            class="w-full px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
            :disabled="selectedSeats.length === 0"
            :class="{ 'opacity-50 cursor-not-allowed': selectedSeats.length === 0 }"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x mr-1"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            Clear Selection
        </button>
        
        <div class="flex gap-2">
            <button 
            @click="$emit('undo')"
            class="flex-1 px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
            :disabled="undoStack.length === 0"
            :class="{ 'opacity-50 cursor-not-allowed': undoStack.length === 0 }"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo-2 mr-1"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
            Undo
            </button>
            <button 
            @click="$emit('redo')"
            class="flex-1 px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
            :disabled="redoStack.length === 0"
            :class="{ 'opacity-50 cursor-not-allowed': redoStack.length === 0 }"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-redo-2 mr-1"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13"/></svg>
            Redo
            </button>
        </div>
        </div>
    </div>
    
    <!-- Add Rows & Columns -->
    <div>
        <label class="block text-sm font-medium text-[#999999] mb-2">Add Rows & Columns</label>
        <div class="grid grid-cols-2 gap-2 mb-3">
        <button 
            @click="$emit('add-row', 'top')"
            class="px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up mr-1"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            Add Row (Top)
        </button>
        <button 
            @click="$emit('add-row', 'bottom')"
            class="px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down mr-1"><path d="m19 12-7 7-7-7"/><path d="M12 5v14"/></svg>
            Add Row (Bottom)
        </button>
        </div>
        <div class="grid grid-cols-2 gap-2">
        <button 
            @click="$emit('add-column', 'left')"
            class="px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left mr-1"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Add Column (Left)
        </button>
        <button 
            @click="$emit('add-column', 'right')"
            class="px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right mr-1"><path d="m5 12 7 7 7-7"/><path d="M5 12h14"/></svg>
            Add Column (Right)
        </button>
        </div>
    </div>

    <!-- Remove rows and columns -->
    <div class="mt-4">
        <label class="block text-sm font-medium text-[#999999] mb-2">Remove Rows & Columns</label>
        <div class="grid grid-cols-2 gap-2 mb-3">
        <button 
            @click="$emit('remove-row', 'top')"
            class="px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
            :disabled="roomData.layout.length <= 1"
            :class="{ 'opacity-50 cursor-not-allowed': roomData.layout.length <= 1 }"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus mr-1"><path d="M5 12h14"/></svg>
            Remove First Row
        </button>
        <button 
            @click="$emit('remove-row', 'bottom')"
            class="px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
            :disabled="roomData.layout.length <= 1"
            :class="{ 'opacity-50 cursor-not-allowed': roomData.layout.length <= 1 }"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus mr-1"><path d="M5 12h14"/></svg>
            Remove Last Row
        </button>
        </div>
        <div class="grid grid-cols-2 gap-2">
        <button 
            @click="$emit('remove-column', 'left')"
            class="px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
            :disabled="roomData.layout[0].length <= 1"
            :class="{ 'opacity-50 cursor-not-allowed': roomData.layout[0].length <= 1 }"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus mr-1"><path d="M5 12h14"/></svg>
            Remove First Column
        </button>
        <button 
            @click="$emit('remove-column', 'right')"
            class="px-3 py-2 bg-[#262626] hover:bg-[#333333] rounded-md text-sm flex items-center justify-center"
            :disabled="roomData.layout[0].length <= 1"
            :class="{ 'opacity-50 cursor-not-allowed': roomData.layout[0].length <= 1 }"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus mr-1"><path d="M5 12h14"/></svg>
            Remove Last Column
        </button>
        </div>
    </div>
    
    <!-- Legend -->
    <div>
        <label class="block text-sm font-medium text-[#999999] mb-2">Legend</label>
        <div class="space-y-2 bg-[#262626] p-3 rounded-md">
        <div class="flex items-center">
            <div class="w-4 h-4 rounded bg-blue-500/20 border border-blue-500"></div>
            <span class="ml-2 text-xs">Standard</span>
        </div>
        <div class="flex items-center">
            <div class="w-4 h-4 rounded bg-purple-500/20 border border-purple-500"></div>
            <span class="ml-2 text-xs">VIP</span>
        </div>
        <div class="flex items-center">
            <div class="w-4 h-4 rounded bg-green-500/20 border border-green-500"></div>
            <span class="ml-2 text-xs">Accessible</span>
        </div>
        <div class="flex items-center">
            <div class="w-4 h-4 rounded bg-[#333333]"></div>
            <span class="ml-2 text-xs">Removed/Aisle</span>
        </div>
        <div class="flex items-center">
            <div class="w-4 h-4 rounded bg-yellow-500/20 border-2 border-yellow-500"></div>
            <span class="ml-2 text-xs">Selected</span>
        </div>
        </div>
    </div>
    
    <div class="pt-4">
        <button 
        @click="$emit('continue')"
        class="w-full px-4 py-2 bg-[#e50000] hover:bg-[#cc0000] text-white rounded-md"
        >
        Continue to Review
        </button>
    </div>
    </div>
</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
selectionMode: {
    type: String,
    required: true
},
currentSeatType: {
    type: String,
    required: true
},
selectedSeats: {
    type: Array,
    required: true
},
roomData: {
    type: Object,
    required: true
},
undoStack: {
    type: Array,
    required: true
},
redoStack: {
    type: Array,
    required: true
}
});

defineEmits([
'update:selection-mode',
'update:current-seat-type',
'clear-selection',
'apply-to-selected',
'undo',
'redo',
'add-row',
'add-column',
'remove-row',
'remove-column',
'continue'
]);
</script>