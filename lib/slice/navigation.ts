import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// [Next.js + TypeScriptのプロジェクトにReduxを導入する](https://qiita.com/keitakn/items/7433c89ce52073e861a1)

export type NavigationState = {
  open: boolean
  subitemOpens: {[key:string]:boolean}
}

export const initialState: NavigationState = {
  open: true,
  subitemOpens: {},
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => ({
      ...state,
      open: action.payload,
    }),
    setSubitemOpens: (state, action: PayloadAction<string>) => ({
      ...state,
      subitemOpens: {
        ...state.subitemOpens,
        [action.payload]:!state.subitemOpens[action.payload]
      },
    }),
  },
})