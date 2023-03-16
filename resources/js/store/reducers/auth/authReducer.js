import { createReducer, createAction, current } from '@reduxjs/toolkit'
import {authSubmitLogin, setAuthData} from '@/store/actions/auth'

const initialState = {
    loading: false,
    data: []
 }

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authSubmitLogin.pending, (state, action) => {
      state.loading = true
      console.log(action);
    })
    .addCase(authSubmitLogin.fulfilled, (state, {payload}) => {
        state.loading = false

        console.log(payload)
        if (payload && payload.success) {
            let payloadData = payload.data
            state.data = payloadData
            localStorage.setItem('auth-user', JSON.stringify(payloadData))
        }
    })
    .addCase(authSubmitLogin.rejected, (state) => {
      state.loading = false
    })
    .addCase(setAuthData, (state) => {
        const authData = localStorage.getItem('auth-user')

        if (authData) {
            state.data = JSON.parse(authData)
        }
      })
})

export default authReducer
