import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

   componentDidMount = async () => {
     const fetchCategories = await getCategories();
     this.setState({ categories: fetchCategories });
   }

   render() {
     const { handlerClick } = this.props;
     const { categories } = this.state;
     return (
       <div>
         <p>Categorias: </p>
         <section>
           {categories.map(({ name, id }) => (
             <button
               key={ id }
               type="button"
               data-testid="category"
               onClick={ () => handlerClick(id) }
             >
               { name }

             </button>
           ))}
         </section>
       </div>
     );
   }
}

SideBar.propTypes = {
  handlerClick: PropTypes.func.isRequired,
};
