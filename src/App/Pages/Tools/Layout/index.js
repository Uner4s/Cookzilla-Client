import React from 'react'
import styles from './styles.css'

export default class Layout extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    )
  }

}
