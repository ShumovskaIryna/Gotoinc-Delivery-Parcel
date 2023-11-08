<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="task border border-gray-200 rounded p-4 mb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 class="text-xl font-semibold">Your parsel from{{ parcel.cityFrom }}</h2>
          <p class="text-xl font-semibold">to {{ parcel.cityTo }}</p>
        </div>
        <div class="flex justify-end items-center">
          <span class="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">{{ parcel.parcelType }}</span>
          <div class="ml-4 space-x-2">
            <button @click="editParcel" class="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 shadow-md border border-blue-500 hover:border-blue-700">
            Edit
            </button>
            <button @click="deleteParcel" class="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-700 shadow-md border border-red-500 hover:border-red-700">
            Delete
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