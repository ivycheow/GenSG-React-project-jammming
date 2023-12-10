import React, {useState} from 'react';

import './SearchBar.css';

const SearchBar = (props) => {
    const [term, setTerm] = useState("");

    // 
    const handleTermChange = ({target}) => {
        setTerm(target.value);
    }
    
    const search = () => {
        props.onSearch(term);
    }
    
    return(
        <div className='SearchBar'>
            <input
                placeholder='Enter a Song Title'
                onChange={handleTermChange}>
            </input>
            <button
                className='SearchButton'
                onClick={search}>
                    Search
            </button>
        </div>
    )
}

export default SearchBar; 