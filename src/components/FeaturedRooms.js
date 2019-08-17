import React, { useContext } from 'react'
import { RoomContext } from '../context/context'
import Room from './Room'
import Loading from './Loading'
import SectionTitle from '../shared/SectionTitle'

const FeaturedRooms = () => {
  const context = useContext(RoomContext)
  const { loading, featuredRooms } = context

  const roomsList = featuredRooms.map(room => {
    return <Room key={room.id} room={room} />
  })

  return (
    <section className="featured-rooms">
      <SectionTitle title="featured-rooms" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : roomsList}
      </div>
    </section>
  )
}

export default FeaturedRooms
