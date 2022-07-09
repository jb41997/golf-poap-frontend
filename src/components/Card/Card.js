import "./Card.css";
import PropTypes from "prop-types";

const Card = (props) => {
  return (
    <div className="wrapper">
      <a
        href={
          props.tokenid
            ? `https://app.poap.xyz/token/${props.tokenid}`
            : `https://poap.gallery/event/${props.id}`
        }
        rel="noreferrer"
        target="_blank"
      >
        <div className="card--container">
          <div className="card--header">
            <img src={props.img} alt={props.name} />
          </div>
          <div className="card--body">
            <h3 title={props.name}>
              {props.name.length > 35
                ? props.name.substr(0, 34) + "\u2026"
                : props.name}
            </h3>
            <div className="card--details">
              <div title="Event ID" className="event--id">
                #{props.id}
              </div>
              <div title="End Date" className="event--end">
                {props.end}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

Card.propTypes = {
  tokenid: PropTypes.string,
  id: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
  end: PropTypes.string,
};

export default Card;
