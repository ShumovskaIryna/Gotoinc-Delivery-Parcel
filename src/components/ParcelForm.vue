<template>
  <div class="flex w-11/12 md:w-6/12 xl:w-6/12 justify-center mr-auto ml-auto min-h-screen text-white">
    <form class="block tracking-wide bg-slate-800 w-full p-5 md:p-8 rounded-lg shadow-lg mt-2 mb-2" @submit.prevent="updateData">
      <h2 v-if="!editParcel" class="text-purple-200 hover:text-blue-200 px-2 py-5 lg:px-4 lg:py-2 text-lg lg:text-xl font-semibold transition duration-300 ease-in-out mb-3">
        New Parcel{{'  +'}}<font-awesome-icon :icon="['fas', 'box-open']" bounce :key="'icon2'" />
      </h2>
      <h2 v-if="editParcel" class="text-purple-200 hover:text-blue-200 px-2 py-5 lg:px-4 lg:py-2 text-lg lg:text-xl font-semibold transition duration-300 ease-in-out mb-3">
        Edit Parcel{{'  '}}<font-awesome-icon :icon="['fas', 'box-open']" bounce :key="'icon2'" /> <font-awesome-icon :icon="['fass', 'pen']" />
      </h2>
      <!-- Sender City Input -->
      <div class="mb-4">
        <label class="block uppercase text-gray-100 text-sm font-semibold mb-3" for="cityFrom">Sender City</label>
        <div class="relative">
          <input
            v-model="parcelForm.cityFrom"
            type="text"
            name="cityFrom"
            placeholder="Search for a city"
            @input="getSearchCityFrom"
            class="w-full bg-slate-300 text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
          <ul v-if="parcelForm.cityFrom">
            <li
              v-for="searchResultFrom in mapboxSearchResultsFrom"
              :key="searchResultFrom.id"
              class="cursor-pointer text-blue-500 hover:text-blue-700 mt-1"
              @click="writeCityFrom(searchResultFrom.place_name)"
            >
              {{ searchResultFrom.place_name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Receiving City Input -->
      <div class="mb-4">
        <label class="block uppercase text-gray-100 text-sm font-semibold mb-3" for="cityTo">Receiving City</label>
        <div class="relative">
          <input
            v-model="parcelForm.cityTo"
            type="text"
            name="cityTo"
            placeholder="Search for a city"
            @input="getSearchCityTo"
            class="w-full bg-slate-300 text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
          <ul v-if="parcelForm.cityTo">
            <li
              v-for="searchResultTo in mapboxSearchResultsTo"
              :key="searchResultTo.id"
              class="cursor-pointer text-blue-500 hover:text-blue-700 mt-1"
              @click="writeCityTo(searchResultTo.place_name)"
            >
              {{ searchResultTo.place_name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- DataPicker -->
      <div class="mb-4">
        <label class="block uppercase text-gray-100 text-sm font-semibold mb-3" for="date">Date of dispatch</label>
        <div class="relative">
          <DatePicker 
          v-model="parcelForm.date" 
          class="w-full border bg-slate-300 text-gray-900  border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          />
        </div>
      </div>

      <!-- Parcel Type Dropdown -->
      <div class="mb-4">
        <label class="block uppercase text-gray-100 text-sm font-semibold mb-3" for="parcelType">Type of Parcel</label>
        <div class="relative">
          <select class="w-full bg-slate-300 text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" id="parcelType" v-model="parcelForm.parcelType">
            <option value="Gadgets">Gadgets</option>
            <option value="Drinks">Drinks</option>
            <option value="Clothes">Clothes</option>
            <option value="Medicines">Medicines</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <!-- Parcel Description Input -->
      <div class="mb-4">
        <label class="block uppercase text-gray-100 text-sm font-semibold mb-3" for="description">Parcel Description</label>
        <div class="relative">
          <input
            type="text"
            v-model="parcelForm.description"
            name="description"
            class="w-full border bg-slate-300 text-gray-900  border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Parcel description"
            required
          >
        </div>
      </div>

      <!-- Submit Button -->
      <div>
        <button v-if="!editParcel" type="submit" class="w-full bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          Add parcel{{'  +'}}<font-awesome-icon :icon="['fas', 'box-open']" />
        </button>
        <button v-if="editParcel" type="submit" 
        class="w-full bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
          Save changes
        </button>
        <button v-if="editParcel" @click="toggleParcelForm" 
        class="w-full bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {computed} from 'vue'
import { useParcelStore } from '../stores/parcelStore';
import DatePicker from 'vue3-datepicker';
import axios from 'axios';

export default {
  props: ['editParcel', 'showEditForm', 'toggleParcelForm', 'parcelId'],
  data() {
    return {
      parcelForm: {
        cityFrom: '',
        cityTo: '',
        parcelType: 'Other',
        description: '',
        date: new Date(),
      },
      mapboxSearchResultsFrom: [],
      mapboxSearchResultsTo: [],
      searchErrorFrom: false,
      searchErrorTo: false,
    };
  },
  components: {
    DatePicker,
  },

  setup() {
    const parcelStore = useParcelStore();
    const existingParcel = computed(() => parcelStore.getParcelById(this.parcelId));

    return {
      existingParcel,
      parcelStore
    };
  },
  mounted() {
    if (this.editParcel && this.parcelId) {
      this.loadParcelData(this.parcelId);
    }
  },

  methods: {
    async updateData() {
      if (!this.editParcel) {
        this.parcelStore.setParcels({
          cityFrom: this.parcelForm.cityFrom,
          cityTo: this.parcelForm.cityTo,
          parcelType: this.parcelForm.parcelType,
          description: this.parcelForm.description,
          date: this.parcelForm.date,
        })
      } else {
          this.parcelStore.editParcel({
            id: this.parcelId,
            cityFrom: this.parcelForm.cityFrom,
            cityTo: this.parcelForm.cityTo,
            parcelType: this.parcelForm.parcelType,
            description: this.parcelForm.description,
            date: this.parcelForm.date,
          });
        }
        this.resetForm();
        this.$router.push('/');
        this.toggleParcelForm();
    },
    loadParcelData(parcelId) {
      const existingParcel = this.parcelStore.getParcelById(parcelId);
      if (existingParcel) {
        this.parcelForm.cityFrom = existingParcel.cityFrom;
        this.parcelForm.cityTo = existingParcel.cityTo;
        this.parcelForm.parcelType = existingParcel.parcelType;
        this.parcelForm.description = existingParcel.description;
        this.parcelForm.date = existingParcel.date;
      }
    },
    resetForm() {
      this.parcelForm.cityFrom = '';
      this.parcelForm.cityTo = '';
      this.parcelForm.parcelType = 'Other';
      this.parcelForm.description = '';
      this.parcelForm.date = new Date();
    },
    writeCityFrom(cityFromName) {
      this.parcelForm.cityFrom = cityFromName;
      this.mapboxSearchResultsFrom = ['']
    },
    writeCityTo(cityToName) {
      this.parcelForm.cityTo = cityToName;
      this.mapboxSearchResultsTo = ['']
    },

    async getSearchCityFrom() {
      const mapboxAPIKey =
        'pk.eyJ1IjoiaXJ5bmthcGFuZGEiLCJhIjoiY2xnYjkxcm9wMGw0bjNjcWxhcW5qZWJhNSJ9.T2d9setCNRmlOh3ix874Pw'

      const cityFrom = this.parcelForm.cityFrom
      clearTimeout(this.queryTimeoutFrom)

      this.queryTimeoutFrom = setTimeout(async () => {
        if (cityFrom !== '') {
          try {
            const result = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityFrom}.json?access_token=${mapboxAPIKey}&types=place`
            )
            this.mapboxSearchResultsFrom = result.data.features
          } catch {
            this.searchErrorFrom = true
          }
          return
        }
        this.mapboxSearchResultsFrom = []
      }, 300)
    },

    async getSearchCityTo() {
      const mapboxAPIKey =
        'pk.eyJ1IjoiaXJ5bmthcGFuZGEiLCJhIjoiY2xnYjkxcm9wMGw0bjNjcWxhcW5qZWJhNSJ9.T2d9setCNRmlOh3ix874Pw'

      const cityTo = this.parcelForm.cityTo
      clearTimeout(this.queryTimeoutTo)

      this.queryTimeoutTo = setTimeout(async () => {
        if (cityTo !== '') {
          try {
            const result = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityTo}.json?access_token=${mapboxAPIKey}&types=place`
            )
            this.mapboxSearchResultsTo = result.data.features
          } catch {
            this.searchErrorTo = true
          }
          return
        }
        this.mapboxSearchResultsTo = []
      }, 300)
    },
  },
}
</script>
