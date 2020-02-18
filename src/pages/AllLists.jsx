import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListRow from '../components/ListRow'
import axios from 'axios'

const AllLists = () => {
  // declare array to house the lists
  const [allLists, setAllLists] = useState([])

  const [sortedAscending, setSortedAscending] = useState(true)

  // Make API call to return all lists
  const getAllLists = async () => {
    const apiUrl = 'https://honey-get-api.herokuapp.com/api/thelist'
    // const apiUrl = 'https://localhost:5001/api/thelist'
    const resp = await axios.get(apiUrl)
    if (resp.status === 200) {
      sortArray(resp.data)
    }
  }

  // sort the list
  const sortArray = list => {
    let sortedArray = list.sort((a, b) =>
      a.maxpriority > b.maxpriority ? 1 : -1
    )

    if (sortedAscending === true) {
      sortedArray.reverse()
      setSortedAscending(false)
    } else {
      setSortedAscending(true)
    }
    setAllLists([...sortedArray])
  }

  // Use Effect on Page Render
  useEffect(() => {
    getAllLists()
  }, [])

  return (
    <>
      <header>
        <nav className="headerNav">
          <ul className="navUl">
            <li className="titleLi">
              <img
                className="navImage"
                src="./images/bee.png"
                alt="Honey Get Lists Logo"
              ></img>
              {/* <Link className="titleH1" to="/"> */}
              <h1 className="titleH1">Honey Get Lists</h1>
              {/* </Link> */}
            </li>
            <li className="optionsLi">
              <div>Priority</div>
              <button className="navBtn" onClick={() => sortArray(allLists)}>
                <i className="fas fa-sort"></i>
              </button>
              <button className="navBtn">
                <Link to="/AddList">
                  <i className="fas fa-plus"></i>
                </Link>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <table className="listTable">
            <tbody>
              {allLists.map(list => {
                return <ListRow key={list.id} list={list} />
              })}
            </tbody>
          </table>
        </section>
        <section className="addItemSection">
          <Link className="addItemSection" to="/AddList">
            <i className="fas fa-plus"></i>
          </Link>
        </section>
      </main>
    </>
  )
}

export default AllLists
