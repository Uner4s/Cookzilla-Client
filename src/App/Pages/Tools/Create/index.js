import React from 'react'
import styles from './styles.css'
import {Form, Field} from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import Button from 'orionsoft-parts/lib/components/Button'
import gql from 'graphql-tag'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'

@withMessage
@withMutation(gql`mutation createTool($name: String!){
  createTool(name: $name){
    _id
  }
}`)
export default class Create extends React.Component {

  static propTypes = {
    createTool: React.PropTypes.func,
    showMessage: React.PropTypes.func
  }

  state = {}
  // función que en x momento debe esperar la respuesta de otra
  async createTool () {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.createTool(this.state)
    } catch (error) {
      setGraphQLErrors(this, error)
    }
  }
  render () {
    console.log(this.state)
    return (
      <div className={styles.container}>
        <Form
          errorMessages={this.state.errorMessages}
          state={this.state}
          onChange={changes => this.setState(changes)}>
          <Field fieldName='name' label='name' type={Text} />
        </Form>
        <Button label='Save' onClick={() => this.createTool()}/>
      </div>
    )
  }

}
