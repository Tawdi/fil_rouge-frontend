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

<script setup></script>