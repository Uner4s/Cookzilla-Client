import React from 'react'
import Container from '../Container'
import {Link} from 'react-router'
import Margin from './Margin'

export default class Navbar extends React.Component {

  static propTypes = {
    logo: React.PropTypes.string
  }

  renderLogo () {
    return <Link to='/'><img height={44} src={this.props.logo} alt='Logo' className='os_navbar-logo' /></Link>
  }

  render () {
    return (
      <div>
        <Margin />
        <div className='os_navbar'>
          <div className="row" style={{width: '100%'}}>
              <div className="col-xs-2">
                  <div className="box">
                      {this.renderLogo()}
                  </div>
              </div>
              <div className="col-xs-2" style={{height: '50%'}}>
                  <div className="box">
                    <Container><li><a href="#">Page 1</a></li></Container>
                  </div>
              </div>
              <div className="col-xs-2">
                  <div className="box">
                      3
                  </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
