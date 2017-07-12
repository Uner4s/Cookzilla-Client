import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from './Layout'
import Main from './Main'
import Create from './Create'
import Acept from './Acept'

export default (
  <Route path='/tools' component={Layout}>
    <IndexRoute component={Main} />
    <Route path='create' component={Create} />
    <Route path='acept' component={Acept} />
  </Route>
)
