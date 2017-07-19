import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'

@withGraphQL(gql`query advanceRecipeSearch($ingredients: [SearchIngredient] $tools: [SearchTool]){
  advanceRecipeSearch(ingredients: $ingredients tools: $tools){
    title
  }
}`)
export default class ShowRecipes extends React.Component {

  static propTypes = {
    advanceRecipeSearch: React.PropTypes.func
  }

  //Colocar un key dinamico o resolver distinto
  renderFind () {
    const {advanceRecipeSearch} = this.props
    return advanceRecipeSearch.map(recipe => {
      return (
        console.log(recipe.title),
        <div key={recipe._id} className='row' >
          <div className='col-xs-12 col-sm-12'>
            {recipe.title}
          </div>
        </div>
      )
    })
  }

  render () {
    console.log(this)
    return (
      <div className={styles.container}>
        Titulos
        {this.renderFind()}
      </div>
    )
  }

}
