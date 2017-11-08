import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import PropTypes from 'prop-types'

@withGraphQL(gql`
  query advanceRecipeSearch(
    $ingredients: [SearchIngredient]
    $tools: [SearchTool]
  ) {
    advanceRecipeSearch(ingredients: $ingredients, tools: $tools) {
      _id
      title
    }
  }
`)
export default class ShowRecipes extends React.Component {
  static propTypes = {
    advanceRecipeSearch: PropTypes.func
  }

  renderFind () {
    const { advanceRecipeSearch } = this.props
    return advanceRecipeSearch.map(recipe => {
      return (
        <div key={recipe._id} className="row">
          <div className="col-xs">
            {recipe.title}{' '}
            <Button to={`/recipes/onerecipe/${recipe._id}`} label="View" />
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <br />
        <h2>Titles of Recipes</h2> <br />
        {this.renderFind()}
      </div>
    )
  }
}
