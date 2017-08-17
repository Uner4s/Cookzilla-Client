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
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

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
    getAcceptedTools: PropTypes.func,
    deleteTool: PropTypes.func,
    showMessage: PropTypes.func
  }

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
  renderTableRows () {
    const {getAcceptedTools} = this.props
    return getAcceptedTools.map((row, index) => {
      return (
        <TableRow key={index}>
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>{row.name}</TableRowColumn>
          <TableRowColumn>{'Accepted'}</TableRowColumn>
          <TableRowColumn>{<Button label='Delete' onClick={() => this.renderDelete(row._id) }/>}</TableRowColumn>
        </TableRow>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <h2>Tools to delete</h2>
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
              <TableHeaderColumn tooltip="Action">Accept</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}>
            {this.renderTableRows()}
          </TableBody>
        </Table>
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
