import React, { useState } from 'react'
import ContactList from '../ContactList';
import Header from '../Header';
import './Style.css'

const Wrapper = () => {
    const [open, setopen] = useState();
    const handleClickOpen = (parm) => {
        setopen(parm)
    }
    return (
        <div className="Wrapper">
            <div className="main">
                <Header open={open} ClickClose={handleClickOpen} />
                <ContactList />
            </div>
        </div>
    );
}

export default Wrapper;
