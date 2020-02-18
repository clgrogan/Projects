import React, { useState } from 'react'
import TruncateString from './TruncateString'
import axios from 'axios'
import { useAlert } from 'react-alert'

// import { useTruncateString } from './useTruncateString'

const ItemRow = props => {
  const indexStart = 0 // Used for truncation
  const maxLength = 20 // Used for truncation
  // console.log('The ItemRow props: ', props)
  // const [displayDescription] = useTruncateString(0, 20, props.item.description)
  // const [quantity, setQuantity] = useState(props.item.quantity)
  const [isDeleted, setIsDeleted] = useState(false)

  const [item, setItem] = useState({
    id: parseInt(props.item.id),
    thelistid: parseInt(props.item.theListId),
    name: props.item.name,
    description: props.item.description,
    quantity: parseInt(props.item.quantity),
    priority: parseInt(props.item.priority),
  })
  const alert = useAlert()

  const incrementPriority = () => {
    if (item.priority < 3) {
      // console.log(item)
      updateItemApiCall({ ...item, priority: item.priority + 1 })
    } else {
      updateItemApiCall({ ...item, priority: 0 })
    }
  }

  const incrementQuantity = () => {
    updateItemApiCall({ ...item, quantity: item.quantity + 1 })
  }

  const decrementQuantity = () => {
    if (item.quantity > 0) {
      updateItemApiCall({ ...item, quantity: item.quantity - 1 })
    }
    // console.log(item)
  }

  const updateItemApiCall = async newItem => {
    const apiUrl = 'https://honey-get-api.herokuapp.com/api/item/' + item.id
    // const apiUrl = 'https://localhost:5001/api/thelist/' + listId
    setItem(newItem)
    const resp = await axios.put(apiUrl, newItem)
    if (resp.status === 204) {
      alert.show(
        <>
          <p>Your item has been updated.</p>
        </>
      )
    }
  }

  const satisfyItem = () => {
    if (item.quantity > 0) {
      updateItemApiCall({ ...item, quantity: 0 })
    } else {
      deleteItemApiCall()
    }
    // console.log(item)
  }

  const deleteItemApiCall = async () => {
    const apiUrl = 'https://honey-get-api.herokuapp.com/api/item/' + item.id
    // const apiUrl = 'https://localhost:5001/api/thelist/' + listId
    const resp = await axios.delete(apiUrl, item)
    if (resp.status === 200) {
      // alert.show('The item was deleted.')
      setIsDeleted(true)
    }
  }

  if (isDeleted) {
    return <></>
  }

  return (
    <>
      <tr className="tableRow">
        <td className="flexLeft">
          <div
            className={
              'flexCenter redSubdued padAroundTiny quantity' + item.quantity
            }
            alt="Check Item Off Button"
            onClick={satisfyItem}
          >
            <i className="far fa-check-circle"></i>
          </div>
          <div
            onClick={incrementPriority}
            className={
              'flexCenter cartPriority marginAroundTiny priority priority' +
              item.priority +
              ' quantity' +
              item.quantity
            }
          >
            <i
              className={'fas fa-shopping-cart cartQty' + item.quantity}
              alt={'Item Priority ' + item.priority}
            ></i>
          </div>
          <div className={'flexCenter padAroundTiny quantity' + item.quantity}>
            {item.name}
          </div>

          <div
            className={
              'mobile flexCenter subduedRowText quantity' + item.quantity
            }
          >
            <TruncateString
              key={item.id}
              indexStart={indexStart}
              maxLength={maxLength}
              initialStr={item.description}
            />
          </div>
          <div
            className={
              'wideScreen flexCenter subduedRowText quantity' + item.quantity
            }
          >
            {item.description}
          </div>
        </td>
        {/* <td>{displayDescription}</td> // testing custom hook */}
        <td className="flexCenter">
          <div
            className="flexCenter"
            alt="Decrease Quantity Button"
            onClick={decrementQuantity}
          >
            <i
              className={
                'far fa-minus-square redSubdued quantity' + item.quantity
              }
              alt="Decrease Quantity Button"
            ></i>
          </div>
          <div
            className={'flexCenter marginAroundTiny quantity' + item.quantity}
          >
            ({item.quantity})
          </div>
          <div
            className="flexCenter"
            onClick={incrementQuantity}
            alt="Increase Quantity Button"
          >
            <i
              className="far fa-plus-square greenSubdued"
              alt="Increase Quantity Button"
            ></i>
          </div>
        </td>
      </tr>
    </>
  )
}

export default ItemRow
