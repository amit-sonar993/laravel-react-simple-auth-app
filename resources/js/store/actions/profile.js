import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from '@/axios-client'

const profileSubmitUpadate = createAsyncThunk('profile/submitUpdate', async (data) => {
    try {
        const response = await axios.patch('/profile', data )
        return response.data
    } catch (error) {
        return error && error.response?.data
    }
})

const profileSubmitPasswordUpdate = createAsyncThunk('profile/submitPasswordUpdate ', async (data) => {
    try {
        const response = await axios.put('/password', data)
        return response.data
    } catch (error) {
        console.log('error =>', error);
        return error && error.response?.data
    }
})

const profileSubmitDelete = createAsyncThunk('profile/submitDelete', async (data) => {
    try {
        const response = await axios.delete('/profile', { data: data })
        return response.data
    } catch (error) {
        return error && error.response?.data
    }
})

export { profileSubmitUpadate, profileSubmitDelete, profileSubmitPasswordUpdate }
