import React, { useContext } from 'react'
import { RoomContext } from '../context/context'
import { Link } from 'react-router-dom'

import Banner from '../shared/Banner'
import StyledHero from '../shared/StyledHero'

const SingleRoom = props => {
  const context = useContext(RoomContext)
  const { slug } = props.match.params
  const room = context.getRoom(slug)

  if (!room) {
    return (
      <div className='error'>
        <h3>no such room could be found...</h3>
        <Link to='/rooms' className='btn-primary'>
          back to rooms
        </Link>
      </div>
    )
  }
  const {
    name,
    description,
    capacity,
    size,
    extras,
    price,
    breakfast,
    pets,
    images
  } = room
  const [mainImg, ...restImages] = images
  return (
    <>
      <StyledHero image={mainImg}>
        <Banner title={`${name} room`}>
          <Link to='/rooms' className='btn-primary'>
            back to rooms
          </Link>
        </Banner>
      </StyledHero>

      <section className='single-room'>
        <div className='single-room-images'>
          {restImages.map((item, index) => {
            return <img key={index} src={item} alt={name} />
          })}
        </div>
        <div className='single-room-info'>
          <article className='desc'>
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className='info'>
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : ${size} SQFT</h6>
            <h6>
              max capacity:{' '}
              {capacity > 1 ? `${capacity} people` : `${capacity} people`}
            </h6>
            <h6>{pets ? 'pets allowed' : 'no pets allowed'}</h6>
            <h6>{breakfast && 'free breakfast include'}</h6>
          </article>
        </div>
      </section>

      <section className='room-extras'>
        <h6>extras</h6>
        <ul className='extras'>
          {extras &&
            extras.map((item, index) => {
              return <li key={index}>{item}</li>
            })}
        </ul>
      </section>
    </>
  )
}

export default SingleRoom
