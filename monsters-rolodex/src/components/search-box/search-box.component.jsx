import React from "react";
import './search-box.styles.css';

const SearchBox = ({placeholder, handleChange}) => (
    <input 
    className = 'search'
    // onChange={e => this.setState({searchField: e.target.value}, ()=>console.log(this.state.searchField) )}
    onChange={handleChange}
    type='search' 
    placeholder='search monsters'>
    </input>

)


export default SearchBox;