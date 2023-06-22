import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from '../components/Product';
import SideBar from '../components/SideBar';
import CartIcon from '../components/CartIcon';

class Home extends Component {
  state = {
    products: [],
    productName: '',
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ productName: value });
  }

  search = async () => {
    const { productName } = this.state;
    const { results } = await getProductsFromCategoryAndQuery('', productName);

    this.setState({ products: results });
  }

  handlerClick = async (id) => {
    const { results } = await (getProductsFromCategoryAndQuery(id));
    this.setState({ products: results });
  };

  handleCart = (product) => {
    const products = JSON.parse(localStorage.getItem('cart_products')) || [];
    const actCart = [...products, product];

    localStorage.setItem('cart_products', JSON.stringify(actCart));
    this.forceUpdate();
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <CartIcon />

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <SideBar handlerClick={ this.handlerClick } />

        <div className="search_bar">
          <input type="text" onChange={ this.handleChange } data-testid="query-input" />
          <button
            type="button"
            onClick={ this.search }
            data-testid="query-button"
          >
            Buscar
          </button>
        </div>

        <div className="products_box">
          { !products.length ? <span> Nenhum produto foi encontrado </span>
            : products.map((productInfo) => (
              <ProductCard
                key={ productInfo.id }
                product={ productInfo }
                handleCart={ this.handleCart }
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Home;
