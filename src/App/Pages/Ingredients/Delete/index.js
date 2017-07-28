import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import {Form, Field} from 'simple-react-form'
import Button from 'orionsoft-parts/lib/components/Button'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import autobind from 'autobind-decorator'

@withGraphQL(gql`query getAcceptedIngredients{
  getAcceptedIngredients{
    _id
    name
  }
}`)

@withMessage
@withMutation(gql`mutation deleteIngredient($_id: ID!){
  deleteIngredient(_id: $_id)
}`)

export default class Delete extends React.Component {

  static propTypes = {
    deleteIngredient: React.PropTypes.func,
    getAcceptedIngredients: React.PropTypes.func
  }

  @autobind
  async renderDelete (variable) {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.deleteIngredient({_id: variable})
      window.location.href = '../ingredients'
      window.alert('Ingredient deleted')
    } catch (error) {
      setGraphQLErrors(this, error)
    }
  }

  @autobind
  renderIngredients () {
    const {getAcceptedIngredients} = this.props
    return getAcceptedIngredients.map(ingredient => {
      return (
        <div key={ingredient._id} className='row'>
          <div className='col-xs-6'>
            {ingredient._id}
          </div>
          <div className='col-xs-6'>
            {ingredient.name}
            <Button className='col-xs-6' label='Delete' onClick={() => this.renderDelete(ingredient._id) }/>
          </div>
        </div>
      )
    })
  }

  render () {
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
        {this.renderIngredients()}
      </div>
    )
  }

}
