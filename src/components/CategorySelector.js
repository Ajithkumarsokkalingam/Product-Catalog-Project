import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../redux/productSlice';

const CategorySelector = () => {
  const dispatch = useDispatch();
  const categories = ['All', 'Electronics', 'Clothing', 'Home Appliances'];

  const handleCategoryChange = (event) => {
    dispatch(setSelectedCategory(event.target.value));
  };

  return (
    <select onChange={handleCategoryChange}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;
