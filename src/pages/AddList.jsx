import React, { useState } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { useAlert } from 'react-alert'
const AddList = () => {
  const [list, setList] = useState({
    name: '',
    description: '',
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const alert = useAlert()

  // When successful listId will not equal zero
  const [listId, setListId] = useState(0)

  const addListApiCall = async e => {
    e.preventDefault()
    const apiUrl = 'https://honey-get-api.herokuapp.com/api/thelist'
    // const apiUrl = 'https://localhost:5001/api/thelist'
    const resp = await axios.post(apiUrl, list)
    if (resp.status === 201) {
      setListId(resp.data.id)
      alert.show(
        <>
          <p>The list was created.</p>
          <p>Click the plus sign to start adding items!</p>
        </>
      )
      setShouldRedirect(true)
    }
  }

  // Handle Input onChange Method
  const handleInputOnChange = e => {
    e.persist()
    setList(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  return shouldRedirect ? (
    <Redirect to={'/list/' + listId}></Redirect>
  ) : (
    <>
      <header>
        <nav className="headerNav">
          <ul className="navUl">
            <li className="titleLi">
              <Link className="flexCenter" to="/">
                <h1 className="titleH1">
                  <i className="backArrow far fa-arrow-alt-circle-left"></i>
                </h1>
              </Link>
              <div className="flexCenter">
                <p className="marginAroundTiny">New list:</p>
                <h1 className="titleH1">{list.name}</h1>
                <p className="marginAroundTiny wideScreen">
                  {list.description}
                </p>
              </div>
            </li>
            <li className="optionsLi">
              <Link className="flexCenter cancel" to="/">
                <h1 className="titleH1 oneHalfRemPadLeft" to="/">
                  <i className="far fa-window-close"></i>
                </h1>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <>
          <section className="formSection flexCenter">
            <form className="addListForm" onSubmit={addListApiCall}>
              <section className="formInputSection addSection flexCenter">
                <label className="addLabel">
                  <input
                    className="inputClass"
                    type="text"
                    name="name"
                    id="listName"
                    placeholder="Enter list name"
                    value={list.name}
                    onChange={handleInputOnChange}
                    autoFocus
                    maxLength="16"
                    required
                  />
                </label>
                <label className="addLabel">
                  <input
                    className="inputClass"
                    type="text"
                    name="description"
                    id="listDescription"
                    placeholder="Description optional..."
                    value={list.description}
                    onChange={handleInputOnChange}
                    maxLength="30"
                  />
                </label>
                <button className="inputClass addListBtn" type="submit">
                  Add List
                </button>
              </section>
            </form>
          </section>
        </>
      </main>
    </>
  )
}

export default AddList
