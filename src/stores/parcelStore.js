import { defineStore } from 'pinia';

export const useParcelStore = defineStore('parcel', {
  state: () => ({
    parcels: [
      {
        id: 1,
        cityFrom: 'Kyiv, Ukraine',
        cityTo: 'Kharkiv, Ukraine',
        parcelType: 'Other',
        description: 'Lorem ipsum dolor sit amet...',
        date: new Date(),
      },
    ],
    parcelIdCounter: 2, 
  }),
  actions: {
    setParcels(data) {
      const newParcel = { id: this.parcelIdCounter++, ...data };
      this.parcels.push(newParcel);
      return this.parcels;
    },

    deleteParcel(parcelId) {
      this.parcels = this.parcels.filter((parcel) => parcel.id !== parcelId);
    },
  },
  getters: {
    getParcels(state) {
      return state.parcels;
    },
  },
});