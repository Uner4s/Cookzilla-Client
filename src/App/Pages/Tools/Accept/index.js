import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import ButtonUI from './Button'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import autobind from 'autobind-decorator'
import requireRole from 'orionsoft-parts/lib/decorators/requireRole'
import PropTypes from 'prop-types'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

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
    pendingTools: PropTypes.func,
    stateTool: PropTypes.func,
    showMessage: PropTypes.func,
    deleteTool: PropTypes.func
  }
  // Render

  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    showCheckboxes: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: false,
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
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>{row.name}</TableRowColumn>
          <TableRowColumn>{'Pending'}</TableRowColumn>
          <TableRowColumn><Button className='col-xs-6' label='Accept' onClick={() => this.renderAccept(row._id) }/></TableRowColumn>
          <TableRowColumn> <Button className='col-xs-6' label='Reject' onClick={() => this.renderReject(row._id) }/></TableRowColumn>
        </TableRow>
      )
    })
  }
  render () {
    return (
        <div className={styles.container}>
          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}>
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
              >
              <TableRow>
                <TableHeaderColumn tooltip="The Number">Number</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Accept">Accept</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Reject">Reject</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}>
              {this.renderTableRows()}
            </TableBody>
          </Table>
        </div>
    )
  }

}
