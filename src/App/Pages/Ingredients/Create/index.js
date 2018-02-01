import React from 'react'
import styles from './styles.css'
import { Form, Field } from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import Button from 'orionsoft-parts/lib/components/Button'
import gql from 'graphql-tag'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'
import PropTypes from 'prop-types'

@withMessage
@withMutation(gql`
  mutation createIngredient($name: String!) {
    createIngredient(name: $name) {
      _id
    }
  }
`)
export default class Create extends React.Component {
  static propTypes = {
    createIngredient: PropTypes.func,
    showMessage: PropTypes.func
  }

  state = {}
  async createIngredient() {
    try {
      await this.props.createIngredient(this.state)
      window.location.href = '../ingredients'
      window.alert('Ingredient added')
    } catch (error) {
      setGraphQLErrors(this, error)
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>Create Ingredient</h2>
        <Form
          errorMessages={this.state.errorMessages}
          state={this.state}
          onChange={changes => this.setState(changes)}
        >
          <Field fieldName="name" label="name" type={Text} />
        </Form>
        <Button label="Save" onClick={() => this.createIngredient()} />
      </div>
    )
  }
}
