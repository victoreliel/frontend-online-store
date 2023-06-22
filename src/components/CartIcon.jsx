import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CartIcon extends Component {
  getCartItems = () => JSON.parse(localStorage.getItem('cart_products'));

  render() {
    const { length } = this.getCartItems() || [];
    return (
      <Link
        to="/cart"
        data-testid="shopping-cart-button"
        className="cart"
        id="cartButton"
      >
        <i className="fa-solid fa-cart-shopping" />
        <p data-testid="shopping-cart-size">{ length }</p>
      </Link>
    );
  }
}
