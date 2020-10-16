import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createCocktail } from '../../actions'
import CocktailForm from './CocktailForm';

class CocktailCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createCocktail(formValues)
  }

  render() {
    return (
      <div>
        <h1>Create a Cocktail</h1>
        <CocktailForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

CocktailCreate.propTypes = {
  createCocktail: PropTypes.func.isRequired
}

export default connect(null, { createCocktail })(CocktailCreate);