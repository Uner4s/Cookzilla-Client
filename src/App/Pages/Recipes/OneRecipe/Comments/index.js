import React from 'react'
import styles from './styles.css'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import gql from 'graphql-tag'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import { Form, Field } from 'simple-react-form'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import Button from 'orionsoft-parts/lib/components/Button'
import autobind from 'autobind-decorator'
import requireRole from 'orionsoft-parts/lib/decorators/requireRole'
import PropTypes from 'prop-types'

@requireRole(['colaborator', 'admin', 'moderator'])
@withGraphQL(gql`
  query commentRecipes($recipeId: ID!) {
    commentRecipes(_id: $recipeId) {
      author
      content
    }
  }
`)
@withMessage
@withMutation(gql`
  mutation createComment($recipeId: String!, $content: String!) {
    createComment(recipeId: $recipeId, content: $content) {
      content
    }
  }
`)
export default class Comments extends React.Component {
  static propTypes = {
    commentRecipes: PropTypes.func,
    recipeId: PropTypes.string,
    createComment: PropTypes.func
  }

  state = {}

  @autobind
  async renderComment (variable) {
    try {
      // Una vez que esta función se ejecute haz algo
      await this.props.createComment({
        recipeId: this.props.recipeId,
        content: variable
      })
    } catch (error) {
      setGraphQLErrors(this, error)
    }
  }

  renderComments () {
    const { commentRecipes } = this.props
    return commentRecipes.map(comment => {
      return (
        <div key={comment._id} className="row">
          <div className="col-xs-12 col-sm-12">
            <h3>{comment.author} </h3>
            <p>{comment.content}</p>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <Form
          errorMessages={this.state.errorMessages}
          state={this.state}
          onChange={changes => this.setState(changes)}
        >
          <label>Leave your comment</label>
          <Field fieldName="comment" label="comment" type={Text} />
        </Form>
        <Button
          label="Send"
          onClick={() => this.renderComment(this.state.comment)}
        />
        {this.renderComments()}
      </div>
    )
  }
}
