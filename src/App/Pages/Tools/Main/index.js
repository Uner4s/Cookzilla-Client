import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import requireRole from 'orionsoft-parts/lib/decorators/requireRole'
import PropTypes from 'prop-types'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

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
    getAcceptedTools: PropTypes.func
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

  renderTableRows () {
    const {getAcceptedTools} = this.props
    return getAcceptedTools.map((row, index) => {
      return (
        <TableRow key={index}>
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>{row.name}</TableRowColumn>
          <TableRowColumn>{'Accepted'}</TableRowColumn>
        </TableRow>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <h2>Accepted tools</h2>
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
