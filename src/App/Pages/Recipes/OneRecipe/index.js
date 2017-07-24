import React from 'react'
import styles from './styles.css'
import gql from 'graphql-tag'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import autobind from 'autobind-decorator'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
/*
@withGraphQL(gql`query oneRecipe($_id: ID!){
  oneRecipe(_id: $_id){
    title
    dificult
    time
    gloss
    ingredient{name}
    tool{name}

  }
}`)
*/
export default class OneRecipe extends React.Component {

  static propTypes = {
    oneRecipe: React.PropTypes.func
  }

  render () {
    return (
      console.log(this),
      <div className={styles.container}>
        OneRecipe
      </div>
    )
  }

}
