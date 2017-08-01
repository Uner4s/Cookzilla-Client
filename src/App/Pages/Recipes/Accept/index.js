import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import autobind from 'autobind-decorator'
import requireRole from 'orionsoft-parts/lib/decorators/requireRole'

@requireRole(['moderator'])

// Pending Recipes to Accept
@withGraphQL(gql`query pendingRecipes{
  pendingRecipes{
    _id
    title
  }
}`)

// Accept Recipe
@withMessage
@withMutation(gql`mutation stateRecipe($_id: ID!){
  stateRecipe(_id: $_id){
    state
  }
}`)

// Reject Recipe
@withMessage
@withMutation(gql`mutation deleteRecipe($_id: ID!){
  deleteRecipe(_id: $_id)
}`)

export default class Accept extends React.Component {

  static propTypes = {
    pendingRecipes: React.PropTypes.func,
    stateRecipe: React.PropTypes.func,
    showMessage: React.PropTypes.func,
    deleteRecipe: React.PropTypes.func
  }

  // Render
  @autobind
  async renderAccept (variable) {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.stateRecipe({_id: variable})
      window.location.href = '../recipes/accept'
      window.alert('Recipe added')
    } catch (error) {
      setGraphQLErrors(this, error)
    }

  }
  @autobind
  async renderReject (variable) {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.deleteRecipe({_id: variable})
      window.location.href = '../recipes/accept'
      window.alert('Recipe deleted')
    } catch (error) {
      setGraphQLErrors(this, error)
    }

  }

  renderPending () {
    const {pendingRecipes} = this.props
    return pendingRecipes.map(recipe => {
      return (
        console.log(recipe._id),
        <div key={recipe._id} className='row' >
          <div className='col-xs-6'>
            {recipe._id}
          </div>
            <div className='col-xs-6'>
              {recipe.title}
              <Button className='col-xs-6' to={`/recipes/onerecipe/${recipe._id}`} label='View'/>
              <Button className='col-xs-6' label='Accept' onClick={() => this.renderAccept(recipe._id)}/>
              <Button className='col-xs-6' label='Reject' onClick={() => this.renderReject(recipe._id)}/>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <h2>Pending recipes</h2>
        <div className='row'>
          <div className='col-xs-6'>
            <h3>ID</h3>
          </div>
          <div className='col-xs-6'>
            <h3>Title</h3>
          </div>
        </div>
        {this.renderPending()}
      </div>
    )
  }

}
