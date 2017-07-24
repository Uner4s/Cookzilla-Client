import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from './Layout'
import Main from './Main'
import Create from './Create'
import Search from './Search'
import ShowRecipes from './Search/ShowRecipes'
import OneRecipe from './OneRecipe'

export default (
  <Route path='recipes' component={Layout}>
    <IndexRoute component={Main} />
    <Route path='create' component={Create} />
    <Route path='search' component={Search} />
    <Route path='showrecipes' component={ShowRecipes} />
    <Route path='onerecipe' component={OneRecipe} />
  </Route>

)
