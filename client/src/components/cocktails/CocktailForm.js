import React from 'react';
import PropTypes from 'prop-types';
// Field is a component, reduxForm is like the connect function
import { Field, FieldArray, reduxForm } from 'redux-form';

class CocktailForm extends React.Component {

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )
    }
  }

  // here we are destructuring the props that were sent through the form's component property
  renderField = ({ input, meta, label, id, placeholder, required, list, extra, classNm }) => {
    const divClass = (classNm) ? `form-group ${classNm}` : `form-group`;
    return (
      <div className={divClass}>
        <label>{label}
          <input {...input} type="text" className="form-control" id={id} placeholder={placeholder} required={required} list={list} autoComplete="off" />
        </label>
        {this.renderError(meta)}
        {extra && extra}
      </div>
    );
  }

  renderIngredients = ({ fields }) => {
    return (
      <div className="IngredientDiv px-0">
        <button type="button" className="btn btn-secondary mb-3" onClick={() => fields.push({})}>Add Ingredient</button>

        <section className="ingredientsSection">
          {/* map over the fields array, generate inputs for each */}
          {fields.map((ingredient, index) =>
            <div className="form-row" key={index}>
              {/* <Field name={`${ingredient}.name`} type="text" component={"renderField"} label="blah" /> */}
              {/* might do some special magic for the first labels */}
              <Field name={`${ingredient}.ingredient`} component={this.renderField} label={`Ingredient ${index + 1}`} id={`formIngredient${index}`} placeholder="Vodka" classNm="col-auto" />
              <Field name={`${ingredient}.amount`} component={this.renderField} label={`Amount`} id={`formIngredientAmount${index}`} placeholder="30" classNm="col-2" />
              <Field name={`${ingredient}.unit`} component={this.renderField} label={`Unit`} id={`formIngredientUnit${index}`} placeholder="ml" classNm="col-3" />
              <button
                // add align-items: center; to form-row
                type="button"
                title="Remove Ingredient"
                className="btn btn-warning"
                // className="col-1"
                onClick={() => fields.remove(index)}>X</button>
            </div>
          )
          }
        </section>
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      // handleSubmit is provided by ReduxForm, and we pass the onSubmit function
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {/* the <Field/> component connects each input to the store, the component option creates the actual input */}
        {/* when we add a field that form doesn't know about, it will pass it as a prop through the component field */}
        <Field name="name" component={this.renderField} label="Cocktail Name" id="formName" placeholder="Cocktail" required={true} />
        <Field name="glass" component={this.renderField} label="Glass" id="formGlass" placeholder="Glass" extra={null} />
        <Field name="category" component={this.renderField} label="Category" id="formCategory" placeholder="After Dinner" />
        <Field name="garnish" component={this.renderField} label="Garnish" id="formGarnish" placeholder="Lemon Twist" />
        <FieldArray name="ingredients" component={this.renderIngredients} />
        <Field name="preparation" component={this.renderField} label="Preparation" id="formPreparation" placeholder="Shake. Muddle. Strain." />
        <Field name="source" component={this.renderField} label="Source" id="formSource" placeholder="https://imbibemagazine.com/category/recipes/cocktails-spirits-recipes/" />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

// validation function provided through Redux Form, passed through redux form helper function
// runs initially, and then every time a user interacts with the form
const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) {
    errors.name = 'What is your drink called?'
  }

  return errors;
}

CocktailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'cocktailForm',
  validate
})(CocktailForm);