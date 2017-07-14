import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'

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
          <div className='col-xs-12 col-sm-12'>
            {tool.name}
          </div>
        </div>
      )
    })
  }

  render () {
    console.log(this.props)
    return (
      <div className={styles.container}>
        {this.renderTools()}
        <Button to='/tools/create' primary label='Create Tool'/>
        <Button to='/tools/delete' primary label='Delete Tool'/>
      </div>
    )
  }

}
