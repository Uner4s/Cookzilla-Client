import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import {Form, Field} from 'simple-react-form'
import Button from 'orionsoft-parts/lib/components/Button'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'
import withMutation from 'react-apollo-decorators/lib/withMutation'

@withGraphQL(gql`query pendingIngredients{
  pendingIngredients{
    _id
    name
  }
}`)

@withMessage
@withMutation(gql`mutation stateIngredient($_id: ID!){
  stateIngredient(_id: $_id){
    state
  }
}`)

export default class Accept extends React.Component {

  static propTypes = {
    pendingIngredients: React.PropTypes.func,
    stateIngredient: React.PropTypes.func
  }
  // Render
  async renderAccept (){
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.stateIngredient(this.state)
      //window.location.href = '../tools'
      //window.alert('Tool added')
    } catch (error) {
      setGraphQLErrors(this, error)
    }

  }

  renderPending () { // crear una función para luego llamarla y asi no llenar de codigo el return del render
    const {pendingIngredients} = this.props
    return pendingIngredients.map(tool => {
      return (
        console.log(tool._id),
        <div key={tool._id} className='row' >
          <div className='col-xs-12 col-sm-12'>
            {tool.name}

            <Button label='Save' onClick={() => this.renderAccept()}/>
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
