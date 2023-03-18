import { createReducer, createAction, current } from '@reduxjs/toolkit'
import { authSubmitLogin, setAuthData, authSubmitLogout } from '@/store/actions/auth'

const initialState = {
    data: []
}

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(authSubmitLogin.fulfilled, (state, { payload }) => {
            state.loading = false

            if (payload && payload.success) {
                let payloadData = payload.data
                state.data = payloadData
                localStorage.setItem('auth-user', JSON.stringify(payloadData))
            }
        })
        .addCase(setAuthData, (state, {payload}) => {
            if (payload) {
                state.data = JSON.parse(payload)
            } else {
                localStorage.removeItem('auth-user')
                state.data = []
            }
        })
        .addCase(authSubmitLogout.fulfilled, (state, {payload}) => {
            if (payload && payload.success) {
                localStorage.removeItem('auth-user')
                state.data = []
            }
        })
})

export default authReducer
