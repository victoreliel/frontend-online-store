import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import ErrorMsg from '../components/ErrorMsg';
import CartIcon from '../components/CartIcon';

export default class Item extends Component {
  state = {
    item: {},
    email: '',
    evaluation: 0,
    comment: '',
    total: 0,
    reviews: [],
    errorMsg: false,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const item = await getProductById(id);

    this.setState({ item }, () => {
      const getLocalStorage = JSON.parse(localStorage.getItem(id));
      this.setState({ reviews: getLocalStorage ?? [] });
    });
  }

  handleSubmit = () => {
    const { email, evaluation, comment } = this.state;
    const createReview = {
      email,
      evaluation,
      comment,
    };

    const isValid = this.validateFields(email, evaluation);
    if (!isValid) return;
    this.setState((prev) => ({
      reviews: isValid ? [...prev.reviews, createReview] : [...prev.reviews],
      email: '',
      evaluation: 0,
      comment: '',
      errorMsg: !isValid,
    }), () => {
      const { reviews } = this.state;
      const { match: { params: { id } } } = this.props;
      localStorage.setItem(id, JSON.stringify(reviews));
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleRadio = ({ target: { value } }) => {
    this.setState({ evaluation: value });
  }

  handleItem(product) {
    const products = JSON.parse(localStorage.getItem('cart_products')) || [];
    const actCart = [...products, product];

    localStorage.setItem('cart_products', JSON.stringify(actCart));
    this.setState(({ total }) => ({ total: total + 1 }));
  }

  validateFields = (email, evaluation) => {
    const isFieldsValid = /\S+@\S+.\S+/.test(email) && evaluation > 0;
    this.setState({ errorMsg: !isFieldsValid });
    return isFieldsValid;
  };

  render() {
    const { item, comment, email, reviews, errorMsg, total } = this.state;
    const { title, thumbnail, price } = item;

    return (
      <section>
        <div className="product-banner">
          <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
          <CartIcon />
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.handleItem(item) }
          >
            Adicionar ao carrinho
          </button>
          <div>
            <h3 data-testid="product-detail-name">{title}</h3>
            <p data-testid="product-detail-price">{price}</p>
          </div>

          <span>{`${total} no carrinho`}</span>
        </div>
        <form>
          Avaliações
          <label htmlFor="assessments">
            <input
              data-testid="product-detail-email"
              type="email"
              placeholder="Email"
              value={ email }
              onChange={ this.handleChange }
              name="email"
              required
            />
          </label>

          <label htmlFor="text-product">
            <textarea
              type="text"
              data-testid="product-detail-evaluation"
              placeholder="Mensagem(opcional)"
              value={ comment }
              name="comment"
              onChange={ this.handleChange }
            />
          </label>
          <div className="radio">
            <input
              type="radio"
              value="1"
              onChange={ this.handleRadio }
              name="radio"
              data-testid="1-rating"
            />
            1
          </div>
          <div className="radio">
            <input
              type="radio"
              value="2"
              onChange={ this.handleRadio }
              name="radio"
              data-testid="2-rating"
            />
          </div>
          <div className="radio">
            <input
              type="radio"
              value="3"
              onChange={ this.handleRadio }
              name="radio"
              data-testid="3-rating"
            />
            3
          </div>
          <div className="radio">
            <input
              type="radio"
              value="4"
              onChange={ this.handleRadio }
              name="radio"
              data-testid="4-rating"
            />
            4
          </div>
          <div className="radio">
            <input
              type="radio"
              value="5"
              onChange={ this.handleRadio }
              name="radio"
              data-testid="5-rating"
            />
            5
          </div>
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ this.handleSubmit }
          >
            Avaliar
          </button>
        </form>
        <section className="comments">
          { errorMsg && <ErrorMsg /> }
          <section>
            <h2>Reviews</h2>
            {reviews.map((review, index) => (
              <section key={ index }>
                <h1 data-testid="review-card-email">{review.email}</h1>
                <p data-testid="review-card-evaluation">{review.comment}</p>
                <p data-testid="review-card-rating">{review.evaluation}</p>
              </section>
            ))}
          </section>
        </section>
      </section>
    );
  }
}

Item.propTypes = {
  match: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
}.isRequired;
