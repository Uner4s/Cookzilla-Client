import React from 'react'
import styles from './styles.css'
import Container from 'orionsoft-parts/lib/components/Container'
import LogoIcon from 'react-icons/lib/md/gesture'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router'

@withRouter
export default class Navbar extends React.Component {
  static propTypes = {
    router: PropTypes.object,
    scrollY: PropTypes.number,
    innerHeight: PropTypes.number
  }

  getClassName() {
    if (this.props.router.location.pathname !== '/') return styles.containerDown
    if (this.props.scrollY > this.props.innerHeight) return styles.containerDown
    if (this.props.scrollY > 80) return styles.containerUp
    return styles.container
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <Container>
          <div className={styles.flex}>
            <Link className={styles.logo} to="/">
              <img src="images/LogoCookzilla 2.png" alt="LogoCookzilla 2" />
            </Link>
            <div className={styles.content}>
              <a href="http://help.tufirma.digital/" className={styles.link}>
                Soporte
              </a>
              <Link to="/contact" className={styles.link}>
                Contacto
              </Link>
              <Link to="/pricing" className={styles.link}>
                Entrar
              </Link>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
