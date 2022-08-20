import React, { useState, useRef, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'

import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'

import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (term) => {
    const fetchData = async () => {
      document.title = `${term} Music`
      const response = await fetch(API_URL + term)
      const resData = await response.json()
      if (resData.results.length > 0) {
        setMessage('Search for Music!')
        setData(resData.results)
      } else {
        setMessage('Not Found')
        setData([])
      }
    }
    fetchData()
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <div>
              <SearchContext.Provider value={{
                term: searchInput,
                handleSearch: handleSearch
              }}>
                <SearchBar />
              </SearchContext.Provider>
              <Suspense fallback={<h2>Looking for results...</h2>}>
                <DataContext.Provider value={data}>
                  <Gallery />
                </DataContext.Provider>
              </Suspense>
            </div>
          } />
          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
