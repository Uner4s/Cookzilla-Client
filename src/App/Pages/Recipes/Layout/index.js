import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return <div className={styles.container}>{this.props.children}</div>
  }
}
