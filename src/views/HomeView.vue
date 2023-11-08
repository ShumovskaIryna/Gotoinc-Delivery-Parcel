<template>
  <div class="">
    <Suspense>
      <ParselList />
      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import Loader from '../components/Loader.vue'
import ParselList from '../components/ParcelList.vue'
</script>