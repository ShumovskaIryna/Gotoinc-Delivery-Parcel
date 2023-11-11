import { defineStore } from 'pinia';

export const useParcelStore = defineStore('parcel', {
  state: () => ({
    parcels: [
      {
        id: 1,
        cityFrom: 'Kyiv, Ukraine',
        cityTo: 'Kharkiv, Ukraine',
        parcelType: 'Other',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: new Date(),
      },
      {
        id: 2,
        cityFrom: 'Kharkiv, Ukraine',
        cityTo: 'Kyiv, Ukraine',
        parcelType: 'Gadgets',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        date: new Date(),
      },
    ],
    parcelIdCounter: 3, 
  }),
  actions: {
    setParcels(data) {
      const newParcel = { id: this.parcelIdCounter++, ...data };
      this.parcels.unshift(newParcel);
      return this.parcels;
    },
    deleteParcel(parcelId) {
      this.parcels = this.parcels.filter((parcel) => parcel.id !== parcelId);
    },
    editParcelById(id, updatedParcel) {
      const index = this.parcels.findIndex((parcel) => parcel.id === id);
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