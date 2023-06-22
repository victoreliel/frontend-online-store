import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class ProductCard extends Component {
  render() {
    const { product, handleCart } = this.props;
    const {
      title,
      price,
      thumbnail,
      id,
      shipping: {
        free_shipping: isShippingFree,
      } } = product;

    return (
      <div className="product" data-testid="product">
        <img src={ thumbnail } alt={ title } />

        <div className="product-info">
          <h3>{title}</h3>
          <p>{`${price} R$`}</p>
        </div>
        {isShippingFree && (
          <div className="free-shipping">
            <i className="fa-solid fa-truck-fast" />
            <p data-testid="free-shipping">frete grátis</p>
          </div>
        )}
        <Link
          to={ `product${id}` }
          type="button"
          onClick={ this.redirect }
          data-testid="product-detail-link"
        >
          Mais informações
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => handleCart(product) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.object,
  handleCart: PropTypes.func,
}.isRequired;
