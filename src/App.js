import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'

import SearchMoviesContext from './context/SearchMoviesContext'

import './App.css'

const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'

// write your code here
const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('Initial')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responsedata => ({
    totalPages: responsedata.total_pages,
    total_Results: responsedata.total_results,
    results: responsedata.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmbd.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
    })),
  })

  const onTriggerSearchingQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=1`

    const response = await fetch(apiUrl)
    const data = await response.json()
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }

  return (
    <SearchMoviesContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onTriggerSearchingQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <div className="App d-flex flex-column">
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/" component={TopRated} />
          <Route exact path="/" component={Upcoming} />
        </Switch>
      </div>
    </SearchMoviesContext.Provider>
  )
}

export default App
