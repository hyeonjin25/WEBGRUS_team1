import React from 'react'
import SearchComponent from '../SearchComponent'

function Searchbar({small}) {
    return (
        <div>
             {/* 검색창 */}
             <SearchComponent small={small} />
        </div>
    )
}

export default Searchbar
