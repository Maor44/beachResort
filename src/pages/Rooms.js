import React, { Fragment } from 'react'
import Hero from '../shared/Hero'
import Banner from '../shared/Banner'
import { Link } from 'react-router-dom'
import RoomsContainer from '../components/RoomsContainer'

const Rooms = () => {
  return (
    <Fragment>
      <Hero hero="roomsHero">
        <Banner title="Our Rooms">
          <Link to="/" className="btn-primary">
            Return Homes
          </Link>
        </Banner>
      </Hero>

      <RoomsContainer />
    </Fragment>
  )
}

export default Rooms
