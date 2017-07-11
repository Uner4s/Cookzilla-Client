import React from 'react'
import Layout from './Layout'
import Home from './Home'
import NotFound from './Misc/NotFound'
import Auth from './Auth'
import { Route } from 'react-router'
import Recipes from './Recipes'
export default (
  <Route>
    {Auth}
    <Route component={Layout}>
      <Route path="/" component={Home} />
      {Recipes}
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
)
