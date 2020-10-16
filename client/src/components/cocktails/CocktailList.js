import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as Bartender } from '../../images/bartender.svg';
import { ReactComponent as Cocktail } from '../../images/cocktail.svg';
import { ReactComponent as Explosion } from '../../images/explosion.svg';

import { fetchCocktails, deleteCocktail } from '../../actions'

import './CocktailList.css';

class CocktailList extends React.Component {

  componentDidMount() {
    this.props.fetchCocktails();
  }

  checkIfField(cocktail, fieldName, key) {
    if (cocktail[fieldName]) {
      return (
        <li className="list-group-item" key={key}>{cocktail[fieldName]}</li>
      )
    }
  }

  renderList() {
    return this.props.cocktails.map(cocktail => {
      return (
        <div className="card" key={cocktail._id}>
          <div className="card-body">
            <h5 className="card-title">{cocktail.name}</h5>
            <ul className="list-group list-group-flush">
              {this.checkIfField(cocktail, 'glass', '0')}
              {this.checkIfField(cocktail, 'category', '1')}
              <li className="list-group-item" key="2">
                <ul>
                  {cocktail.ingredients.map((ing, ind) => <li key={ind}>{ing.amount}{ing.unit} {ing.ingredient} </li>)}
                </ul>
              </li>
              {this.checkIfField(cocktail, 'garnish', '3')}
              {this.checkIfField(cocktail, 'preparation', '4')}
            </ul>
            {cocktail.source && <p className="card-text"><small className="text-muted"><a href={cocktail.source}>Source</a></small></p>}
            {/* <p className="card-text"><small className="text-muted"><a href={`/cocktails/edit/${cocktail._id}`}>Edit</a></small></p> */}
            <Link to={`/cocktails/edit/${cocktail._id}`}><button className="btn btn-primary btn-sm">Edit</button></Link>
            <button onClick={() => { if (window.confirm(`Are you sure you want to delete the cocktail "${cocktail.name}"?`)) { this.props.deleteCocktail(cocktail._id) } }} className="btn btn-primary btn-sm ml-2">Delete</button>
          </div>
        </div>
      )
    })
  }

  renderPage() {
    if (this.props.cocktails.length) {
      return <div>
        <div className="card-columns">
          {this.renderList()}
        </div>
      </div>
      // this is where item loading would be useful, if item loading - cocktails loading. then you have no cocktails.
    } else if (this.props.cocktailsLoading) {
      return <div className="loading-div"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
    } else {
      // https://www.manypixels.co/gallery/?color=68c8fd&page=1&s=drink
      return (
        <>
          <Cocktail className="svg" />
          <div className="text-center">Click 'Add Drink' to create a cocktail.</div>
        </>
      )
    }
  }

  render() {
    return (
      <div>
        {/* only show cards if cocktails in state */}
        {this.renderPage()}
      </div>
    );
  }
}

// typechecking props to catch bugs
CocktailList.propTypes = {
  // `isRequired` makes sure a warning is shown if the prop isn't provided.
  fetchCocktails: PropTypes.func.isRequired,
  deleteCocktail: PropTypes.func.isRequired,
  cocktails: PropTypes.array.isRequired,
  cocktailsLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    // we turn it into an array to make it easier to map over
    // Object.values is a built in JS function that takes an object as an argument and turns the values into an array
    cocktails: Object.values(state.cocktails.cocktails),
    cocktailsLoading: state.cocktails.loading
  }
}

export default connect(mapStateToProps, { fetchCocktails, deleteCocktail })(CocktailList);