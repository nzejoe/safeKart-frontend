import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import axios from 'axios'

import Product from "../Products/Product";

const Home = () => {
  document.title = "Home | SafeKart";
  const [query, setQuery] = useState("");
  const [topProducts, setTopProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      navigate(`search?query=${query}`);
    }else{
        navigate('/')
    }
  }, [query, navigate]);

  useEffect(()=>{
    const getTopProducts = async() => {
        await axios.get('/products/top_products/')
              .then(res => {
                setTopProducts(res.data)
              })
              .catch(error => console.log(error))
    }

    getTopProducts();
  },[])
  return (
    <section className={`section `}>
      <div className="section__wrapper">
        <div>
          <div>
            <form onSubmit={(e)=> e.preventDefault()}>
              <div>
                <input
                  type="search"
                  id="search"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </div>
            </form>
          </div>
          <Outlet />
          <div>
            <h4> home Page</h4>
          </div>
          <div className="top__products">
            <h3>Top selling products</h3>
            {topProducts.map(product => {
              return <Product product={product} key={product.id} grid={true}/> // set it to grid view
            })}
            <Link to='store'>View all</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
