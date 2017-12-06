import React from 'react'
import styles from './styles.css'
import Container from 'orionsoft-parts/lib/components/Container'

export default class Middle extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.icons}>
            <div className="row">
              <div className="col-xs-12 col-sm-4 center-sm">
                <div className={styles.logo}>
                  <img src="images/cook1.png" alt="Logo1" />
                </div>
              </div>
              <div className="col-xs-12 col-sm-4 center-sm">
                <div className={styles.logo}>
                  <img src="images/cook2.png" alt="Logo2" />
                </div>
              </div>
              <div className="col-xs-12 col-sm-4 center-sm">
                <div className={styles.logo}>
                  <img src="images/cook3.jpg" alt="Logo3" />
                </div>
              </div>
            </div>
            <div className={styles.text}>
              With cookzilla you can search for recipes in the easiest and
              fastest way. You can create an account to share your recipes with
              the community and learn from others.
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
