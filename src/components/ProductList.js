import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, setCurrentPage } from '../redux/productSlice';

const ProductList = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { items, loading, error, currentPage, searchTerm } = useSelector((state) => state.products);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const response = await axios.get('https://dummyjson.com/products', {
          params: {
            category: selectedCategory,
            limit: itemsPerPage,
            skip: (currentPage - 1) * itemsPerPage,
          },
        });
        dispatch(fetchProductsSuccess({ products: response.data.products, total: response.data.total }));
      } catch (err) {
        dispatch(fetchProductsFailure(err.message));
      }
    };

    fetchProducts();
  }, [dispatch, selectedCategory, currentPage]);

  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))
      ) : (
        <div>No products found.</div>
      )}
      <div>
        <button 
        style={{ backgroundColor: 'skyblue', color: 'white', padding: '10px', margin: '5px', border: 'none', borderRadius: '5px' }}
        onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}>
          Previous
        </button>
        <button 
        style={{ backgroundColor: 'skyblue', color: 'white', padding: '10px', margin: '5px', border: 'none', borderRadius: '5px' }}
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
