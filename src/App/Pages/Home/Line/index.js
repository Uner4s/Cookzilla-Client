import React from 'react'
import styles from './styles.css'
import MdArrowForward from 'react-icons/lib/md/arrow-forward'
import Container from 'orionsoft-parts/lib/components/Container'
import { Link } from 'react-router'
import PropTypes from 'prop-types'


export default class Line extends React.Component {
  static propTypes = {
    router: PropTypes.object
  }

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.text}>
            <Link
              className={styles.link}
              style={{ color: '#ffffff' }}
              to="/register"
            >
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <h3 className={styles.title}>
                    Regístrate, es totalmente gratis!
                  </h3>
                </div>
                <div className="col-xs-12 col-sm-2 end-xs">
                  <div className={styles.icon}>
                    <MdArrowForward size={28} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </div>
    )
  }
}
