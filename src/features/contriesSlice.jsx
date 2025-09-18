import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await fetch('https://flagcdn.com/en/codes.json');
    if (!response.ok) {
      throw new Error('Failed to fetch country codes');
    }
    const data = await response.json();
    const items = Object.entries(data).map(([code, name]) => ({
      code: code.toLowerCase(),
      name
    }));

    return items;
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    search: '',
    page: 1,
    perPage: 10
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
      state.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSearch, setPage, setPerPage } = countriesSlice.actions;
export default countriesSlice.reducer;
