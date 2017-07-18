import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'
import autobind from 'autobind-decorator'

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
        <div key={recipe._id} className='row' >
          <div className='col-xs-12 col-sm-12'>
            {recipe.name}
          </div>
        </div>
      )
    })
  }

  render () {
    console.log(this)
    return (
      <div className={styles.container}>
        {this.renderFind()}
      </div>
    )
  }

}
