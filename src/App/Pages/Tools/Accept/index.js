import React from 'react'
//import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import autobind from 'autobind-decorator'
import requireRole from 'orionsoft-parts/lib/decorators/requireRole'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};


@requireRole(['moderator'])
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

  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: true,
    height: '300px'
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled
    })
  };

  handleChange = (event) => {
    this.setState({height: event.target.value})
  }

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

  renderTableRows () {
    const {pendingTools} = this.props
    return pendingTools.map((row, index) => {
      return (
        <TableRow key={index}>
          <TableRowColumn>{row.name}</TableRowColumn>
          <TableRowColumn>{row.status}</TableRowColumn>
        </TableRow>
      )
    })
  }
  render () {
    return (
        <div>
          <Table
            height={this.state.height}
            fixedHeader
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}>
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}>
              <TableRow>
                <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}>
              {this.renderTableRows()}
            </TableBody>
          </Table>
        </div>
    )
  }

}
