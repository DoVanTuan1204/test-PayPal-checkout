"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalButton2 from "./components/PaypalButton2.jsx";
import { random } from "nanoid";
import { useState } from "react";
const clientId =
  "AZp8TyoLhrm3newhks0hM7UkdMcPYGgUKKY57XyQewwfo8cts53IlQuYzHqP-OjJTZgxEaL8moQG3Xxq";

export default function Home() {
  const [invoice, setInvoice] = useState(
    (Math.random() + 1).toString(36).substring(7)
  );

  // //create invoiceID
  // const invoiceID = () => {
  //   const invoice_id = (Math.random() + 1).toString(36).substring(7);
  //   setInvoice(invoice_id);
  //   console.log(invoice_id);
  //   return invoice_id;
  // };

  //createOrder
  const createOrder = () => {};

  //saveOrder
  const saveOrder = (data, actions) => {
    console.log("data", data);
    console.log("invoice_id", invoice);
    actions.order.capture().then((details) => {
      console.log("details", details);
      if (
        details.purchase_units[0].invoice_id === invoice &&
        details.status === "COMPLETED"
      ) {
        console.log("function save order to DB");
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-10 rounded-sm bg-white">
        <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />
        <div className="flex justify-between mt-2">
          <h1>Johnson</h1>
          <div>500$</div>
        </div>
        <div>
          <PayPalScriptProvider options={{ clientId }}>
            <PayPalButtons
              className="paypal-button"
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      invoice_id: invoice,
                      description: "hehe",
                      amount: {
                        value: 100, // Amount in your currency
                        currency_code: "USD", // Your currency code
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                console.log("Payment approved:", data);
                saveOrder(data, actions);
              }}
              onError={(error) => {
                // Handle errors
                console.error("Error:", error);
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </main>
  );
}
