import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setToast } from './toastSlice';

const BASE_URL = 'https://lt.vern.cc';

// Get languages
export const getLanguages = createAsyncThunk(
  'langs/getLanguages',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${BASE_URL}/languages`);

      dispatch(
        setToast({
          message: 'Languages fetched!',
          type: 'info',
          pos: 'topLeft',
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        setToast({ message: error.message, type: 'warning', pos: 'topLeft' })
      );
      return rejectWithValue(error.message);
    }
  }
);

// Text translate
export const textTranslate = createAsyncThunk(
  'translate/textTranslate',
  async (
    { detectCode, translateCode, textareaInput },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/translate`, {
        q: textareaInput,
        source: detectCode,
        target: translateCode,
        format: 'text',
      });
      dispatch(
        setToast({
          message: 'Translation successful!',
          type: 'success',
          pos: 'topRight',
        })
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      dispatch(setToast({ message: error.message, type: 'error' }));
      return rejectWithValue(error.message);
    }
  }
);

const languagesSlice = createSlice({
  name: 'langs',
  initialState: {
    languages: [],
    selectedLanguage: 'Auto', // default | just for display not used functionality
    selectedLanguageCode: 'auto',
    translateDefaultLang: 'English',
    translateDefaultLangCode: 'en',
    isLoading: false,
    error: null,
    errorMsg: null,
    textareaInput: '',
    textareaLength: 0,
    translateData: null,
  },
  reducers: {
    // setSelectedLanguage: (state, action) => {
    //   state.selectedLanguage = action.payload.lang;
    //   state.selectedLanguageCode = action.payload.code;
    // },
    setTranslateLang: (state, action) => {
      state.translateDefaultLang = action.payload.lang;
      state.translateDefaultLangCode = action.payload.code;
    },
    // Detect Textarea input Detect
    setTextareaInput: (state, action) => {
      state.textareaInput = action.payload;
      state.textareaLength = Number(action.payload.length);
    },
    setRandomSelectionLang: (state) => {
      const randomIdx = Math.floor(Math.random() * state.languages.length);
      state.translateDefaultLang = state.languages[randomIdx].name;
      state.translateDefaultLangCode = state.languages[randomIdx].code;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLanguages.pending, (state) => {
        (state.languages = []), (state.isLoading = true), (state.error = null);
        state.errorMsg = null;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.languages = action.payload;
        state.isLoading = false;
        state.error = null;
        state.errorMsg = null;
      })
      .addCase(getLanguages.rejected, (state, action) => {
        state.languages = [];
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      });
    // Translate
    builder
      .addCase(textTranslate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errorMsg = null;
        state.translateData = [];
      })
      .addCase(textTranslate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.errorMsg = null;
        state.translateData = action.payload;
      })
      .addCase(textTranslate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
        state.translateData = [];
      });
  },
});

export const {
  //  setSelectedLanguage,
  setTranslateLang,
  setTextareaInput,
  setRandomSelectionLang,
} = languagesSlice.actions;
export default languagesSlice.reducer;
