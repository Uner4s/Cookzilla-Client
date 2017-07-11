import React from 'react'
import styles from './styles.css'
import {Form, Field} from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import ArrayComponent from 'orionsoft-parts/lib/components/fields/ArrayComponent'
export default class Home extends React.Component {
  static propTypes = {}

  render () {
    return (
      <div className='row'>
        <div className='col-md-6'>
          <Form state={this.state} onChange={changes => this.setState(changes)}>
            <Field fieldName='ingredients' label='Ingredientes' type={ArrayComponent} >
              <Field fieldName='ingredient' label='Nombre' type={Text} />
            </Field>
          </Form>
        </div>
        <div className='col-md-6'>
          <Form state={this.state} onChange={changes => this.setState(changes)}>
            <Field fieldName='tools' label='Implementos' type={ArrayComponent} >
              <Field fieldName='tool' label='Nombre' type={Text} />
            </Field>
          </Form>
        </div>
      </div>
    )
  }
}
