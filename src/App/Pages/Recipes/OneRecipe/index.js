import React from 'react'
import styles from './styles.css'
import gql from 'graphql-tag'
import Comments from './Comments'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'

@withGraphQL(gql`query oneRecipe($_id: ID!){
  oneRecipe(_id: $_id){
    _id
    title
    dificult
    time
    gloss
    ingredient{name}
    tool{name}
  }
}`)

export default class OneRecipe extends React.Component {

  static propTypes = {
    oneRecipe: React.PropTypes.func
  }

  renderIngredients () {
    const {oneRecipe} = this.props
    return oneRecipe.ingredient.map(ingredient => {
      return (
        <div key={ingredient._id} className='row' >
          <div className='col-xs-12 col-sm-12'>
            {ingredient.name}
          </div>
        </div>
      )
    })
  }

  renderTools () {
    const {oneRecipe} = this.props
    return oneRecipe.tool.map(tool => {
      return (
        <div key={tool._id} className='row' >
          <div className='col-xs-12 col-sm-12'>
            {tool.name}
          </div>
        </div>
      )
    })
  }

  renderRecipe () {
    const {oneRecipe} = this.props
    return (
      <div key={oneRecipe._id} className={styles.recipe} >
        <div className='col-xs-12 col-u sm-12'>
          <h2>Receta: {oneRecipe.title}</h2>
          <h3>Dificultad: {oneRecipe.dificult}</h3>
          <h3>Tiempo: {oneRecipe.time} minutos</h3>
          <h4>Descripción:</h4>
          <p>{oneRecipe.gloss}</p>
          <br /><br />
          <div className='row'>
            <h4 className="col-xs-6" >Tools: <h5>{this.renderTools()}</h5></h4>
            <h4 className="col-xs-6" >Ingredients: <h5>{this.renderIngredients()}</h5></h4>
          </div>
          <Comments recipeId={oneRecipe._id}/>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className={styles.container}>
        {this.renderRecipe()}
      </div>
    )
  }

}
