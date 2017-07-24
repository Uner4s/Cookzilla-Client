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
      <div key={oneRecipe._id} className='row' >
        <div className='col-xs-12 col-sm-12'>
          {oneRecipe.title} <br />
          {oneRecipe.dificult} <br />
          {oneRecipe.time} <br />
          {oneRecipe.gloss} <br />
          <br /><br />
          Tools:
          {this.renderTools()}
          <br /><br />
          Ingredients: <br />
          {this.renderIngredients()}
          <br /><br />
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
