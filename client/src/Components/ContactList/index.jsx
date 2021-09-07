import React, { useEffect, useState } from 'react'
import './Style.css'
import CommentIcon from '@material-ui/icons/Comment';
import axios from 'axios';
import SearchBar from '../Searchbar';

const ContactList = () => {
    const [result, setResults] = useState([]);
    const [searchData, setSearchData] = useState();
    const filterItem = (data) => {
        setSearchData(data)
    }

    useEffect(() => {
        axios.get(`http://localhost/user`).then(res => {
            console.log(res.data)
            if (res.data) {
                setResults(res.data)
                setSearchData(res.data)
            }
        }).catch(err => {
            console.log(err.message)
        })


    }, [])

    return (
        <>
            <SearchBar result={result} data={filterItem} />
            <div className="contact-list">
                {
                    searchData && searchData.length > 0 && searchData.map((item, i) => {
                        return (
                            <div className="list-data" key={i}>
                                <div className="content-item">
                                    <img src={item.avatarPath} alt="" />
                                    <div className="content">
                                        <h4>{item.firstName}, {item.lastName}</h4>
                                        <p>{`(${item.phoneNumber.toString().substr(0, 3)}) ${item.phoneNumber.toString().substr(3, 3)}-${item.phoneNumber.toString().substr(6)}`}</p>
                                        <p>{item.emailAddress}</p>
                                    </div>
                                </div>
                                <div className="sms-icon">
                                    <CommentIcon />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default ContactList;
