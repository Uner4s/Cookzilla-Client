import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
@withGraphQL(gql`query advanceRecipeSearch($ingredients: [String] $tools: [String]){
  advanceRecipeSearch(ingredients: $ingredients tools: $tools){
    title
  }
}`)
export default class ShowRecipes extends React.Component {

  static propTypes = {

  }

  render () {
    console.log(this)
    return (
      <div className={styles.container}>
        ShowRecipes
      </div>
    )
  }

}
