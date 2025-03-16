import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    id: 0,
    name: "do",
    email: "do@gmail.com",
    phone: null,
    two_factor_confirmed_at: null,
    role: "user",
    IP: "180.235.116.71 : Mandalay, Myanmar",
    account_status: "enable",
    isOnline: "false",
    email_verified_at: null,
    location: null,
    current_team_id: null,
    profile_photo_path: null,
    created_at: "2025-03-03T11:42:35.000000Z",
    updated_at: "2025-03-03T11:42:35.000000Z",
    firstGift: null,
    profile_photo_url:
      "https://ui-avatars.com/api/?name=d&color=7F9CF5&background=EBF4FF",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Update only provided fields
    },
    clearUser: (state) => {
      state.user = initialState.user; // Reset user to initial state
    },
  },
});
export const { setInitialUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
