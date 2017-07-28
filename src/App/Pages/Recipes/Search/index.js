import React from 'react'
import styles from './styles.css'
import {Form, Field} from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import ArrayComponent from 'orionsoft-parts/lib/components/fields/ArrayComponent'
import ShowRecipes from './ShowRecipes'

export default class Search extends React.Component {

  static propTypes = {
  }

  state = {
    ingredients: [],
    tools: []
  }

  render () {
    return (
      <div className='row '>
        <div className={styles.container}>
            <Form
              state={this.state}
              onChange={changes => this.setState(changes)}>
              <div className='row '>
                <div className="col-xs-6" >
                <Field fieldName='ingredients' label='Ingredients' type={ArrayComponent}>
                  <Field fieldName='name' label='name' type={Text} />
                </Field>
                </div>
                <div className="col-xs-6" >
                <Field fieldName='tools' label='Tools' type={ArrayComponent}>
                  <Field fieldName='name' label='name' type={Text} />
                </Field>
                </div>
              </div>
            </Form>
            <ShowRecipes ingredients={this.state.ingredients} tools={this.state.tools}/>
          </div>
      </div>
    )
  }

}
