import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from './Layout'
import Main from './Main'
import Create from './Create'
import Search from './Search'
import ShowRecipes from './Search/ShowRecipes'
import OneRecipe from './OneRecipe'
import Accept from './Accept'
import All from './All'
import Comments from './OneRecipe/Comments'

export default (
  <Route path='recipes' component={Layout}>
    <IndexRoute component={Main} />
    <Route path='create' component={Create} />
    <Route path='search' component={Search} />
    <Route path='showrecipes' component={ShowRecipes} />
    <Route path='onerecipe/:_id' component={OneRecipe} />
    <Route path='comments' component={Comments} />
    <Route path='accept' component={Accept} />
    <Route path='all' component={All} />
  </Route>

)
