<template>
  <div class="flex mb-4">
    <form class="flex flex-col gap-y-4" @submit.prevent="updateData">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="cityFrom">
        Sender city
      </label>
      <div class="relative">
        <input
          v-model="parcelForm.cityFrom"
          type="text"
          name="cityFrom"
          placeholder="Search for a city"
          @input="getSearchCityFrom"
        >
        <div class="">
          <ul v-if="parcelForm.cityFrom" class="">
            <p v-if="searchErrorFrom">
              Sorry, something went wrong, please try again.
            </p>
            <p v-if="!searchErrorFrom && mapboxSearchResultsFrom.length === 0">
              No results match your query, try a different term.
            </p>
            <template v-else>
              <li
                v-for="searchResultFrom in mapboxSearchResultsFrom"
                :key="searchResultFrom.id"
                class=""
                @click="writeCityFrom(searchResultFrom.place_name)"
              >
                {{ searchResultFrom.place_name }}
              </li>
            </template>
          </ul>
        </div>
      </div>
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="cityTo">
        Receiving city
      </label>
      <div class="relative">
        <input
          v-model="parcelForm.cityTo"
          type="text"
          name="cityTo"
          placeholder="Search for a city"
          @input="getSearchCityTo"
        >
        <div class="">
          <ul v-if="parcelForm.cityTo" class="">
            <p v-if="searchErrorTo">
              Sorry, something went wrong, please try again.
            </p>
            <p v-if="!searchErrorTo && mapboxSearchResultsTo.length === 0">
              No results match your query, try a different term.
            </p>
            <template v-else>
              <li
                v-for="searchResultTo in mapboxSearchResultsTo"
                :key="searchResultTo.id"
                class=""
                @click="writeCityTo(searchResultTo.place_name)"
              >
                {{ searchResultTo.place_name }}
              </li>
            </template>
          </ul>
        </div>
      </div>
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="parcelType">
        Type of parcel
      </label>
      <div class="relative">
        <select class="border border-gray-300 px-4 py-2 rounded" id="parcelType" v-model="parcelForm.parcelType">
          <option>gadgets</option>
          <option>drinks</option>
          <option>clothes</option>
          <option>medicines</option>
          <option>other</option>
        </select>
      </div>
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">
        Parcel description
      </label>
      <div class="relative">
        <input
          type="text"
          v-model="parcelForm.description"
          name="description"
          class="searchInput"
          placeholder="Parcel description"
        >
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add Parcel</button>
    </form>
  </div>
</template>

<script>
import { useParcelStore } from '../stores/parcelStore'
import axios from 'axios'

export default {
  data() {
    return {
      parcelForm: {
        cityFrom: '',
        cityTo: '',
        parcelType: '',
        description: '',
        date: '',
      },
      mapboxSearchResultsFrom: [],
      mapboxSearchResultsTo: [],
      searchErrorFrom: false,
      searchErrorTo: false,
    }
  },

  setup() {
    const parcelStore = useParcelStore()
    return { parcelStore }
  },

  methods: {
    async updateData() {
      this.parcelStore.setParcels({
        cityFrom: this.parcelForm.cityFrom,
        cityTo: this.parcelForm.cityTo,
        parcelType: this.parcelForm.parcelType,
        description: this.parcelForm.description,
        date: this.parcelForm.date,
      })

      this.parcelForm.cityFrom = ''
      this.parcelForm.cityTo = ''
      this.parcelForm.parcelType = ''
      this.parcelForm.description = ''
      this.parcelForm.date = ''
      
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

    reset() {
      this.parcelForm.cityFrom = ''
      this.parcelForm.cityTo = ''
      this.parcelForm.parcelType = ''
      this.parcelForm.description = ''
      this.parcelForm.date = ''
    },
  },
}
</script>









