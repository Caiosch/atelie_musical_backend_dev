import React, { useEffect } from "react";
import { loadScript } from "@paypal/paypal-js";
import { apiClient } from "@/services/clients/api";
import { OrderResponseBody } from "@paypal/paypal-js/types/apis/orders";

interface CallbackProps {
  data: OrderResponseBody;
}

interface PaypalPaymentProps {
  price: string;
  onPaymentSuccess?: (order: CallbackProps) => void;
}

const PaypalPayment: React.FC<PaypalPaymentProps> = ({
  price,
  onPaymentSuccess,
}) => {
  useEffect(() => {
    document.querySelector("#paypal-payment")!.innerHTML = "";
    loadScript({
      "client-id":
        "AT41buFw_DNJBDhsTrBF2KpXCAouQPNfMew477aHTXx9lDKbH6wLoWK2mbiisDZfDw7TQnDeVNujSOCP",
      currency: "BRL",
    }).then(async (paypal) => {
      paypal
        ?.Buttons?.({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: price,
                    currency_code: "BRL",
                  },
                },
              ],
            });
          },
          // Finalize the transaction after payer approval
          onApprove: async (data, actions) => {
            return actions.order?.capture().then(async (orderData) => {
              onPaymentSuccess?.({
                data: orderData,
              });
            });
          },
        })
        .render("#paypal-payment");
    });
  }, []);

  return (
    <>
      <div id="paypal-payment"></div>
    </>
  );
};

export default PaypalPayment;
