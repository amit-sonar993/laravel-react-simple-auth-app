import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
    const response = await axios.get('/logout')
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

const authSubmitVerifyEmail = createAsyncThunk('auth/SubmitVerifyEmail', async ({token}) => {
  try {
    const response = await axios.post(`/customer/verify/${token}`)
      return response.data
  } catch (error) {
    return error && error.response?.data
  } 
})

const authSubmitPwdResetRequest = createAsyncThunk('auth/submitPwdResetRequest', async (email) => {
  // try {
  //   const response = await axios.post(`/customer/verify/${token}`)
  //     return response.data
  // } catch (error) {
  //   return error && error.response?.data
  // } 
})



export { authSubmitLogout, authSubmitRegister, authSubmitLogin, authSubmitVerifyEmail }

