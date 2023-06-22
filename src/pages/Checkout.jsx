import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ErrorMsg from '../components/ErrorMsg';

export default class Checkout extends Component {
  state = {
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    adress: '',
    payment: '',
    errorMsg: false,
    redirect: false,
    products: [],
  }

  componentDidMount() {
    const productSummary = JSON.parse(localStorage.getItem('cart_products')) || [];
    this.setState({ products: productSummary });
  }

  handleChange = ({ target: { name, value } }) => {
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  handleFieldsValidation = () => {
    const { name, email, cpf, phone, cep, adress, payment } = this.state;
    return (name && email && cpf && phone && cep && adress && payment.length > 0);
  }

  handleSubmit = () => {
    const valid = this.handleFieldsValidation();
    if (!valid) {
      this.setState({ errorMsg: true });
    } else {
      this.setState({ errorMsg: false, redirect: true }, () => {
        localStorage.removeItem('cart_products');
      });
    }
  }

  render() {
    const {
      name,
      email,
      cpf,
      phone,
      cep,
      adress,
      errorMsg,
      redirect,
      products,
    } = this.state;

    return (
      <div>
        <div>
          {products.length ? products.map(({ title, id }) => (
            <div key={ id }>
              <p>{title}</p>
            </div>
          )) : <span>Seu carrinho está vazio</span> }
        </div>
        <form>
          <label htmlFor="full-name-input">
            Nome Completo:
            <input
              type="text"
              id="full-name-input"
              data-testid="checkout-fullname"
              onChange={ this.handleChange }
              name="name"
              value={ name }
            />
          </label>

          <label htmlFor="email-input">
            Email:
            <input
              type="email"
              id="email-input"
              data-testid="checkout-email"
              onChange={ this.handleChange }
              name="email"
              value={ email }
            />
          </label>

          <label htmlFor="cpf-input">
            CPF:
            <input
              type="text"
              id="cpf-input"
              data-testid="checkout-cpf"
              onChange={ this.handleChange }
              name="cpf"
              value={ cpf }
            />
          </label>

          <label htmlFor="phone-input">
            Telefone:
            <input
              type="text"
              id="phone-input"
              data-testid="checkout-phone"
              onChange={ this.handleChange }
              name="phone"
              value={ phone }
            />
          </label>

          <label htmlFor="cep-input">
            CEP:
            <input
              type="text"
              id="cep-input"
              data-testid="checkout-cep"
              onChange={ this.handleChange }
              name="cep"
              value={ cep }
            />
          </label>

          <label htmlFor="adress-input">
            Endereço:
            <input
              type="text"
              id="adress-input"
              data-testid="checkout-address"
              onChange={ this.handleChange }
              name="adress"
              value={ adress }
            />
          </label>

          <p>Método de pagamento:</p>

          <label htmlFor="boleto">
            Boleto
            <input
              type="radio"
              name="payment"
              id="boleto"
              data-testid="ticket-payment"
              value="boleto"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="visa">
            Visa
            <input
              type="radio"
              name="payment"
              id="visa"
              data-testid="visa-payment"
              value="visa"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="mastercard">
            MasterCard
            <input
              type="radio"
              name="payment"
              id="mastercard"
              data-testid="master-payment"
              value="mastercard"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="elo">
            Elo
            <input
              type="radio"
              name="payment"
              id="elo"
              data-testid="elo-payment"
              value="elo"
              onChange={ this.handleChange }
            />
          </label>

        </form>
        <button
          type="button"
          data-testid="checkout-btn"
          onClick={ this.handleSubmit }
        >
          Enviar
        </button>
        {errorMsg && <ErrorMsg />}
        {redirect && <Redirect to="/" />}
      </div>
    );
  }
}
