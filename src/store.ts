import * as Circle from './circle'

type State = {
  canvasWidth: number
  canvasHeight: number
  numCircles: number
  minRadius: number
  maxRadius: number
  maxSpeed: number
  circles: Circle.Circle[]
}

export const state: State = {
  canvasWidth: 1366,
  canvasHeight: 768,
  numCircles: 20,
  minRadius: 20,
  maxRadius: 40,
  maxSpeed: 10,
  circles: []
}

// const slice = createSlice({
//   name: 'slice',
//   initialState,
//   reducers: {
//     updateCircles: (state, action: PayloadAction<any>) => {
//       state.circles = [...state.circles, ...action.payload]
//     }
//   }
// })

// export const store = configureStore({
//   reducer: slice.reducer
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

// export const { updateCircles } = slice.actions
