import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'

@withGraphQL(gql`query advanceRecipeSearch($ingredients: [SearchIngredient] $tools: [SearchTool]){
  advanceRecipeSearch(ingredients: $ingredients tools: $tools){
    _id
    title
  }
}`)
export default class ShowRecipes extends React.Component {

  static propTypes = {
    advanceRecipeSearch: React.PropTypes.func
  }
  renderRecipe (variable) {
    //console.log(variable)//onClick={() => this.renderRecipe(recipe._id)
    //window.location =
  }

  renderFind () {
    const {advanceRecipeSearch} = this.props
    return advanceRecipeSearch.map(recipe => {
      return (
        <div key={recipe._id} className='row' >
          <div className='col-xs-12 col-sm-12'>
            {recipe.title} <Button to= '/recipes/onerecipe' _id={recipe._id} label='View'/>
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
