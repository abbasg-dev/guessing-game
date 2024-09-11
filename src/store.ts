import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface representing the shape of the state in the Redux store.
export interface CounterState {
  userName: string;
  balance: number;
  generatedValue: number;
  speed: number;
  animShow: boolean;
  usersRanking: any[];
}

// Initial state for the Redux store.
const initialState: CounterState = {
  userName: "",
  balance: 1000,
  generatedValue: 0,
  speed: 0,
  animShow: false,
  usersRanking: [],
};

// Redux slice for managing the state of the application.
export const reduxStore = createSlice({
  name: "reduxStore",
  initialState,
  reducers: {
    /**
     * Sets the user name in the state.
     * @param state - The current state.
     * @param action - The action containing the new user name.
     */
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    /**
     * Sets the generated value and shows animation.
     * @param state - The current state.
     * @param action - The action containing the generated value.
     */
    generateVal: (state, action: PayloadAction<number>) => {
      state.animShow = true;
      state.generatedValue = action.payload;
    },
    /**
     * Updates the speed value in the state.
     * @param state - The current state.
     * @param action - The action containing the new speed value.
     */
    speedStateVal: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    /**
     * Updates the animation state.
     * @param state - The current state.
     * @param action - The action containing the new animation state (boolean).
     */
    animStateVal: (state, action: PayloadAction<boolean>) => {
      state.animShow = action.payload;
    },
    /**
     * Updates the user's balance in the state.
     * @param state - The current state.
     * @param action - The action containing the new balance value.
     */
    updateBalanceVal: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    /**
     * Sets the users' ranking list.
     * @param state - The current state.
     * @param action - The action containing the new users ranking list.
     */
    setUsersRanking: (state, action: PayloadAction<any[]>) => {
      state.usersRanking = action.payload;
    },
  },
});
export const {
  setUserName,
  generateVal,
  speedStateVal,
  animStateVal,
  updateBalanceVal,
  setUsersRanking,
} = reduxStore.actions;
export default reduxStore.reducer;
