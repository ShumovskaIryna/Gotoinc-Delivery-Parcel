<template>
  <div class="home p-8 min-h-screen">
    <h3 class="text-2xl font-semibold mb-4">Parcel List{{' [ '}}<font-awesome-icon :icon="['fas', 'boxes-stacked']" beat :key="'icon1'" />{{' ]'}}</h3>
    <div class="grid grid-cols-1 gap-5">
      <div v-for="parcel in parcelStore.getParcels" :key="parcel.id">
        <Suspense>
          <Parcel :parcel="parcel" />
          <template #fallback>
            <div class="text-gray-500 text-sm">Loading parcels...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script>
import Parcel from '../components/Parcel.vue'
import { useParcelStore } from '../stores/parcelStore'

export default {
  components: { 
    Parcel, 
  },
  setup() {
    const parcelStore = useParcelStore()
    return { parcelStore }
  }
}
</script>

<style lang="scss">
</style>
