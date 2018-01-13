import React from 'react'
import styles from './styles.css'
import Head from './Head'
import Middle from './Middle'
import Line from './Line'

export default class Home extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Head />
        <Line />
        <Middle />
      </div>
    )
  }
}
