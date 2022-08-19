import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './CreateSlice'

export  let counterStore = configureStore({
    reducer:{
        counter:counterReducer
    }
})