import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import autobind from 'autobind-decorator'

// Pending Ingredients to Accept
@withGraphQL(gql`query pendingIngredients{
  pendingIngredients{
    _id
    name
  }
}`)

// Accept Ingredient
@withMessage
@withMutation(gql`mutation stateIngredient($_id: ID!){
  stateIngredient(_id: $_id){
    state
  }
}`)

// Reject Ingredient
@withMessage
@withMutation(gql`mutation deleteIngredient($_id: ID!){
  deleteIngredient(_id: $_id)
}`)

export default class Accept extends React.Component {

  static propTypes = {
    pendingIngredients: React.PropTypes.func,
    stateIngredient: React.PropTypes.func,
    showMessage: React.PropTypes.func,
    deleteIngredient: React.PropTypes.func

  }
  // Render
  @autobind
  async renderAccept (variable) {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.stateIngredient({_id: variable})
      window.location.href = '../ingredients/accept'
      window.alert('Ingredient added')
    } catch (error) {
      setGraphQLErrors(this, error)
    }

  }
  @autobind
  async renderReject (variable) {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.deleteIngredient({_id: variable})
      window.location.href = '../ingredients/accept'
      window.alert('Ingredient deleted')
    } catch (error) {
      setGraphQLErrors(this, error)
    }

  }

  renderPending () { // crear una función para luego llamarla y asi no llenar de codigo el return del render
    const {pendingIngredients} = this.props
    return pendingIngredients.map(ingredient => {
      return (
        console.log(ingredient._id),
        <div key={ingredient._id} className='row' >
          <div className='col-xs-12 col-sm-12'>
            {ingredient.name}
            <Button label='Accept' onClick={() => this.renderAccept(ingredient._id)}/>
            <Button label='Reject' onClick={() => this.renderReject(ingredient._id)}/>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        {this.renderPending()}
      </div>
    )
  }

}
