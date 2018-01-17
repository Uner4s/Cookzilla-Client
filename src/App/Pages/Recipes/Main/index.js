import React from 'react'
import styles from './styles.css'
import Button from 'orionsoft-parts/lib/components/Button'

export default class Main extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Button to="recipes/create" primary label="Create recipe" />
      </div>
    )
  }
}
