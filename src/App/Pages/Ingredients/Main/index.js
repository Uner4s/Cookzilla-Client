import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
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
export default class Main extends React.Component {
  static propTypes = {
    getAcceptedIngredients: PropTypes.func
  }

  renderIngredients () {
    const { getAcceptedIngredients } = this.props
    console.log({ getAcceptedIngredients })
    return getAcceptedIngredients.map(ingredient => {
      return (
        <div key={ingredient._id}>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <td className={styles.td}>{ingredient._id}</td>
              <td className={styles.td}>{ingredient.name}</td>
            </tr>
          </table>
        </div>
      )
    })
  }
  render () {
    return (
      <div className={styles.container}>
        <h2>Accepted ingredients</h2>
        <table className={styles.table}>
          <tr className={styles.tr}>
            <th className={styles.th}>Ingredient ID</th>
            <th className={styles.th}>Ingredient name</th>
          </tr>
        </table>
        {this.renderIngredients()} <br />
        <div className="row">
          <div className="col-xs-2">
            <div className="box">
              <Button
                to="/ingredients/create"
                primary
                label="Create ingredient"
              />
            </div>
          </div>
          <div className="col-xs-2">
            <div className="box">
              <Button
                to="/ingredients/delete"
                primary
                label="Delete ingredient"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
