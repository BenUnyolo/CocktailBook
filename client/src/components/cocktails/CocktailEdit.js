import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CocktailForm from './CocktailForm';
import { fetchCocktail, editCocktail } from '../../actions';

class CocktailEdit extends React.Component {
  componentDidMount() {
    this.props.fetchCocktail(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editCocktail(this.props.match.params.id, formValues);
  }

  render() {
    // avoids error before component mounts
    if (!this.props.cocktail) {
      return <div>Loading...</div>;
    }

    // function to only pass editable initial values
    const reduceCocktail = (cocktail) => {
      let drink = {};

      if (cocktail.ingredients) {
        drink.ingredients = [];
        cocktail.ingredients.forEach((ingredient, index) => {
          drink.ingredients[index] = { ingredient: ingredient.ingredient || '', amount: ingredient.amount || '', unit: ingredient.unit || '' }
        })
      }

      drink.name = cocktail.name || '';
      drink.glass = cocktail.glass || '';
      drink.category = cocktail.category || '';
      drink.garnish = cocktail.garnish || '';
      drink.preparation = cocktail.preparation || '';
      drink.source = cocktail.source || '';

      return drink;
    }

    return (
      <div>
        <h3>Edit Cocktail</h3>
        <CocktailForm
          // initialValues is provided by redux form
          initialValues={reduceCocktail(this.props.cocktail)}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

CocktailEdit.propTypes = {
  fetchCocktail: PropTypes.func.isRequired,
  editCocktail: PropTypes.func.isRequired,
  cocktail: PropTypes.object.isRequired
}

//  ownProps allows us to get data from the store
const mapStateToProps = (state, ownProps) => {
  return { cocktail: state.cocktails.cocktails[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchCocktail, editCocktail })(CocktailEdit);