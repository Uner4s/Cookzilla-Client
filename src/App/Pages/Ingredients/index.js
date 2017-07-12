import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from './Layout'
import Main from './Main'

export default (
  <Route path='/ingredients' component={Layout}>
    <IndexRoute component={Main} />
  </Route>
)
