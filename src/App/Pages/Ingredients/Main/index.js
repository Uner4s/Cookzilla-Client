import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import requireRole from 'orionsoft-parts/lib/decorators/requireRole'

@requireRole(['moderator', 'admin'])

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
          <div className='col-xs-6'>
            {ingredient._id}
          </div>
          <div className='col-xs-6'>
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
        <h2>Ingredients</h2>
        <div className='row'>
          <div className='col-xs-6'>
            <h3>ID</h3>
          </div>
          <div className='col-xs-6'>
            <h3>Name</h3>
          </div>
        </div>
        {this.renderIngredients()} <br></br>
        <div className='row'>
          <Button className='col-xs-6' to ='/ingredients/create' primary label='Create Ingredient'/>
          <Button className='col-xs-6' to ='/ingredients/delete' primary label='Delete Ingredient'/>
        </div>
      </div>
    )
  }
}
