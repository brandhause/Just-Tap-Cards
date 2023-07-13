import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    profile: [],
    hasProfile: false,
  }),
  actions: {
    setProfile(payload) {
      this.profile = payload
      this.hasProfile = true
    },
  },
  getters : {
    getProfile() {
      return this.profile
    },
    isFetch() {
      return this.hasProfile
    }
  }
})