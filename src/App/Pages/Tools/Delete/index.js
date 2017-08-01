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

@requireRole(['moderator', 'admin'])
// Accepted Tools
@withGraphQL(gql`query getAcceptedTools{
  getAcceptedTools{
    _id
    name
  }
}`)

// Reject Tool
@withMessage
@withMutation(gql`mutation deleteTool($_id: ID!){
  deleteTool(_id: $_id)
}`)

export default class Delete extends React.Component {

  static propTypes = {
    getAcceptedTools: React.PropTypes.fuc,
    deleteTool: React.PropTypes.fuc,
    showMessage: React.PropTypes.func,
  }

  @autobind
  renderDelete (variable) {
    try {
      console.log(variable)
      // Una vez que esta función se ejecute haz algo
      this.props.deleteTool({_id: variable})
      window.location.href = '../tools'
      window.alert('Tool deleted')
    } catch (error) {
      setGraphQLErrors(this, error)
    }
  }

  @autobind
  renderTools () {
    const {getAcceptedTools} = this.props
    return getAcceptedTools.map(tool => {
      return (
        <div key={tool._id}>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <td className={styles.td}>{tool._id}</td>
              <td className={styles.td}>{tool.name}</td>
              <td className={styles.td}><Button label='Delete' onClick={() => this.renderDelete(tool._id) }/></td>
            </tr>
          </table>
        </div>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <h2>Tools</h2>
        <table className={styles.table}>
          <tr className={styles.tr}>
            <th className={styles.th}>Tool ID</th>
            <th className={styles.th}>Tool name</th>
            <th className={styles.th}>Delete tool</th>
          </tr>
      </table>
        {this.renderTools()}<br></br>
        <div className="row">
          <div className="col-xs-2">
            <div className="box">
            <Button to='/tools' primary label='Tools'/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
