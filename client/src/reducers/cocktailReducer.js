import {
  FETCH_COCKTAIL,
  FETCH_COCKTAILS,
  CREATE_COCKTAIL,
  EDIT_COCKTAIL,
  DELETE_COCKTAIL,
  DELETE_COCKTAILS,
  CLEAR_COCKTAILS,
  LOADING_COCKTAILS,
  FAIL_FETCH_COCKTAILS
} from '../actions/types';

const initialState = {
  cocktails: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COCKTAILS:
      return {
        ...initialState,
        // maps array into object
        cocktails: action.payload.reduce((newState, cocktail) => ({ ...newState, [cocktail._id]: cocktail }), {}),
        loading: false
      }
    case LOADING_COCKTAILS:
      return {
        ...state,
        loading: true
      }
    case FAIL_FETCH_COCKTAILS:
      return {
        ...state,
        loading: false
      }
    case CREATE_COCKTAIL:
      return {
        ...state,
        cocktails: { [action.payload._id]: action.payload }
      };
    case FETCH_COCKTAIL:
      return {
        ...state,
        cocktails: { [action.payload._id]: action.payload }
      };
    case EDIT_COCKTAIL:
      return {
        ...state,
        cocktails: { [action.payload._id]: action.payload }
      };
    case DELETE_COCKTAIL:
      // Key Interpolation Syntax, square brackets as we can't hard code key
      // destructure cocktails object from state
      const { cocktails: cocktailsContents, ...stateRemains } = state;
      // destructure out removed cocktail
      const { [action.payload]: removedCocktail, ...remainingCocktails } = cocktailsContents;
      // merge back together
      const newState = { ...stateRemains, cocktails: remainingCocktails };
      return newState
    case CLEAR_COCKTAILS:
    case DELETE_COCKTAILS:
      return { ...initialState };
    default:
      return state;
  }
}