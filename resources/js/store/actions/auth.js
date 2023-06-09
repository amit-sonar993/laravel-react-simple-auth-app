import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from '../../axios-client'

const authSubmitLogin = createAsyncThunk('auth/submitLogin', async (data) => {
  try {
    const response = await axios.post('/login', data)
      return response.data
  } catch (error) {
    return error && error.response?.data
  }
})

const authSubmitLogout = createAsyncThunk('auth/submitLogout', async () => {
  try {
    const response = await axios.post('/logout')
      return response.data
  } catch (error) {
    return error && error.response?.data
  }
})

const authSubmitRegister = createAsyncThunk('auth/submitRegister', async (data) => {
  try {
    const response = await axios.post('/register', data)
      return response.data
  } catch (error) {
    return error && error.response?.data
  }
})

const setAuthData = createAction('auth/setData')


export { authSubmitLogout, authSubmitRegister, authSubmitLogin, setAuthData }

