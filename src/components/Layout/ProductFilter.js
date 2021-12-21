import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// store
import { actions as productActions } from "../../store/product-slice";
// utils
import { getUniqueValues, getUniqueCategory, getMaxPrice } from "../../utils";

const ProductFilter = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [query, setQuery] = useState("");
  const [selectedColor, setColor] = useState("all");
  const [selectedBrand, setBrand] = useState("all");
  const [selectedCategory, setCategory] = useState("all");
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();

  const colors = getUniqueValues(allProducts, "colors");
  const brands = getUniqueValues(allProducts, "brand");
  const categories = getUniqueCategory(allProducts);

  useEffect(() => {
    dispatch(productActions.searchFilter(query));
  }, [query, dispatch]);

  useEffect(() => {
    setPrice(getMaxPrice(allProducts));
  }, [allProducts]);

  const onSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const filterByColor = (e) => {
    const color = e.target.dataset.color;
    setColor(color);
    dispatch(productActions.colorFilter(color));
  };

  const filterByBrand = (e) => {
    const brand = e.target.value;
    setBrand(brand);
    dispatch(productActions.brandFilter(brand));
  };

  const filterByCategory = (e) => {
    const category = e.target.dataset.category;
    setCategory(category);
    dispatch(productActions.categoryFilter(category));
  };

  const filterByPrice = (e) => {
    setPrice(e.target.value);
    dispatch(productActions.priceFilter(price));
  };

  const clearFilter = (e) => {
    setQuery("");
    setColor("all");
    setBrand("all");
    setCategory("all");
    setPrice(getMaxPrice(allProducts));
    dispatch(productActions.clearFilter());
  };

  return (
    <aside className="filter">
      <div>
        <input
          type="search"
          placeholder="search"
          value={query}
          onChange={onSearchChange}
        />
      </div>
      <div>
        <h4>Category</h4>
        {categories.map((category) => {
          return (
            <button
              data-category={category}
              key={categories.indexOf(category)}
              onClick={filterByCategory}
              className={`${selectedCategory === category && "active"}`}
            >
              {category}
            </button>
          );
        })}
      </div>
      <div>
        <h4>Colors</h4>
        {colors.map((color) => {
          return (
            <button
              data-color={color}
              key={colors.indexOf(color)}
              onClick={filterByColor}
              className={`${selectedColor === color && "active"}`}
            >
              {color}
            </button>
          );
        })}
      </div>
      <div>
        <h4>Brands</h4>
        <select name="" id="" onChange={filterByBrand} value={selectedBrand}>
          {brands.map((brand) => {
            return (
              <option
                data-brand={brand}
                key={brands.indexOf(brand)}
                className={`${selectedBrand === brand && "active"}`}
              >
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <h4>Price</h4>
        <p>
          $<span>{price}</span>
        </p>
        <input
          type="range"
          min="0"
          max={getMaxPrice(allProducts)}
          step="1"
          onChange={filterByPrice}
          value={price}
        />
      </div>
      <div>
        <button onClick={clearFilter}>clear filter</button>
      </div>
    </aside>
  );
};

export default ProductFilter;
