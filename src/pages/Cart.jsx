import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartProduct from '../components/CartProduct';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
      products: {},
    };
  }

  componentDidMount() {
    const products = JSON.parse(localStorage.getItem('cart_products')) ?? [];
    const singleProducts = products ? products.reduce((arr, product) => (
      arr.every(({ id }) => id !== product.id) ? [...arr, product] : [...arr]
    ), []) : [];
    this.setState({
      cartProducts: singleProducts,
      emptyCart: !products,
    }, () => {
      this.checkIds(products);
    });
  }

  removeItemUnd = (id) => {
    this.setState(({ products }) => (
      { products: {
        ...products,
        [id]: products[id] > 1 ? products[id] - 1 : products[id],
      } }
    ), () => this.checkIds(this.state));
  }

  addItem = (id) => {
    this.setState(({ products }) => (
      { products: { ...products, [id]: products[id] + 1 } }
    ), async () => {
      const { products } = this.state;
      this.checkIds(products);
    });
  }

    removeItem = (id) => {
      this.setState(({ cartProducts }) => ({
        cartProducts: cartProducts.filter((product) => product.id !== id),
      }), () => {
        const { products } = this.state;
        this.checkIds(products);
      });
    }

    checkIds = (products) => {
      const hash = {};
      if (!products.length) return;
      products.forEach((cartProduct) => {
        const { id } = cartProduct;
        if (hash[id]) hash[id] += 1;
        else hash[id] = 1;
      });
      this.setState({ products: hash });
    }

    render() {
      const { products, cartProducts } = this.state;
      return (
        <div>
          {!cartProducts.length ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>)
            : (
              cartProducts.map((product) => (
                <CartProduct
                  key={ product.id }
                  product={ product }
                  quantity={ products[product.id] }
                  removeItemUnd={ this.removeItemUnd }
                  addItem={ this.addItem }
                  removeItem={ this.removeItem }
                />
              ))
            )}
          <Link to="/checkout" data-testid="checkout-products">Finalizar compra</Link>
        </div>
      );
    }
}
