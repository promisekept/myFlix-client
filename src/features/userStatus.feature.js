// import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   status: false,
// // };

// export let statusSlice = createSlice({
//   name: "status",
//   initialState: [0],
//   reducers: {
//     // status: (state) => {
//     //   state.status = true;
//     //   // if (localStorage.getItem("user")) {
//     //   //   state = true;
//     //   // }
//     // },
//     // test: (state) => {
//     //   state;
//     // },
//     test: function (state) {
//       state;
//     },
//   },
// });

// export const { test } = statusSlice.action;
// export default statusSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const userStatus = createSlice({
  name: "test",
  reducers: {
    displayNum: (state) => {
      state.push(state[state.length - 1] + 1);
      console.log(state[state.length - 1]);
    },
  },
});

// export const { displayNum } = userStatus.actions;
export default userStatus.reducer;
