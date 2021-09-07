import React, { useState } from 'react'
import ContactsIcon from '@material-ui/icons/Contacts';
import './Style.css'
import Modal from '@material-ui/core/Modal';

const Header = (props) => {

    const [avatar, setAvatar] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [phoneError, setPhoneError] = useState(false)

    const handleClickOpen = () => {
        props.ClickClose(true)
    };
    const handleClose = () => {

        props.ClickClose(false)

    };

    const onchangeAvatarHandler = (e) => {
        setAvatar(e.target.value);
    }
    const onchangefHandler = (e) => {
        setFname(e.target.value);
    }
    const onchangelHandler = (e) => {
        setLname(e.target.value);
    }
    const onchangephoneHandler = (e) => {
        setPhone(e.target.value);
    }
    const onchangeemailHandler = (e) => {
        setEmail(e.target.value);
    }

    const postData = (e) => {
        e.preventDefault();
        if (phone.length === 10) {
            setPhoneError(false)
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "firstName": fname,
                "lastName": lname,
                "emailAddress": email,
                "phoneNumber": phone,
                "avatarPath": avatar
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost/user", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            handleClose();

        }
        else {
            setPhoneError(true)
        }
    }


    return (
        <div className="header">
            <div className="contact-icon">
                <ContactsIcon />
                <h4>Contacts</h4>
            </div>
            <div className="add-contact" onClick={handleClickOpen}>
                +
            </div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className="add-fields">
                    <form onSubmit={postData}>
                        <input type="text" name="fname" value={fname} onChange={onchangefHandler} placeholder="First Name" required /><br />
                        <input type="text" name="lname" value={lname} onChange={onchangelHandler} placeholder="Last Name" required /><br />
                        <input type="number" name="phone" value={phone} onChange={onchangephoneHandler} placeholder="Phone" required pattern="^\d{10}$" /><br />
                        {phoneError === true ? <p className="errorMessage">Phone Number must be of 10 digits</p> : null}
                        <input type="email" name="email" value={email} onChange={onchangeemailHandler} placeholder="Email" required /><br />
                        <input type="text" name="avatar" value={avatar} onChange={onchangeAvatarHandler} placeholder="Avatar URL" required /><br /><br />
                        <input className="submit" type="submit" value="Submit" />

                    </form>
                </div>
            </Modal>

        </div>
    );
}

export default Header;
