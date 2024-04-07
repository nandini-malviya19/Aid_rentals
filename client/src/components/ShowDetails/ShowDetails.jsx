import React, { useEffect, useState } from 'react'
import "./showDetails.css"
import axios from "axios"
import { Oval } from 'react-loader-spinner'


const ShowDetails = ({ state, visibility, setVisibility }) => {
  const o = { owner: state.owner }
  const [ownerData, setOwnerData] = useState(null);


  const find = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const { data } = await axios.post('http://localhost:8000/api/v1/getowner', o, config);
      console.log(data);
      setOwnerData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    find();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setVisibility(false);
      alert("mail sent")
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const { data } = await axios.post(
        'http://localhost:8000/api/v1/sendMail',
        ownerData,
        config
      );
      console.log(data);
      console.log("mail sent");



    } catch (error) {
      console.log(error);
    }


  }

  return (
    <div className='overlay'>
      {visibility && (
        <div className='second-detail' style={{ backgroundColor: "white", height: "400px", width: "400px" }}>

          <div className='second-content'>
            <h4>Owner Details are :</h4>
            {ownerData ? (
              <div className='send-mail'>
                <h2>{ownerData?.data.role}</h2>
                <p>Name: {ownerData.data.name}</p>
                <p>Email: {ownerData?.data.email}</p>
                <p>Phone No.: {ownerData?.data.phoneNumber}</p>
              </div>
            ) : (
              <Oval
                height={80}
                width={80}
                color="blue"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="black"
                strokeWidth={2}
                strokeWidthSecondary={2}

              />
            )}


          </div>
          <div className='showdet-btn'>
            <button onClick={handleSubmit}>Send Mail</button>
            <button onClick={() => setVisibility(false)}>Close</button>



          </div>


        </div>
      )}
    </div>
  )
}

export default ShowDetails