import { createSlice } from "@reduxjs/toolkit";


let initialState={value:0}
let counterSlice= createSlice({

    name:'counter',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value +=1
        },
        decrement:(state)=>{
            state.value -=1
        }
    }
})

export let {increment,decrement}=counterSlice.actions;

let counterReducer= counterSlice.reducer;
export default counterReducer;