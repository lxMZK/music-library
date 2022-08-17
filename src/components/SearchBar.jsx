import React, {useContext} from 'react'
import {SearchContext} from '../context/SearchContext'

function SearchBar() {
    const {term, handleSearch} = useContext(SearchContext)

    return (
        <form>
            <input ref={term} type='text' placeholder='Enter a search term here' onChange={(e) => handleSearch(term.current.value)} />
        </form>
    )
}

export default SearchBar