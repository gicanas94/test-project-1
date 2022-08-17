// @packages
import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButtonsComponent = () => (
  <PayPalButtons
    createOrder={(data, actions) =>
      actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '2.00',
                },
              },
              value: '2.00',
            },
            description: 'Description',
            items: [
              {
                description: 'Test description',
                name: 'Test name',
                quantity: '2',
                unit_amount: {
                  currency_code: 'USD',
                  value: '1.00',
                },
              },
            ],
          },
        ],
      })
    }
    style={{ layout: 'horizontal' }}
  />
);

export default PayPalButtonsComponent;
