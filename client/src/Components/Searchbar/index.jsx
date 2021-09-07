import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './Style.css'

const SearchBar = (props) => {
    const [search, setSearch] = useState()

    const arraySearch = (result, value) => {
        const searchData = value.toLowerCase().replace('(', '').replace(')', '').replace('-', '').replace(' ', '')

        console.log("searchData", searchData);
        return result.filter(value => {
            return value.firstName.toLowerCase().match(new RegExp(searchData, "gi")) ||
                value.lastName.toLowerCase().match(new RegExp(searchData, "gi")) ||
                value.phoneNumber.toLowerCase().match(new RegExp(searchData, "gi")) ||
                value.emailAddress.toLowerCase().match(new RegExp(searchData, "gi"))
        })
    }
    const filterData = (e) => {
        setSearch(e.target.value)
        let value = e.target.value;
        if (value) {
            let search = arraySearch(props.result, value);
            props.data(search)
        }
        else {
            let search = arraySearch(props.result, '');
            console.log("search", search)
            props.data(search)
        }

    }

    return (
        <div className="search-bar">
            <input type="text" value={search ?? ""} onChange={filterData} placeholder="Search for a contact..." />
            <SearchIcon />
        </div>
    );
}

export default SearchBar;
