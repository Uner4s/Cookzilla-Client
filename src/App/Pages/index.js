import React from 'react'
import Layout from './Layout'
import Home from './Home'
import NotFound from './Misc/NotFound'
import Auth from './Auth'
import { Route } from 'react-router'
import Recipes from './Recipes'
import Tools from './Tools'
import Ingredients from './Ingredients'
export default (
  <Route>
    {Auth}
    <Route component={Layout}>
      <Route path="/" component={Home} />
      {Recipes}
      {Tools}
      {Ingredients}
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
)
