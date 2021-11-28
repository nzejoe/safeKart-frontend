import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { NotFound } from '.';
// ui
import { getOrderDateTime } from '../../utils';

const OrderDetailPage = () => {
  const { authUser } = useSelector(state => state.users);
  const [order, setOrder] = useState(null);
  document.title = `${order && 'Order-'+order.order_number} | SafeKart`
  
  const { order_number} = useParams();

  const getOrder = useCallback( async()=>{
    const token = authUser && authUser.token;

    try {
      const response = await axios({
        url: `/orders/${order_number}/`,
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (response.status === 200) {
        setOrder(response.data);
      }
    } catch (err) {
      const error = { ...err };
      console.log(error);
      setOrder(null)
    }

  }, [authUser, order_number]);

  useEffect(()=>{
    getOrder()
  }, [getOrder])


    return (
      <section className={`section `}>
        <div className="section__wrapper">
          {order ? (
            <div>
              <h4>Order detail</h4>
              <div>
                <h5>Order - {order.order_number}</h5>
              </div>
              <div>
                <p>
                  Date: <span>{getOrderDateTime(order.created)}</span>
                </p>
              </div>
              <div>
                <h5>Personal information</h5>
                <p>
                  Name:{" "}
                  <span>{`${order.first_name} ${order.middle_name} ${order.last_name}`}</span>
                </p>
                <p>
                  Email: <span>{`${order.email}`}</span>
                </p>
                <p>
                  Phone: <span>{`${order.phone}`}</span>
                </p>
                <p>
                  Shipping Address:{" "}
                  <span>{`${order.address_1} ${order.address_2}, ${order.city}, ${order.state}, ${order.country}`}</span>
                </p>
              </div>
              <div>
                <h4>Products</h4>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product name</th>
                      <th>Unit price</th>
                      <th>Quantity</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.products.map((product) => {
                      return (
                        <tr key={product.id}>
                          <td>
                            {order.products.indexOf(product) + 1}
                          </td>
                          <td>
                            <span>{product.product_name}</span>
                          </td>
                          <td>
                            $<span>{product.price}</span>
                          </td>
                          <td>
                            <span>{product.quantity}</span>
                          </td>
                          <td>
                            $<span>{product.total_amount}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <th>Subtotal:</th>
                      <td>
                        $<span>{order.total_amount}</span>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <th>Tax:</th>
                      <td>
                        $<span>{order.tax}</span>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <th>Grand total:</th>
                      <td>
                        $<span>{order.grand_total}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <NotFound />
          )}
        </div>
      </section>
    );
}

export default OrderDetailPage;
