import React from 'react'
import styles from './styles.css'
import Navbar from '../../components/Navbar'
export default class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <div className={styles.container}>

        <Navbar logo='logo.jpg'/>

        {this.props.children}
      </div>
    )
  }
}
