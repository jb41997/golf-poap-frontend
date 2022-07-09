import './LoadingIndicator.css'
import PropTypes from 'prop-types'

const LoadingIndicator = (props) => {
  return props.trigger ? (
    <div className="lds-ring">
      <div className="lds-inner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    ''
  )
}

LoadingIndicator.propTypes = {
  trigger: PropTypes.bool,
}

export default LoadingIndicator
