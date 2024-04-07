import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { useUserContext } from '../context/UserContext';
import Profile from '../components/Profile';
import Footer from '../components/Footer'
import Mail from '../components/MailList/Mail';
import "./css/viewInfo.css"
import axios from 'axios';
import SearchItem from '../components/SearchItem/SearchItem';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ViewInfo = () => {
    const { user } = useUserContext();
    const [items, setItems] = useState([]);
    const [myService, setMyService] = useState(null);
    const [aadharIp, setAadharIp] = useState(false);
    const [aadharValue, setAadharValue] = useState('');
    const [loading, setLoading] = useState(true);
    const address = user?.address;
    const name = user?.name;
    const phone = user?.phoneNumber;
    const city = user?.city;
    const role = user?.role;
    const email = user?.email;
    const zip = user?.zip;
    const id = user?._id;

    const handleInputChange = (e) => {
        setAadharValue(e.target.value);
        console.log(aadharValue);
    }
    const getMyService = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };
            // setLoading(true);
            // Make a GET request to your API endpoint
            const { data } = await axios.get(`http://localhost:8000/api/v1/service/my-service?owner=${id}`, config);
            // Set the service data to state
            setMyService(data.data);
            setLoading(false);
            console.log(data.data, "test");
        } catch (error) {
            setLoading(false);

            console.log(error);
        }
    }
    const handleVerification = async () => {
        // e.preventDefault();
        console.log('handleVerification called');
        try {
            console.log(aadharValue);
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };
            //http://localhost:8000/api/v1/service/verify
            const { data } = await axios.post(`http://localhost:8000/api/v1/service/verify`, {
                "aadhar": aadharValue,
                "id": myService._id
            }, config);

            console.log(data);
            alert("verification request sent")
            setAadharIp(false);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        // Check if user id is available before making the request
        if (id) {
            getMyService(id);
        }
    }, [id]); // Trigger the effect whenever id changes

    return (
        <div>
            <Navbar />
            <Header type="list" />

            {myService && (

                <div>
                    {loading ?
                        (
                            <p>Loading</p>

                        ) : (


                            <Profile
                                name={myService.name}
                                bio={myService.bio}
                                city={myService.city}
                                email={myService.email}
                                phone={myService.phoneNumber}
                                gender={myService.gender}
                                pic={myService.pic}
                                preferredAreas={myService.preferredAreas}
                                price={myService.price}
                                reviews={myService.reviews}
                                specialty={myService.specialty}
                                verified={myService.verified}
                                workingHours={myService.workingHours}
                                yoe={myService.yoe}
                            />
                        )}
                </div>

            )}
            {aadharIp && (
                <div className='overlay ' >
                    <div className='aadhar'>
                        <div className='form-aadhar' >
                            <form >
                                <label style={{ fontWeight: "bolder" }}>Enter Aadhar Number:</label>
                                <br />
                                <input type="text"
                                    name='aadhar'
                                    value={aadharValue}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', margin: '10px auto' }}
                                />
                            </form>
                        </div>
                        <div className='aadhar-btn'>
                            <button className='aadhar-ver' onClick={async (e) => { e.preventDefault(); await handleVerification(); }}>Verify</button>
                            <button className='aadhar-ver' onClick={() => { setAadharIp(false) }}>Close</button>
                        </div>

                    </div>

                </div>
            )}



            {myService?.verified === true ? (
                <div className='edit-div' >
                    <button className='edit-btn'  >Verified</button>
                </div>
            ) : (


                <div className='edit-div' >
                    <button className='edit-btn' onClick={() => { setAadharIp(true) }} >Verify Yourself</button>
                </div>
            )}

            {/* <div onSubmit={handleVerification}>Verify</div> */}
            <Mail />
            <Footer />

        </div>
    )

}

export default ViewInfo
