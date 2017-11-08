import React from 'react'
import translate from './translate'
import withLanguage from './withLanguage'
import omit from 'lodash/omit'
import PropTypes from 'prop-types'

@withLanguage
export default class Translate extends React.Component {
  static propTypes = {
    tr: PropTypes.string.isRequired,
    html: PropTypes.bool,
    language: PropTypes.string
  }

  static defaultProps = {
    html: false
  }

  getParams () {
    return omit(this.props, 'tr')
  }

  getLang () {
    return this.props.language
  }

  renderHTML (translation) {
    return <span dangerouslySetInnerHTML={{ __html: translation }} />
  }

  renderText () {
    const translation = translate(
      this.props.tr,
      this.getParams(),
      this.getLang()
    )
    if (this.props.html) return this.renderHTML(translation)
    return translation
  }

  render () {
    return <span>{this.renderText()}</span>
  }
}
