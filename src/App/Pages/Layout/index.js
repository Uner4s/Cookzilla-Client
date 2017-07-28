import React from 'react'
import Navbar from 'orionsoft-parts/lib/components/Navbar'
import styles from './styles.css'
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
