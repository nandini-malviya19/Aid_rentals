import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { useUserContext } from '../context/UserContext';
import Profile from '../components/Profile';
import Footer from '../components/Footer'
import Mail from '../components/MailList/Mail';
import "./css/viewProfile.css"
import axios from 'axios';
import SearchItem from '../components/SearchItem/SearchItem';


const ViewProfile = () => {
    const { user } = useUserContext();
    const [items, setItems] = useState([]);

    const address = user?.address;
    const name = user?.name;
    const phone = user?.phoneNumber;
    const city = user?.city;
    const role = user?.role;
    const email = user?.email;
    const zip = user?.zip;
    const id = user?._id;


    const getInv = async () => {
        try {
            if (id) {

                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                };
                const { data } = await axios.get(`http://localhost:8000/api/v1/inventory/get-user-inv`, {
                    params: {
                        id: id
                    },
                    ...config,
                })
                setItems(data.inventory);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
            console.log("error  in fetching khud ke orders");
        }
    }

    useEffect(() => {
        getInv();
    }, [id])


    return (
        <div>
            <Navbar />
            <Header type="list" />

            {/* <Profile
                name={name}
                address={address}
                phone={phone}
                email={email}
                role={role}
                city={city}
                zip={zip}

            /> */}

            <h2 className='profile_head'>My Rented Items</h2>

            <div className='vgito'>

                <div className='isko-width'>
                    {items.map((i) => {
                        return (
                            <SearchItem
                                getInv={getInv}
                                key={i._id}
                                item={i}
                                type={"myProfile"}
                            />
                        )
                    })}
                </div>



            </div>

            <Mail />
            <Footer />


        </div>
    )
}

export default ViewProfile