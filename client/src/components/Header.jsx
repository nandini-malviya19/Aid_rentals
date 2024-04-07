import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import ChecklistRtl from '@mui/icons-material/ChecklistRtl';


const Header = ({ type }) => {
    const location=useLocation();
    const route=location.pathname;
    const [activeButton, setActiveButton] = useState(route);
    const [searchItem, setSearchItem]= useState("");

    const navigate = useNavigate();
    const handleOption = (name, operation) => {
      
    };

    const handleSearch = () => {
        console.log(searchItem);
        navigate("/explore",{state: {searchItem}});
    };
  const handleButtonClick = (redir) => {
    navigate(redir);
    setActiveButton(route);
  };

  return (
    <div className="header">
      <div
        className={
          type === "explore" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className={`headerListItem ${activeButton === '/' ? 'active' : ''}`} onClick={() => handleButtonClick('/')}>
          <div className="adjust"><HomeIcon /> <span className="lmarg">Home</span></div>  
          </div>
          <div className={`headerListItem ${activeButton === '/explore' ? 'active' : ''}`} onClick={() => handleButtonClick('/explore')}>
          <div className="adjust"><TravelExploreIcon/> <span className="lmarg">Explore</span></div>
          </div>
          <div className={`headerListItem ${activeButton === '/services' ? 'active' : ''}`} onClick={() => handleButtonClick('/services')}>
          <div className="adjust"><InfoSharpIcon /> <span className="lmarg">Services</span></div>
          </div>
          <div className={`headerListItem ${activeButton === '/ViewProfile' ? 'active' : ''}`} onClick={() => handleButtonClick('/ViewProfile')}>
          <div className="adjust"><ChecklistRtl/> <span className="lmarg">My Items</span></div>
          </div>
        </div>

        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Help because pata nhi kis roop m akr naryan mil jyega.
            </h1>
            <p className="headerDesc">
              Rent your medical instruments for the needy, keep prices low.
            </p>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <input
                  type="text"
                  placeholder="Whats your need?"
                  className="headerSearchInput"
                  onChange={(e) => setSearchItem(e.target.value)}
                />
              </div>

              <div className="headerSearchItem">
                {/* Using a regular HTML button instead of an undefined headerButton */}
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;