import { createReducer, createAction, current } from '@reduxjs/toolkit'

const initialState = { 
    loading: false,
    data: []
 }

const authPwRecoverReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(dashboardFetchCourses.pending, (state, action) => {
      state.loading = true
      console.log(action);
    })
    .addCase(dashboardFetchCourses.fulfilled, (state, {payload}) => {
        state.loading = false
        if (payload && payload.status) {
            state.data = payload.data?.courses
        }
    })
    .addCase(dashboardFetchCourses.rejected, (state) => {
      state.loading = false
    })
})

export default authPwRecoverReducer