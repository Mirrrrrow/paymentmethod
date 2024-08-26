# PaymentMethod - FiveM Script

`PaymentMethod` is a FiveM resource that allows players to select a payment method for each purchase. This script provides an export function, `requestPaymentMethod`, which enables developers to easily integrate customizable payment options into their FiveM servers.

## Features

- Allow players to choose between different payment methods (And cancel).
- Supports both in-game cash and bank account as payment methods.
- Easy integration with existing scripts.

## Installation

1. **Download the resource:**

- Download the newest version from [GitHub](https://github.com/Mirrrrrow/paymentmethod).

2. **Add to your FiveM server:**

- Place the `paymentmethod` folder into your server's `resources` directory.

3. **Update `server.cfg`:**

- Add the following line to your `server.cfg` to ensure the resource starts when your server does:
  ```plaintext
  ensure paymentmethod
  ```

## Usage

You can use the `requestPaymentMethod` export in your scripts to prompt the player for a payment method. Here's how it works:

```lua
local paymentMethod = exports.paymentmethod:requestPaymentMethod(300)
if not paymentMethod then return print('Payment was canceled!') end

print(paymentMethod) -- Either 'money' or 'bank'
TriggerServerEvent('yourEvent:buyItems', paymentMethod, ...)
```
