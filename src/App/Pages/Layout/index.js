import React from 'react'
import styles from './styles.css'
import Navbar from 'src/App/components/Navbar'
import PropTypes from 'prop-types'

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <div>
        <Navbar logo="/logo.jpg" />
        {this.props.children}
      </div>
    )
  }
}
