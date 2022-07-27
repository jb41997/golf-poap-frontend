import { useState, useEffect } from 'react'
import Card from '../components/Card/Card'
import './Patrons.css'
import PropTypes from 'prop-types'

const Patrons = (props) => {
  const [existingTokens, setExistingTokens] = useState([])

  const fetchEvents = async () => {
    const resp = await fetch(
      `https://api.poap.xyz/actions/scan/${props.currentAccount}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    if (!resp.ok) {
      const message = `An error has occured: ${resp.status}`
      throw new Error(message)
    }

    const data = await resp.json()
    return data
  }

  const eventList = existingTokens.map((item) => {
    return (
      <Card
        key={item.tokenId}
        img={item.event.image_url}
        name={item.event.name}
        id={item.event.id}
        end={item.event.end_date}
        tokenid={item.tokenId}
      />
    )
  })

  const callFetchEvents = () => {
    props.setLoading(true)
    fetchEvents()
      .then((data) => {
        setExistingTokens((prev) => [...prev, ...data])
        props.setLoading(false)
      })
      .catch((error) => {
        props.setLoading(false)
        console.log(error.message)
      })
  }

  useEffect(() => {
    callFetchEvents()
  }, [])

  return (
    <div className="patrons--container">
      <h1>Your Collection</h1>
      <hr></hr>
      <div className="tokens--container">{eventList}</div>
    </div>
  )
}

Patrons.propTypes = {
  currentAccount: PropTypes.string,
  setLoading: PropTypes.func,
}

export default Patrons
