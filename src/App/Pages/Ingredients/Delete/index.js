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

@requireRole(['moderator', 'admin'])
@withGraphQL(gql`
  query getAcceptedIngredients {
    getAcceptedIngredients {
      _id
      name
    }
  }
`)
@withMessage
@withMutation(gql`
  mutation deleteIngredient($_id: ID!) {
    deleteIngredient(_id: $_id)
  }
`)
export default class Delete extends React.Component {
  static propTypes = {
    deleteIngredient: PropTypes.func,
    getAcceptedIngredients: PropTypes.func
  }

  @autobind
  async renderDelete(variable) {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.deleteIngredient({ _id: variable })
      window.location.href = '../ingredients'
      window.alert('Ingredient deleted')
    } catch (error) {
      setGraphQLErrors(this, error)
    }
  }

  @autobind
  renderIngredients() {
    const { getAcceptedIngredients } = this.props
    return getAcceptedIngredients.map(ingredient => {
      return (
        <div key={ingredient._id}>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <td className={styles.td}>{ingredient._id}</td>
              <td className={styles.td}>{ingredient.name}</td>
              <td className={styles.td}>
                <Button
                  label="Delete"
                  onClick={() => this.renderDelete(ingredient._id)}
                />
              </td>
            </tr>
          </table>
        </div>
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>Ingredients</h2>
        <table className={styles.table}>
          <tr className={styles.tr}>
            <th className={styles.th}>Ingredient ID</th>
            <th className={styles.th}>Ingredient name</th>
            <th className={styles.th}>Delete ingredient</th>
          </tr>
        </table>
        {this.renderIngredients()}
        <div className="row">
          <div className="col-xs-2">
            <div className="box">
              <Button to="/ingredients" primary label="Ingredients" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
