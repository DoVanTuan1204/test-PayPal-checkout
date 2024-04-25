import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

const clientId =
  "AZp8TyoLhrm3newhks0hM7UkdMcPYGgUKKY57XyQewwfo8cts53IlQuYzHqP-OjJTZgxEaL8moQG3Xxq";

function PaypalButton2() {
  const createOrder = () => {
    // replace this url with your servers
    return fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
          invoice_id: "00001",
          cart: [
            {
              sku: "1blwyeo8", // idProduct
              quantity: 2, // số lượng
            },
          ],
        }),
      }
    )
      .then((response) => response.json())
      .then((order) => {
        console.log("paypal generate this orderID", order.id);
        // Your code here after create the order
        return order.id;
      });
  };

  function onApprove(data) {
    // replace this url with your server
    console.log("data onApprove", data);
    return fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    )
      .then((response) => response.json())
      .then((orderData) => {
        // Your code here after capture the order
        console.log("data completed", orderData);
      });
  }
  return (
    <div>
      <PayPalScriptProvider options={{ clientId: clientId }}>
        <PayPalButtons
          disabled={false}
          fundingSource={undefined}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default PaypalButton2;
