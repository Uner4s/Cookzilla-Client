import React from 'react'
import Translate from 'App/i18n'
import translate from 'App/i18n/translate'
import { Form, Field } from 'simple-react-form'
import Text from './Text'
import Button from 'orionsoft-parts/lib/components/Button'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import { loginWithPassword } from 'meteor-apollo-accounts'
import TOS from './TOS'
// import Social from './Social'
import { withApollo } from 'react-apollo'
import loginWithTwoFactor
  from 'orionsoft-parts/lib/decorators/loginWithTwoFactor'
import { storeLoginToken } from 'meteor-apollo-accounts/client/store'

@withApollo
@loginWithTwoFactor
export default class Login extends React.Component {
  state = {}

  static propTypes = {
    setLoading: React.PropTypes.func,
    setError: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    isLoading: React.PropTypes.bool,
    client: React.PropTypes.object,
    loginWithTwoFactor: React.PropTypes.func
  }

  state = {}

  @autobind async loginWithTwoFactor () {
    this.props.setLoading(true)
    this.props.setError(null)
    try {
      const { id, token, tokenExpires } = await this.props.loginWithTwoFactor(
        this.state
      )
      await storeLoginToken(id, token, new Date(tokenExpires))
      this.props.onSuccess()
    } catch (error) {
      console.log('Error loggin in with two factor', error)
      this.props.setError(error.message)
    }
    this.props.setLoading(false)
  }

  @autobind async login () {
    if (this.state.hasTwoFactor) return this.loginWithTwoFactor()
    this.props.setLoading(true)
    this.props.setError(null)
    try {
      await loginWithPassword(this.state, this.props.client)
      this.props.onSuccess()
    } catch (error) {
      if (
        error.message ===
        'GraphQL error: User needs two factor auth code [need-two-factor]'
      ) {
        this.setState({ hasTwoFactor: true })
      } else {
        console.log('Error loggin in', error)
        this.props.setError(error.message)
      }
      this.props.setLoading(false)
    }
  }

  @autobind handleEmailKey (event) {
    if (event.charCode === 13 || event.keyCode === 13) {
      this.refs.password.refs.input.refs.input.focus()
    }
  }

  @autobind handlePasswordKey (event) {
    if (event.charCode === 13 || event.keyCode === 13) {
      this.login()
    }
  }

  canLogin () {
    return this.state.email && this.state.password
  }

  renderButtons () {
    return (
      <div className={styles.buttonsContainer}>
        <Button
          disabled={!this.canLogin()}
          primary
          onClick={this.login}
          fullWidth
          loading={this.props.isLoading}
        >
          <Translate tr="auth.pages.login" />
        </Button>
      </div>
    )
  }

  renderTwoFactor () {
    if (!this.state.hasTwoFactor) return
    return (
      <div>
        <br />
        <Field
          fieldName="code"
          type={Text}
          ref="twoFactor"
          placeholder={translate('auth.pages.twoFactor')}
          onKeyPress={this.handlePasswordKey}
        />
      </div>
    )
  }

  render () {
    return (
      <div>
        {/* <Social {...this.props} /> */}
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <Field
            fieldName="email"
            type={Text}
            autoFocus
            fieldType="email"
            placeholder={translate('auth.pages.email')}
            onKeyPress={this.handleEmailKey}
          />
          <br />
          <Field
            fieldName="password"
            type={Text}
            ref="password"
            fieldType="password"
            placeholder={translate('auth.pages.password')}
            onKeyPress={this.handlePasswordKey}
          />
          {this.renderTwoFactor()}
        </Form>
        {this.renderButtons()}
        <br />
        <Translate tr="auth.pages.otherLinksInLogin" />
        <br />
        <TOS />
      </div>
    )
  }
}
