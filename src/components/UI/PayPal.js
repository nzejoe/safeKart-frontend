import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// store
import { actions as orderActions } from '../../store/order-slice'
import { actions as cartActions } from '../../store/cart-slice'

const PayPal = ({ totalAmount, tax, grandTotal}) => {
  const { order } = useSelector((state) => state.orders);
  const { authUser } = useSelector((state) => state.users);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [error, setError] = useState(false);
  const paypalRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = authUser && authUser.token

  React.useEffect(() => {
      if(!paymentApproved && !error){

          window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  // intent: "CAPTURE",
                  purchase_units: [
                    {
                      // description: "Payment for puchased products",
                      amount: {
                        currency_code: "USD",
                        value: grandTotal,
                      },
                    },
                  ],
                });
              },
              onApprove: async (data, actions) => {
                return actions.order.capture().then((details) => {
                  var transaction = details.purchase_units[0].payments.captures[0];
                  const date = new Date();
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
      
                  const payment_id = transaction.id;
                  const order_number = `${year}${month}${day}${payment_id}`;
      
                  const orderData = {
                    ...order,
                    payment_id: payment_id,
                    payment_method: "PayPal",
                    payment_status: transaction.status,
                    grand_total: parseFloat(transaction.amount.value),
                    order_number: order_number,
                    total_amount: totalAmount,
                    tax: parseFloat(tax),
                  };
                  setPaymentApproved(true)
                  dispatch(orderActions.saveOrder(orderData));
                  
                  const sendData = async() => {
      
                      try {
                          const response = await axios({
                            url: "/orders/place_order/",
                            method: "POST",
                            headers:{
                                "Content-type": "application/json",
                                Authorization: `token ${token}`
                            },
                            data: orderData,
                          })
                          if(response.status === 200){
                              dispatch(cartActions.refreshCart());
                              navigate('/order_confirmed/', {replace: true});
                              console.log("data send")
                          }
                      } catch (error) {
                        console.log(error);
                      }
                  }

                  sendData();
      
                });
              },
              onError: (err) => {
                //   setError(err),
                setError(true);
                console.error(err);
              },
            })
            .render(paypalRef.current);
      }

  }, [dispatch, order, totalAmount, grandTotal, tax, error, paymentApproved, navigate, token]);

  return (
    <div style={{position: 'relative', zIndex: '0'}}>
        {   
            !error && !paymentApproved &&
            <div ref={paypalRef}></div>
        }
        {
            !error && paymentApproved &&
            <h4>Your payment has been approved.</h4>
        }
        {
            error &&
            <div>
                <h4>Your payment did not go through. Please try again later!</h4>
            </div>
        }
    </div>
  );
};

export default PayPal;
