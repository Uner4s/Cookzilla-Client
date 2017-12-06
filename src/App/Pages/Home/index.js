import React from 'react'
import styles from './styles.css'
import Head from './Head'
import Middle from './Middle'
import End from './End'

export default class Home extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Head />
        <Middle />
      </div>
    )
  }
}
