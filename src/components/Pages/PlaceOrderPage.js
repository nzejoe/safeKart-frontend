import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// ui
import PayPal from '../UI/PayPal';

//utils
import { getTotalAmount } from '../../utils';

const PlaceOrderPage = () => {
    const { cartList } = useSelector(state => state.carts);
    const { order } = useSelector(state => state.orders);
    const [makePayment, setMakePament] = useState(false);

    const tax = ((2 / 100) * getTotalAmount(cartList)).toFixed(2);
    const totalAmount = getTotalAmount(cartList);
    const grandTotal = parseFloat(tax) + totalAmount;
    
     console.log(order);

    // warning user of losing data if they refresh the browser
    useEffect(()=>{
        window.onbeforeunload = function (e) {
        return "Are you sure you want to leave? You are in the middle of something.";
        };

        return ()=> window.onbeforeunload = null
    },[])

    const handleMakePayment = () => {
      setMakePament(true)
    };
    

    return (
      <section className={`section `}>
        <div className="section__wrapper">
          {order ? (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h2>Review your order and make paymant</h2>
                <div>
                  <h4>Billing Adress</h4>
                  <p>
                    {order.first_name} {order.middle_name} {""}{" "}
                    {order.last_name}
                  </p>
                  <p>{order.email}</p>
                  <p>{order.address_1}</p>
                  <p>{order.address_2}</p>
                  <p>{order.city}</p>
                  <p>{order.state}</p>
                  <p>{order.country}</p>
                  <p>{order.phone}</p>
                </div>
                <div>
                  <h4>Review products</h4>
                  {cartList &&
                    cartList.map((item) => {
                      const { product, variation } = item;
                      return (
                        <div
                          style={{
                            display: "flex",
                            border: "1px solid rgba(0, 0, 0, .1)",
                            marginBottom: "1rem",
                            padding: "2rem",
                          }}
                          key={item.id}
                        >
                          <div className="cart__item_img">
                            <img
                              src={`http://localhost:8000${product.image}`}
                              alt={product.product_name}
                              style={{ width: "200px" }}
                            />
                          </div>
                          <div>
                            <h4>{product.product_name}</h4>
                            {variation.color && <p>color: {variation.color}</p>}
                            {variation.size && <p>size: {variation.size}</p>}
                            {variation.brand && <p>brand: {variation.brand}</p>}
                            <p>price: $ {product.price}</p>
                            <p>quantity: {item.quantity}</p>
                            <p>amount: $ {item.total_amount}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div style={{ width: "20rem" }}>
                <h4>Cost of order</h4>
                <p>
                  Total amount: $<span>{totalAmount}</span>
                </p>
                <p>
                  Tax: $<span>{tax}</span>
                </p>
                <p>
                  Grand total: $<span>{grandTotal}</span>
                </p>
                <div>
                  {makePayment ? <PayPal totalAmount={totalAmount} grandTotal={grandTotal} tax={tax}/>
                    :
                  <button type="button" onClick={handleMakePayment}>make payment</button>
                  }
                </div>
              </div>
            </div>
          ) : (
            <Navigate replace to="/carts/" />
          )}
        </div>
      </section>
    );
}

export default PlaceOrderPage;
