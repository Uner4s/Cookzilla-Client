import React from 'react'
import apolloClient from './apollo'
import { ApolloProvider } from 'react-apollo'
import OrionsoftProvider from 'orionsoft-parts/lib/components/Provider'
import './locale'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class Root extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <ApolloProvider client={apolloClient}>
        <OrionsoftProvider>
          <MuiThemeProvider>
            {this.props.children}
          </MuiThemeProvider>
        </OrionsoftProvider>
      </ApolloProvider>
    )
  }
}
