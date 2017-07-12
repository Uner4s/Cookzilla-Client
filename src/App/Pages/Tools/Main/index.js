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
export default class Main extends React.Component {

  static propTypes = {
    getTools: React.PropTypes.func
  }

  renderTools () {
    const {getTools} = this.props
    return getTools.map(tool => {
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
      </div>
    )
  }

}
