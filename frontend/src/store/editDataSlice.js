import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditMode: false,
    dietData: null,
}

const editDataSlice = createSlice({
    name: "editData",
    initialState,
    reducers:{
        startEdit:(state,action)=>{
            state.isEditMode= true;
            state.dietData=action.payload
        },
        
        endEdit:(state,action)=>{
            state.isEditMode= false;
            state.dietData=null
        },
        
    }
})

export const {startEdit, endEdit} = editDataSlice.actions



export default editDataSlice.reducer