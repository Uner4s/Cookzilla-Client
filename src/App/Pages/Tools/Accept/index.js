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

// Show Pending Tools
@withGraphQL(gql`query pendingTools{
  pendingTools{
    _id
    name
  }
}`)
// Accept Tool
@withMessage
@withMutation(gql`mutation stateTool($_id: ID!){
  stateTool(_id: $_id){
    _id
    state
  }
}`)
// Reject Tool
@withMessage
@withMutation(gql`mutation deleteTool($_id: ID!){
  deleteTool(_id: $_id)
}`)

export default class Accept extends React.Component {

  static propTypes = {
    pendingTools: React.PropTypes.func,
    stateTool: React.PropTypes.func,
    showMessage: React.PropTypes.func,
    deleteTool: React.PropTypes.func
  }
  // Render
  state = {}
  @autobind
  renderAccept (variable) {
    try {
      console.log(variable)
      // Una vez que esta función se ejecute haz algo
      this.props.stateTool({_id: variable})
      window.location.href = '../tools/accept'
      window.alert('Tool added')
    } catch (error) {
      setGraphQLErrors(this, error)
    }

  }
  state = {}
  @autobind
  renderReject (variable) {
    try {
      console.log(variable)
      // Una vez que esta función se ejecute haz algo
      this.props.deleteTool({_id: variable})
      window.location.href = '../tools/accept'
      window.alert('Tool deleted')
    } catch (error) {
      setGraphQLErrors(this, error)
    }

  }

  @autobind
  renderPending () { // crear una función para luego llamarla y asi no llenar de codigo el return del render
    const {pendingTools} = this.props
    return pendingTools.map(tool => {
      return (
        <div key={tool._id} className='row' >
          <div className='col-xs-6'>
            {tool._id}
          </div>
          <div className='col-xs-6'>
            {tool.name}
            <Button className='col-xs-6' label='Accept' onClick={() => this.renderAccept(tool._id) }/>
            <Button className='col-xs-6' label='Reject' onClick={() => this.renderReject(tool._id) }/>
          </div>
        </div>
      )
    })
  }
  render () {
    return (
      <div className={styles.container}>
        <h2>Tools</h2>
        <div className='row'>
          <div className='col-xs-6'>
            <h3>ID</h3>
          </div>
          <div className='col-xs-6'>
            <h3>Name</h3>
          </div>
        </div>
        {this.renderPending()}
      </div>
    )
  }

}
