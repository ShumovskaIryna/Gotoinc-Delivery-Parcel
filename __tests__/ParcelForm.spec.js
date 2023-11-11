/* eslint-disable no-undef */
import { setActivePinia, createPinia } from 'pinia'
import { shallowMount } from '@vue/test-utils'

import ParcelForm from '../src/components/ParcelForm.vue'
import defaultMock from './mocks/ParceForm'

describe('ParcelForm.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders form elements correctly', () => {
    const wrapper = shallowMount(ParcelForm, defaultMock)

    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('updates form data on user interaction', async () => {
    const wrapper = shallowMount(ParcelForm, defaultMock)
    const cityFromInput = wrapper.find('input[name="cityFrom"]')
    await cityFromInput.setValue('New York')

    await wrapper.find('form').trigger('submit.prevent')
  })
})
