import React from 'react'
import styles from './styles.css'
import Container from 'orionsoft-parts/lib/components/Container'
import { Link } from 'react-router'
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square'
import FaGithub from 'react-icons/lib/fa/github'

export default class Footer extends React.Component {
  static propTypes = {}
  renderCompany() {
    return (
      <div className={styles.links}>
        <Link to="/" className={styles.link} onClick={window.scrollTo(0, 0)}>
          Cookilla team
        </Link>
        <Link to="/" className={styles.link} onClick={window.scrollTo(0, 0)}>
          Countries
        </Link>
      </div>
    )
  }

  renderSponsors() {
    return (
      <div className={styles.links}>
        <Link to="/" className={styles.link} onClick={window.scrollTo(0, 0)}>
          Coca Cola
        </Link>
        <Link to="/" className={styles.link} onClick={window.scrollTo(0, 0)}>
          Gourmet
        </Link>
        <Link to="/" className={styles.link} onClick={window.scrollTo(0, 0)}>
          Fitness
        </Link>
      </div>
    )
  }

  renderResources() {
    return (
      <div className={styles.links}>
        <Link to="/" className={styles.link} onClick={window.scrollTo(0, 0)}>
          Support
        </Link>
        <Link to="/" className={styles.link} onClick={window.scrollTo(0, 0)}>
          Security
        </Link>
        <Link to="/" className={styles.link} onClick={window.scrollTo(0, 0)}>
          Guide
        </Link>
        <Link to="/" className={styles.link} onClick={window.scrollTo(0, 0)}>
          Forum
        </Link>
      </div>
    )
  }

  renderSocial() {
    return (
      <div>
        <div className={styles.link}>
          <a
            href="https://www.facebook.com/eliminemoselpapel/"
            target="blank"
            style={{ color: '#ffffff' }}
          >
            <FaFacebookSquare
              size={20}
              style={{ marginRight: 10, marginBottom: 5 }}
            />
            Facebook
          </a>
        </div>
        <div className={styles.link}>
          <a
            href="https://twitter.com/nomaspapel?lang=es"
            target="blank"
            style={{ color: '#ffffff' }}
          >
            <FaTwitter size={20} style={{ marginRight: 10, marginBottom: 5 }} />
            Twitter
          </a>
        </div>
        <div className={styles.link}>
          <a
            href="https://www.linkedin.com/company/11366635/"
            target="blank"
            style={{ color: '#ffffff' }}
          >
            <FaLinkedinSquare
              size={20}
              style={{ marginRight: 10, marginBottom: 5 }}
            />
            Linkedin
          </a>
        </div>
        <div className={styles.link}>
          <a
            href="https://www.linkedin.com/company/11366635/"
            target="blank"
            style={{ color: '#ffffff' }}
          >
            <FaGithub size={20} style={{ marginRight: 10, marginBottom: 5 }} />
            Github
          </a>
        </div>
      </div>
    )
  }

  renderLogo(){
    return(
      <div className={styles.logo}>
        <img src="images/Cookzilla4.png" alt="Logo4" />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.footer}>
            <div className="row">
              <div className="col-xs-12 col-sm-3">
                <div className={styles.title}>
                  <b>Company</b>
                </div>
                {this.renderCompany()}
              </div>
              <div className="col-xs-12 col-sm-3">
                <div className={styles.title}>
                  <b>Sponsors</b>
                </div>
                {this.renderSponsors()}
              </div>
              <div className="col-xs-12 col-sm-3">
                <div className={styles.title}>
                  <b>Resources</b>
                </div>
                {this.renderResources()}
              </div>
              <div className="col-xs-12 col-sm-3">
                <div className={styles.title}>
                  <b>Social networks</b>
                </div>
                {this.renderSocial()}
              </div>
            </div>
            {this.renderLogo()}
          </div>
        </Container>
      </div>
    )
  }
}
