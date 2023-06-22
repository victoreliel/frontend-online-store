import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CartProduct extends Component {
 state = {
   inventory: 0,
 }

 async componentDidMount() {
   const { product: { available_quantity: inventory } } = this.props;
   this.setState({ inventory });
 }

 render() {
   const { product, quantity, removeItemUnd, addItem, removeItem } = this.props;
   const { thumbnail, title, id, price } = product;
   const { inventory } = this.state;

   return (
     <div>
       <div className="cart_product-info">
         <img src={ thumbnail } alt={ title } />
         <h2 data-testid="shopping-cart-product-name">{title}</h2>
       </div>

       <div className="qnt-btns">
         <button
           type="button"
           className="minus"
           onClick={ () => removeItemUnd(id) }
           data-testid="product-decrease-quantity"
         >
           -
         </button>

         <p data-testid="shopping-cart-product-quantity">{quantity}</p>
         <button
           type="button"
           onClick={ () => {
             addItem(id);
           } }
           disabled={ quantity >= inventory }
           className="plus"
           data-testid="product-increase-quantity"
         >
           +
         </button>
       </div>

       <p>{price}</p>
       <button
         type="button"
         onClick={ () => removeItem(id) }
         data-testid="remove-product"
       >
         Remover item
       </button>
     </div>
   );
 }
}

CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
}.isRequired;
