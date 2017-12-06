import React from 'react'
import styles from './styles.css'
import Container from 'orionsoft-parts/lib/components/Container'
import { Form, Field } from 'simple-react-form'
import Button from 'orionsoft-parts/lib/components/Button'

import Text from 'orionsoft-parts/lib/components/fields/Text'

export default class Head extends React.Component {
  static propTypes = {}
  state = {}

  sendContact() {
    return <div>hola</div>
  }

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.title}>The most advance</div>
          <div className={styles.superTitle}>
            <b>Food Search!</b>
          </div>
          <div className={styles.subtitle}>
            For more information, please contact us !
          </div>
          <div className={styles.form}>
            <div className="row">
              <div className="col-xs-12 col-sm-3">
                <Form
                  state={this.state}
                  onChange={changes => this.setState(changes)}
                >
                  <Field fieldName="email" type={Text} />
                </Form>
              </div>
              <div className="col-xs-12 col-sm-3">
                <Button
                  loading={this.state.loading}
                  onClick={this.sendContact}
                  className={styles.button}
                >
                  contact me
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
