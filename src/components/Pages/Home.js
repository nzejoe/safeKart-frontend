import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  document.title = "Home | SafeKart";
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      navigate(`search?query=${query}`);
    }else{
        navigate('/')
    }
  }, [query, navigate]);
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
        </div>
      </div>
    </section>
  );
};

export default Home;
