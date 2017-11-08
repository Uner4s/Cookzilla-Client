import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

export default class Text extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    fieldType: PropTypes.string,
    passProps: PropTypes.object,
    placeholder: PropTypes.node
  }

  static defaultProps = {
    fieldType: 'text'
  }

  render () {
    return (
      <div className={styles.container}>
        <input
          ref="input"
          className={styles.input}
          type={this.props.fieldType}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={event => this.props.onChange(event.target.value)}
          {...this.props.passProps}
        />
      </div>
    )
  }
}
