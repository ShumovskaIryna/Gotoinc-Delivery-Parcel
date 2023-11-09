<template>
  <div class="flex w-full justify-center mr-auto ml-auto">
    <Suspense>
      <ParselForm />
      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import Loader from '../components/Loader.vue'
import ParselForm from '../components/ParcelForm.vue'
</script>