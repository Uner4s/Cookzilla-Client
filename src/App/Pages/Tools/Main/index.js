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
        <div key={tool._id} className='row'>
          <div className='col-xs-6'>
            {tool._id}
          </div>
          <div className='col-xs-6'>
            {tool.name}
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
        {this.renderTools()} <br></br>
        <div className='row'>
          <Button className='col-xs-6' to='/tools/create' primary label='Create Tool'/>
          <Button className='col-xs-6' to='/tools/delete' primary label='Delete Tool'/>
        </div>
      </div>
    )
  }

}
