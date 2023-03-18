import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from '@/axios-client'

const profileSubmitDelete = createAsyncThunk('profile/submitDelete', async (data) => {
    try {
        const response = await axios.delete('/profile', { data: data })
        return response.data
    } catch (error) {
        return error && error.response?.data
    }
})

const profileSubmitPasswordUpdate = createAsyncThunk('profile/submitPasswordUpdate ', async (data) => {
    try {
        console.log(data);
        const response = await axios.patch('/profile/password-update', data)
        return response.data
    } catch (error) {
        return error && error.response?.data
    }
})

export { profileSubmitDelete, profileSubmitPasswordUpdate }
