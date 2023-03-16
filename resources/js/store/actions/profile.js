import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from '@/axios-client'

const profileSubmitDelete = createAsyncThunk('profile/submitDelete', async (data) => {
    try {
        console.log('data data ', data)
        const response = await axios.delete('/profile', { data: data })
        return response.data
    } catch (error) {
        return error && error.response?.data
    }
})

export { profileSubmitDelete }
