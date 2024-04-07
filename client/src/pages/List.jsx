import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import SearchItem from '../components/SearchItem/SearchItem';
// import Pagination from '../components/Pagination/Pagination';
import './css/list.css';
import { searchItems } from '../constants/constant';
import Mail from '../components/MailList/Mail'
import Footer from '../components/Footer'
import { Pagination } from '@mui/material';
import axios from 'axios';
import DummyAds from '../components/DummyAds/DummyAds';



const List = () => {
  const { state } = useLocation();
  // console.log(state,"search");
  const navigate = useNavigate();
  // console.log(location.state?.searchItem);

  const [searchItem, setSearchItem] = useState(state?.searchItem);
  console.log(searchItem);


  const [inventories, setInventories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getInventory = async (page) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(`http://localhost:8000/api/v1/inventory/get?page=${page}`, config);
      setInventories(response.data.inventories);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    const page = pageParam ? parseInt(pageParam) : 1;
    getInventory(page);
    setCurrentPage(page);
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({ page }, '', url);
    getInventory(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const [searchName, setSearchName] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const handleSearch = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const { data } = await axios.get(`http://localhost:8000/api/v1/inventory/get-inventory`, {
        params: {
          name: searchName,
          city: searchCity,
        },
        ...config,
      });

      setInventories(data.item);
      console.log(data);
      setCurrentPage(1); // Reset page to 1 after search
      setTotalPages(1); // Reset total pages after search
    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  };






  //
  return (
    <div>
      <Navbar />
      <Header type={'list'} />

      <div className="listContainer">
        <div className="listWrapper" >
          <div>
            <div className="listSearch">
              <h1 className="lsTitle">Search </h1>
              <div className="lsItem">
                <label>Name</label>
                <input
                  placeholder={"Search by name"}
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="lsItem">
                <label>City</label>
                <input
                  placeholder={"Search by city"}
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
              <button onClick={handleSearch}>Search</button>
            </div>

            <DummyAds />
            <DummyAds />

          </div>
          <div className="listResult">
            {inventories && inventories.map((item) => (
              <SearchItem
                key={item._id}
                item={item}
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
  );
};

export default List;