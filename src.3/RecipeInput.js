/* Now start with the boiler plate of my recipe and put by importing react and creating the class as usual. */
/*  */
import React, { Component } from 'react';
import './RecipeInput.css';

class RecipeInput extends Component {
  static defaultProps = {
    onclose() {}
  }

  // Next we'll create a constructor and inside this component we need to keep 
  // state about our form that we're going to create.
  constructor(props) {
    super(props);
    /* So the state we want is the title of the recipe. The instructions for the recipe.
        An array of ingredients that can change and an image for the recipe. Now the fact that the list of 
        ingredients can change we can add more than one ingredient introduce a little bit of complication so 
        we'll see how we'll handle that. */
    this.state = {
      title: '',
      instructions: "",
      ingredients: [''],
      image: ''
    };
    /* Remember the handle change will get a browser or event as a parameter so that there also this method
        will use that state. So we want to bind it to this. We'll do that in the constructor. */
    this.handleChange = this.handleChange.bind(this);
    this.handleNewIngredient = this.handleNewIngredient.bind(this);
    this.handleChangeIng = this.handleChangeIng.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // So let's implement this handle change method because it's something we've already seen.
  handleChange(e) {
    /* Now this is the case where handle change is going to be used by multiple inputs.It would be pretty annoying 
        to have to make a separate handle change for each input so we'll use that trick to use either target that 
        name as our key and that's it for handle change. */
    this.setState({[e.target.name]: e.target.value});
  }
  
  /* Well I want to make my ingredients array in my state grow by 1 so that we show more than one input and
      I'll do that by spreading out the current ingredients array and adding an empty space for the new ingredient
      and that's all our plus button should work now and add an extra input for us. */
  handleNewIngredient(e) {
    const {ingredients} = this.state;
    this.setState({ingredients: [...ingredients, '']});
  }
  
  handleChangeIng(e) {
    const index = Number(e.target.name.split('-')[1]);
    const ingredients = this.state.ingredients.map((ing, i) => (
      i === index ? e.target.value : ing
    ));
    this.setState({ingredients});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave({...this.state});
    this.setState({
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    })
  }

  /* Now let's implement render */
  render() {
    const {title, instructions, img, ingredients} = this.state;
    // So far I've structured all the values from my state.
    const {onclose} = this.props;

    /* Now lets iterate over the ingredients array and create an input for each ingredient.
        So that's the line for our ingredient map. */
        let inputs = ingredients.map((ing, i) => (
      <div
        /* and for any list it's important to remember that we need a key to distinguish the elements. */
        className="recipe-form-line"
        key={`ingredient-${i}`}
        >
        <label>{i+1}.
          <input 
            type="text"
            name={`ingredient-${i}`}
            size={45}
            autoComplete="off"
            placeholder=" Ingredient"
            onChange={this.handleChangeIng} />
        </label>
      </div>
    ));

    return (
      // First of all I've got a container for the whole form and we've got a class that will help style form.
        // Next up is the form itself and we got an on Submit method that we need to implement here.
          // Next we've got a closed button and I want an enclosed method to be passed in as a prop.
      <div className="recipe-form-container">
        <form className="recipe-form" onSubmit={() => {}}>
          <button
            type="button"
            className="close-button"
            onClick={onclose}
          >
            X
          </button>
          <div className="recipe-form-line">
            <label htmlFor="recipe-title-input">Title</label>
            <input
              id="recipe-title-input"
              key="title"
              name="title"
              type="text"
              value={title}
              size={42}
              autoComplete="off"
              onChange={this.handleChange} />
          </div>
          <label
            htmlFor="recipe-instructions-input"
            style={{marginTop: "5px"}}
          >
            Instructions
          </label>
          <textarea
            key="instructions"
            id="recipe-instructions-input"
            type="Instructions"
            name="instructions"
            rows="8"
            cols="50"
            autoComplete="off"
            value={instructions}
            onChange={this.handleChange} />
          {inputs}
          <button
            type="button"
            onClick={this.handleNewIngredient}
            className="buttons"
          >
            +
          </button>
          <div className="recipe-form-line">
            <label htmlFor="recipe-img-input">Image Url</label>
            <input
              id="recipe-img-input"
              name="img"
              type="text"
              value={img}
              size={36}
              autoComplete="off"
              onChange={this.handleChange} />
          </div>
          <button
            type="submit"
            className="buttons"
            style={{alignSelf: "flex-end", marginRight: 0}}
          >
            SAVE
          </button>
        </form>
      </div>
    )
  }
}

export default RecipeInput;