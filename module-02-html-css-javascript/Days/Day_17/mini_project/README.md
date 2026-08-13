# TeleBirr Loyalty Points Module

This project implements a loyalty points tracking system for a TeleBirr shop using JavaScript closures and higher-order functions.

## How the Balance Stays Private

The `points` variable is declared inside `createLoyalty()` using `let points = 0`. 

Because `points` lives inside `createLoyalty`'s scope and is not attached to the returned object, it cannot be read or modified directly from outside code:

- `card.points` returns `undefined`.
- Trying `card.points = 100` won't change the actual balance.

The inner methods (`earn`, `redeem`, and `balance`) form a **closure** over `points`. They retain access to the variable even after `createLoyalty()` finishes executing, making them the only gateways to update or read the state.

## How to Run

Run the demo script with Node.js:

```bash
node demo.js