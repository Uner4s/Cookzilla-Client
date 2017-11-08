import React from 'react'
import styles from './styles.css'
import {Form, Field} from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import gql from 'graphql-tag'
import autobind from 'autobind-decorator'
import uniq from 'lodash/debounce'
import Autocomplete from 'orionsoft-parts/lib/components/fields/Autocomplete'
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
      <div className='row center-xs '>
        <div className={styles.container}>
            <h2>Recipes finder</h2>
            <br />
            <h3>Select your ingredients and tools here:</h3>
            <br />
            <Form
              state={this.state}
              onChange={changes => this.setState(changes)}>
              <div className='row '>
                <div className="col-xs" >
                <Field fieldName='ingredients' label='Ingredients' type={ArrayComponent}>
                  <Field fieldName='name' label='name' type={Text} />
                </Field>
                </div>
                <div className="col-xs" >
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
