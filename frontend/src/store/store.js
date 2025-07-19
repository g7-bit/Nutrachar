import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authslice.js'
import editDataSlice from './editDataSlice.js'
 const store = configureStore({
  reducer: {
    auth:authSlice,
    editData: editDataSlice
  }

})

export default store