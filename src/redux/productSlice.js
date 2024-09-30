import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalProducts: 0,
    selectedCategory: null,
    searchTerm: '',
  },
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
    },
    fetchProductsSuccess(state, action) {
      state.items = action.payload.products;
      state.totalProducts = action.payload.total;
      state.loading = false;
    },
    fetchProductsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setCurrentPage,
  setSelectedCategory,
  setSearchTerm,
} = productSlice.actions;

export default productSlice.reducer;
