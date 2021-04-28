
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    size: '',
    dough: '',
    border: '',
    flavors: []
  }

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeName: (state, action) => {
        state.name = action.payload
    },
    changeSize: (state, action) => {
        state.size = action.payload
    },
    changeDough: (state, action) => {
        state.dough = action.payload
    },
    changeBorder: (state, action) => {
        state.name = action.payload
    },
    changeName: (state, action) => {
        state.name = action.payload
    },
    setStep1: (state, action) => {
        console.log('store ',action.payload)
        state.size = action.payload.values.size
        state.dough = action.payload.values.dough
        state.border = action.payload.values.border
    },
    setFlavors: (state, action) => {
        state.flavors = action.payload
    },
    cleanState: state => {
        console.log('state',state)
        console.log('initialState',initialState)
        state = initialState
    },
  }
})

export const { increment, decrement, incrementByAmount, changeName, changeSize, changeDough, changeBorder, setStep1, setFlavors, cleanState } = userSlice.actions

export default userSlice.reducer