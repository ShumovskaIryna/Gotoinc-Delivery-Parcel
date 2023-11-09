<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="task border lg:w-full border-gray-500 bg-gray-800 rounded p-4 mb-2">
      <div class="grid grid-cols-1 gap-1">
        <div class="flex lg:w-full flex-col justify-center">
          <div class="flex lg:w-full flex-row">
            <span 
            class="flex w-min px-3 py-1 justify-center items-center bg-pink-400 text-white rounded-full text-sm lg:text-base mb-5">
            {{ parcel.parcelType }}
          </span>
            <span 
            class="flex w-max px-3 py-1 justify-center items-center bg-purple-400 text-white rounded-full text-sm lg:text-base mb-5 ml-2">
            {{ getDate }}
          </span>
          </div>
          <h3 class="text-xl lg:text-2xl font-semibold mb-2">
            {{ parcel.cityFrom }}
            <font-awesome-icon class="ml-4 mr-4" :icon="['fas', 'arrow-right-long']" style="color: #d4ffdc;" beat/>
            {{ parcel.cityTo }} 
          </h3>
          <span v-if="!showDetails" class="flex-col w-full rounded px-3 py-1 bg-purple-500/50 text-white mb-5 mt-5">
            Description: {{ parcel.description.slice(0, 80) }}
            <button v-if="parcel.description.length > 80" @click="toggleDetails" 
            class="float-right w-max h-min px-3 py-1 bg-purple-600 rounded text-white mr-0 ml-auto mb-0 mt-auto">
              ...ShowDetails</button>
          </span>
          <span v-if="showDetails" 
          class="flex-col w-full px-3 py-1 bg-purple-500/50 rounded text-white mb-5 mt-5">
            Description: {{ parcel.description }}
            <button @click="toggleDetails" 
            class="float-right w-max h-min px-3 py-1 bg-purple-600 rounded text-white mr-0 ml-auto mb-0 mt-auto">
              ...Hide Details</button>
          </span>
        </div>
        <div class="flex justify-end items-center space-x-2">
          <div class="mt-4 md:mt-0 space-x-2">
            <button @click="toggleParcelForm" 
            class="px-4 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-700 shadow-md border border-blue-500 hover:border-blue-700">
              Edit <font-awesome-icon :icon="['fass', 'pen']" style="color: #1115f9;" />
            </button>
            <button @click="deleteParcel(parcel.id)" 
            class="px-4 py-2 rounded-lg text-white bg-red-400 hover:bg-red-700 shadow-md border border-red-500 hover:border-red-700">
              Delete <font-awesome-icon :icon="['fass', 'trash']" style="color: #ff0095;" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="showEditForm" class="absolute flex w-full bg-gray-900/80 left-0 top-12 z-40">
        <ParcelForm 
        :editParcel="parcel" 
        :toggleParcelForm="toggleParcelForm" 
        :showEditForm="showEditForm"
        :parcelId="parcel.id"/>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useParcelStore } from '../stores/parcelStore';
  import ParcelForm from './ParcelForm.vue';
  export default {
    components: { 
      ParcelForm, 
    },
    setup() {
      const parcelStore = useParcelStore();
      const showDetails = ref(false);
      const showEditForm = ref(false);
      const toggleDetails = () => {
        showDetails.value = !showDetails.value;
      };
      const toggleParcelForm = ()=> {
        showEditForm.value = !showEditForm.value;
      };
      return {
        showDetails,
        showEditForm,
        toggleDetails,
        toggleParcelForm,
        parcelStore
      };
    },
    props: ['parcel'],
    methods: {
      deleteParcel(parcelId) {
        this.parcelStore.deleteParcel(parcelId);
      },
    },
    computed: {
      getDate() {
        const options = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        return new Date(this.parcel.date).toLocaleString('en-us', options)
      },
    },

  }
  </script>