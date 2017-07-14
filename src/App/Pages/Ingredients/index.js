import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from './Layout'
import Main from './Main'
import Create from './Create'
import Accept from './Accept'
import Delete from './Delete'

export default (
  <Route path='/ingredients' component={Layout}>
    <IndexRoute component={Main} />
    <Route path='create' component={Create} />
    <Route path='accept' component={Accept} />
    <Route path='delete' component={Delete} />
  </Route>
)
