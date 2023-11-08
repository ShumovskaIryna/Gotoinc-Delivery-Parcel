import { defineStore } from 'pinia'

export const useParcelStore = defineStore("parcel", {
  state: () => ({
    parcels: []
  }),
  actions: {
    setParcels(data) {
      this.parcels.push(data)
      return this.parcels;
    }
  },
  getters: {
    getParcels(state) {
      return state.parcels;
    }
  }
});