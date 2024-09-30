import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, setSearchTerm } from './redux/productSlice';
import ProductList from './components/ProductList';
import CategorySelector from './components/CategorySelector';
import './styles.css';

const App = () => {
  const dispatch = useDispatch();
  const { selectedCategory, searchTerm } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const response = await axios.get('https://dummyjson.com/products', {
          params: {
            category: selectedCategory,
            limit: 10,
            skip: 0, // For initial fetch
          },
        });
        dispatch(fetchProductsSuccess({ products: response.data.products, total: response.data.total }));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message));
      }
    };

    fetchProducts();
  }, [dispatch, selectedCategory]);

  return (
    <div className="App">
      <h1>Product Catalog</h1>
      <CategorySelector />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <ProductList selectedCategory={selectedCategory} />
    </div>
  );
};

export default App;

// Limitations:

// 1. Pagination & Data Fetching:
// The app uses batch fetching (10 products at a time), but the current setup lacks 
// infinite scrolling or a "Load More" button. This can be an issue with large datasets
// where users might not realize more data is being fetched. A smoother way to handle 
// data fetching could improve UX significantly.

// 2. State Management & Caching:
// While Redux is used for state management, the app does not cache the fetched product 
// data. This means that even if users have already viewed certain products, they will 
// be fetched again when navigating between categories or reloading the page, increasing 
// the API load unnecessarily. Implementing local caching or persistency can improve performance.

// 3. Search Functionality:
// The search function only works on the currently fetched batch of products. This can 
// be confusing for users who expect to search the entire product catalog, not just 
// what's loaded on the page. Search functionality should be expanded to query the API 
// directly for a more comprehensive experience.

// 4. Error Handling & User Feedback:
// The app currently lacks robust error handling and user notifications. If the API fails 
// or there is a network issue, the user will not be notified. A user-friendly error message 
// or retry option should be implemented for better UX.

// 5. Performance Optimization:
// For larger product catalogs, the app might slow down due to the lack of optimizations 
// like virtualized lists, which only render visible items. As the catalog grows, rendering 
// hundreds of products at once can impact performance. Implementing virtualized rendering 
// or a more efficient data loading strategy could improve performance.

// 6. UI/UX Enhancements:
// The UI is basic, with no feedback mechanisms like loading spinners or skeleton loaders 
// during product fetching or state changes (e.g., category selection). These can enhance 
// the user experience by providing more interactivity and feedback during actions.
