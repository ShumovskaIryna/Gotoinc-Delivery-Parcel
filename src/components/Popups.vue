<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black bg-opacity-70 flex items-center justify-center"
  >
    <div class="w-4/5 md:w-2/5 lg:w-2/5 bg-gray-800/80 gap-4 p-8">
      <slot />
    </div>
  </div>
</template>
