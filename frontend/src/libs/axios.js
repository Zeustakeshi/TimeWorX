// lib/axios.js
import Axios from 'axios';

let csrfInitialized = false;

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  withXSRFToken: true
})

axios.interceptors.request.use(async (config) => {
  if (!csrfInitialized) {
    try {
      await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
        withCredentials: true
      })
      csrfInitialized = true
      // console.log('✅ CSRF token initialized')
    } catch (error) {
      // console.error('❌ Failed to initialize CSRF token', error)
      throw error
    }
  }
  return config
})

export default axios
