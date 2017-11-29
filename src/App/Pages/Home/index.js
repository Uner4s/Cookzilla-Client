import React from 'react'
import styles from './styles.css'
import { Form, Field } from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import ArrayComponent from 'orionsoft-parts/lib/components/fields/ArrayComponent'

export default class Home extends React.Component {
  static propTypes = {}

  render() {
    return <div className={styles.container}>Welcome to Cookzilla</div>
  }
}
