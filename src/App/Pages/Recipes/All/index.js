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

@requireRole(['admin'])

@withGraphQL(gql`query getAcceptedRecipes{
  getAcceptedRecipes{
    _id
    title
  }
}`)

@withMessage
@withMutation(gql`mutation deleteRecipe($_id: ID!){
  deleteRecipe(_id: $_id)
}`)

export default class All extends React.Component {

  static propTypes = {
    getAcceptedRecipes: React.PropTypes.func,
    deleteRecipe: React.PropTypes.func
  }

  @autobind
  async renderDelete (variable) {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.deleteRecipe({_id: variable})
      window.location.href = '../recipes/all'
      window.alert('Recipe deleted')
    } catch (error) {
      setGraphQLErrors(this, error)
    }
  }

  renderRecipes () {
    const {getAcceptedRecipes} = this.props
    return getAcceptedRecipes.map(recipe => {
      return (
        <div key={recipe._id} >
            <table className={styles.table}>
              <tr className={styles.tr}>
                <td className={styles.td}>{recipe._id}</td>
                <td className={styles.td}>{recipe.title}</td>
                <td className={styles.td}><Button to={`/recipes/onerecipe/${recipe._id}`} label='View'/></td>
                <td className={styles.td}><Button label='Delete' onClick={() => this.renderDelete(recipe._id)}/></td>
              </tr>
          </table>
          </div>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <h2>Accepted recipes</h2>
        <table className={styles.table}>
          <tr className={styles.tr}>
            <th className={styles.th}>Recipe ID</th>
            <th className={styles.th}>Recipe title</th>
            <th className={styles.th}>View recipe</th>
            <th className={styles.th}>Delete recipe</th>
          </tr>
      </table>
        {this.renderRecipes()}
      </div>
    )
  }

}
