import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Recipe.css';

/* Uitleg aanmaken delete button met functionaliteit. eerst in de render() een button maken voor Delete
    Daarna hebben we id nodig om te weten over welk recept het gaat en natuurlijk moeten we ook nog iets 
    doen als er op geklikt wordt.Maak PropTypes aan in static propTypes id: PropTypes.string.isRequired en 
    onDelete: PropTypes.func.isRequired voeg deze toe aan const in render en voeg onClick event aan in de 
    aangemaakte button. */
class Recipe extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
  }
  
  render() {
    const {title, img, instructions, id, onDelete} = this.props;
    const ingredients = this.props.ingredients.map((ing, index) => (
      <li key={index}>{ing}</li> 
    ));
    return (
      <div className="recipe-card">
        <div className="recipe-card-img">
          <img src={img} alt={title} />
        </div>
        <div className="recipe-card-content">
          <h3 className="recipe-title">{title}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {ingredients}
          </ul>
          <h4>Instructions:</h4>
          <p>{instructions}</p>
          <button type="button" onClick={() => onDelete(id)}>Delete</button>
        </div>
        
      </div>
    );
  }
}

export default Recipe;