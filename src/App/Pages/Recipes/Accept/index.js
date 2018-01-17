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
import PropTypes from 'prop-types'

@requireRole(['moderator'])
// Pending Recipes to Accept
@withGraphQL(gql`
  query pendingRecipes {
    pendingRecipes {
      _id
      title
    }
  }
`)
// Accept Recipe
@withMessage
@withMutation(gql`
  mutation stateRecipe($_id: ID!) {
    stateRecipe(_id: $_id) {
      state
    }
  }
`)
// Reject Recipe
@withMessage
@withMutation(gql`
  mutation deleteRecipe($_id: ID!) {
    deleteRecipe(_id: $_id)
  }
`)
export default class Accept extends React.Component {
  static propTypes = {
    pendingRecipes: PropTypes.func,
    stateRecipe: PropTypes.func,
    showMessage: PropTypes.func,
    deleteRecipe: PropTypes.func
  }

  // Render
  @autobind
  async renderAccept(variable) {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.stateRecipe({ _id: variable })
      window.location.href = '../recipes/accept'
      window.alert('Recipe added')
    } catch (error) {
      setGraphQLErrors(this, error)
    }
  }
  @autobind
  async renderReject(variable) {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.deleteRecipe({ _id: variable })
      window.location.href = '../recipes/accept'
      window.alert('Recipe deleted')
    } catch (error) {
      setGraphQLErrors(this, error)
    }
  }

  renderPending() {
    const { pendingRecipes } = this.props
    return pendingRecipes.map(recipe => {
      return (
        console.log(recipe._id),
        (
          <div key={recipe._id}>
            <table className={styles.table}>
              <tr className={styles.tr}>
                <td className={styles.td}>{recipe._id}</td>
                <td className={styles.td}>{recipe.title}</td>
                <td className={styles.td}>
                  <Button
                    to={`/recipes/onerecipe/${recipe._id}`}
                    label="View"
                  />
                </td>
                <td className={styles.td}>
                  <Button
                    label="Accept"
                    onClick={() => this.renderAccept(recipe._id)}
                  />
                </td>
                <td className={styles.td}>
                  <Button
                    label="Reject"
                    onClick={() => this.renderReject(recipe._id)}
                  />
                </td>
              </tr>
            </table>
          </div>
        )
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>Pending recipes</h2>
        <table className={styles.table}>
          <tr className={styles.tr}>
            <th className={styles.th}>Recipe ID</th>
            <th className={styles.th}>Recipe title</th>
            <th className={styles.th}>View recipe</th>
            <th className={styles.th}>Accept recipe</th>
            <th className={styles.th}>Delete recipe</th>
          </tr>
        </table>
        {this.renderPending()}
      </div>
    )
  }
}
