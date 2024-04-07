import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

import ServiceBox from '../components/ServiceBox/ServiceBox';

import './css/list.css';

import Mail from '../components/MailList/Mail'
import Footer from '../components/Footer'
import { Pagination } from '@mui/material';
import axios from 'axios';



const Services = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [options, setOptions] = useState({
    name: '',
    specialty: '',
    city: '',
  });

  const getServices = async (page) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(`http://localhost:8000/api/v1/service/get-services?page=${page}`, config);
      setServices(response.data.services);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    const page = pageParam ? parseInt(pageParam) : 1;

    getServices(page);
    setCurrentPage(page);
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({ page }, '', url);
    getServices(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/service/get-service`, {
        params: {
          name: options.name,
          specialty: options.specialty,
          city: options.city,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      setServices(response.data.data);
  
      const url = new URL(window.location);
      url.searchParams.set('name', options.name);
      url.searchParams.set('specialty', options.specialty);
      url.searchParams.set('city', options.city);
  
      window.history.pushState({}, '', url);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  



  return (
    <div>
      <Navbar />
      <Header type={"list"} />

      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search </h1>
            <div className="lsItem">
              <label>Name</label>
              <input
                placeholder={"Search by name, tags, location"}
                type="text"
                value={options.name}
                onChange={(e) => setOptions({ ...options, name: e.target.value })}
              />
            </div>
            <div className="lsItem">
              <label>Specialty</label>
              <input
                placeholder={"Search by specialty"}
                type="text"
                value={options.specialty}
                onChange={(e) => setOptions({ ...options, specialty: e.target.value })}
              />
            </div>
            <div className="lsItem">
              <label>City</label>
              <input
                placeholder={"Search by city"}
                type="text"
                value={options.city}
                onChange={(e) => setOptions({ ...options, city: e.target.value })}
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {services.map((service) => (

              <ServiceBox
                key={service._id}
                service={service}
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          boundaryCount={1}
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
      <Mail />

      <Footer />
    </div>
  )
}

export default Services