import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ChatService from '../services/ChatService';

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (channelId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const response = await ChatService.fetchMessages(user, channelId);
    return response;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    selectedChannel: null,
    messages: [],
  },
  reducers: {
    selectChannel(state, action) {
      state.selectedChannel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const { selectChannel } = chatSlice.actions;

export default chatSlice.reducer;
