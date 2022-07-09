import { useState, useEffect, useRef } from "react";
import Card from "../components/Card/Card";
import "./Courses.css";
import PropTypes from "prop-types";

const Courses = (props) => {
  const [existingEvents, setExistingEvents] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [search, setSearch] = useState("");
  const initialLoad = useRef(true);
  const limit = 10;
  const poapIds = [
    9493, 9450, 8997, 8251, 7724, 15498, 12674, 11551, 10119, 15247, 14865,
    12417,
  ];

  const fetchEvents = async () => {
    const resp = await fetch(
      `https://api.poap.xyz/paginated-events?name=${search}&event_ids=${encodeURIComponent(
        poapIds.toString()
      )}&limit=${limit}&offset=${offSet}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!resp.ok) {
      const message = `An error has occured: ${resp.status}`;
      throw new Error(message);
    }

    const data = await resp.json();
    return data;
  };

  const eventList = existingEvents.map((item) => {
    return (
      <Card
        key={item.id}
        img={item.image_url}
        name={item.name}
        id={item.id}
        end={item.end_date}
      />
    );
  });

  const callFetchEvents = () => {
    props.setLoading(true);
    fetchEvents()
      .then((data) => {
        setExistingEvents((prev) => [...prev, ...data.items]);
        props.setLoading(false);
      })
      .catch((error) => {
        props.setLoading(false);
        console.log(error.message);
      });
  };

  // console.log(search)
  // console.log(existingEvents)
  // console.log(offSet)
  // console.log(existingEvents.length % limit)

  useEffect(() => {
    callFetchEvents();
  }, [offSet]);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
    } else {
      const delayDebounce = setTimeout(() => {
        console.log("debounce");
        setExistingEvents([]);
        setOffSet(0);
        callFetchEvents();
      }, 2000);

      return () => clearTimeout(delayDebounce);
    }
  }, [search]);

  return (
    <div className="courses--container">
      <div className="header--container">
        <h1>Event Gallary</h1>
        <input
          type="text"
          placeholder="Search..."
          maxLength="20"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <hr></hr>
      <div className="events--container">{eventList}</div>
      {existingEvents.length && !(existingEvents.length % limit) ? (
        <button
          className="btn btn--connect"
          disabled={props.loading}
          onClick={() => {
            setOffSet((prev) => prev + limit);
          }}
        >
          Next Page
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

Courses.propTypes = {
  setLoading: PropTypes.func,
  loading: PropTypes.bool,
};

export default Courses;
