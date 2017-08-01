import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import requireRole from 'orionsoft-parts/lib/decorators/requireRole'

@requireRole(['moderator', 'admin'])

// Crear la funcion getTools para ocupar lata query getTools
@withGraphQL(gql`query getAcceptedTools{
  getAcceptedTools{
    _id
    name
  }
}`)

export default class Main extends React.Component {
  // Validar el componente getTools
  static propTypes = {
    getAcceptedTools: React.PropTypes.func
  }
  // Render
  renderTools () {
    const {getAcceptedTools} = this.props
    return getAcceptedTools.map(tool => {
      return (
        <div key={tool._id}>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <td className={styles.td}>{tool._id}</td>
              <td className={styles.td}>{tool.name}</td>
            </tr>
          </table>
        </div>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <h2>Accepted tools</h2>
        <table className={styles.table}>
          <tr className={styles.tr}>
            <th className={styles.th}>Tool ID</th>
            <th className={styles.th}>Tool name</th>
          </tr>
      </table>
        {this.renderTools()} <br></br>
        <div className="row">
          <div className="col-xs-2">
            <div className="box">
            <Button to='/tools/create' primary label='Create Tool'/>
            </div>
          </div>
          <div className="col-xs-2">
            <div className="box">
            <Button to='/tools/delete' primary label='Delete Tool'/>
           </div>
          </div>
        </div>
        </div>
    )
  }

}
