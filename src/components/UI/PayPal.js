import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import { actions as orderActions } from '../../store/order-slice'

const PayPal = ({ totalAmount, tax, grandTotal}) => {
  const { order } = useSelector((state) => state.orders);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [error, setError] = useState(false);
  const paypalRef = useRef();

  const dispatch = useDispatch();

  React.useEffect(() => {
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
            dispatch(orderActions.saveOrder(orderData))

          });
        },
        onError: (err) => {
          //   setError(err),
          setError(true);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [dispatch, order, totalAmount, grandTotal, tax]);

  return (
    <div>
        {
            !error && !paymentApproved &&
            <div ref={paypalRef}></div>
        }
        {
            !error && paymentApproved &&
            <h4>Your payment was approved.</h4>
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
