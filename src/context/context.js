import React, { Component, createContext } from 'react'
import Client from '../api/Contentful'

const RoomContext = createContext()

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  }

  getData = async () => {
    try {
      let res = await Client.getEntries({
        content_type: 'beachResortRoom',
        order: 'sys.createdAt'
      })
      const rooms = this.formatData(res.items)
      const featuredRooms = rooms.filter(room => room.featured === true)
      let maxPrice = Math.max(
        ...rooms.map(item => {
          return item.price
        })
      )
      let maxSize = Math.max(
        ...rooms.map(item => {
          return item.size
        })
      )
      this.setState({
        rooms,
        sortedRooms: rooms,
        featuredRooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getData()
  }

  formatData(items) {
    const tempItems = items.map(item => {
      const id = item.sys.id
      const images = item.fields.images.map(image => image.fields.file.url)

      let room = { ...item.fields, images, id }
      return room
    })
    return tempItems
  }

  getRoom = slug => {
    const tempRooms = [...this.state.rooms]
    const room = tempRooms.find(room => room.slug === slug)
    return room
  }

  handleChange = e => {
    const { checked, value, name, type } = e.target
    const whichValue = type === 'checkbox' ? checked : value
    this.setState(
      {
        [name]: whichValue
      },
      this.filterRooms
    )
  }

  filterRooms = () => {
    let {
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state

    let tempRooms = [...this.state.rooms]
    capacity = parseInt(capacity)
    price = parseInt(price)

    if (type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === type)
    }

    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }

    tempRooms = tempRooms.filter(room => room.price <= price)

    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    )

    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true)
    }

    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true)
    }

    this.setState({
      sortedRooms: tempRooms
    })
  }

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer

export { RoomContext, RoomProvider, RoomConsumer }
