import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'

@withGraphQL(gql`query getAcceptedIngredients{
  getAcceptedIngredients{
    _id
    name
  }
}`)

export default class Main extends React.Component {

  static propTypes = {
    getAcceptedIngredients: React.PropTypes.func
  }

  renderIngredients () {
    const {getAcceptedIngredients} = this.props
    console.log({getAcceptedIngredients})
    return getAcceptedIngredients.map(ingredient => {
      return (
        <div key={ingredient._id} className='row'>
          <div className ='col-xs-12 col-sm-12'>
            {ingredient.name}
          </div>
        </div>
      )
    })
  }
  render () {
    console.log(this)
    return (
      <div className={styles.container}>
        {this.renderIngredients()}
        <Button to ='/ingredients/create' primary label='Create Ingredient'/>
        <Button to ='/ingredients/delete' primary label='Delete Ingredient'/>
      </div>
    )
  }
}
