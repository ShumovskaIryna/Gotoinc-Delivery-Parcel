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
    editParcel(updatedParcel) {
      const index = this.parcels.findIndex((parcel) => parcel.id === updatedParcel.id);
      if (index !== -1) {
        this.parcels.splice(index, 1, updatedParcel);
      }
    }
  },
  getters: {
    getParcels(state) {
      return state.parcels;
    },
    getParcelById: (state) => (parcelId) => {
      return state.parcels.find((parcel) => parcel.id === parcelId);
    },
  },
});