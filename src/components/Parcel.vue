<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="task border lg:w-full border-gray-200 rounded p-4 mb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-1">
        <div class="flex lg:w-full flex-col justify-center">
            <span class="flex w-min px-3 py-1 justify-center items-center bg-pink-400 text-white rounded-full text-sm lg:text-base mb-5">{{ parcel.parcelType }}</span>
          <h3 class="text-xl lg:text-2xl font-semibold mb-2">{{ parcel.cityFrom }}<font-awesome-icon class="ml-4 mr-4" :icon="['fas', 'arrow-right-long']" style="color: #d4ffdc;" beat/>{{ parcel.cityTo }} </h3>
          <span class="flex px-3 py-1 justify-center items-center bg-purple-400 text-white text-sm lg:text-base mb-5">Description: {{ parcel.description }}</span>
        </div>
        <div class="flex justify-end items-center space-x-2">
          <div class="mt-4 md:mt-0 space-x-2">
            <button @click="editParcel" class="px-4 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-700 shadow-md border border-blue-500 hover:border-blue-700">
              Edit <font-awesome-icon :icon="['fass', 'pen']" style="color: #1115f9;" />
            </button>
            <button @click="deleteParcel" class="px-4 py-2 rounded-lg text-white bg-red-400 hover:bg-red-700 shadow-md border border-red-500 hover:border-red-700">
              Delete <font-awesome-icon :icon="['fass', 'trash']" style="color: #ff0095;" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['parcel'],

    methods: {
      editParcel() {
      },
      deleteParcel() {
      }
    }
  }
  </script>