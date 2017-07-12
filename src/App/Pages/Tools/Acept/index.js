import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'

@withGraphQL(gql`query getTools{
  getTools{
    _id
    name
  }
}`)

export default class Acept extends React.Component {

  static propTypes = {
    getTools: React.PropTypes.func
  }
  // Render
  renderTools () {
    const {getTools} = this.props
    return getTools.map(tool => {
      return (
        <div key={tool._id} className='row'>
          <div className='col-xs-12 col-sm-12'>
            {tool.name}
              <Button to='' primary label='Acept'/>
          </div>
        </div>
      )
    })
  }
  render () {
    return (
      <div className={styles.container}>
        {this.renderTools()}
      </div>
    )
  }

}
