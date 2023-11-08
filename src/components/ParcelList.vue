<template>
  <div class="home">
      <h3>Parsel List</h3>
      <div v-for="parcel in parcelStore.getParcels" v-bind:key="parcel.id">
        <Suspense>
          <Parcel :parcel="parcel" />
          <template #fallback>
            Loading tasks...
          </template>
        </Suspense>
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
  },
  methods: {
    async updateData() {
      this.parcelStore.getParcels.map((parcel) => {
        console.log(parcel)
      })
    },
  }
}
</script>

<style lang="scss">
</style>
