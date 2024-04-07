import "./navbar.css"
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import AddForm from "./AddForm/AddForm";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import AddService from "./AddService/AddService";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const [showForm, setShowForm] = useState(false);
  const [showServiceForm, setShowServiceForm]= useState(false);

  const { user } = useUserContext();
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  const handleClick = () => {
    setShowForm(true);
  }


  const handleFormClose = () => {
    setShowForm(false); // Set showForm to false to close the form
    setShowServiceForm(false);
  };

  const handleServiceClick = () => {
    setShowServiceForm(true);
  }
  const navigate = useNavigate();
  const handleProfileClick=()=>{
    navigate("/View-Info");
  }

  return (
    <div>
      <div>
        {showForm && (
          <div className="overlay" >
            <AddForm setShowForm={setShowForm} showForm={showForm} handleFormClose={handleFormClose} />
          </div>
        )}

        {showServiceForm && (
          <div className="overlay" >
            <AddService setShowServiceForm={setShowServiceForm} showServiceForm={showServiceForm} handleFormClose={handleFormClose} />
          </div>
        )}
      </div>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo">AidRentals</span>
          <div className="navItems">
            <span className="nnnn" onClick={handleClick}><AddSharpIcon />Add item</span>
            {user?.role == "service" ? (
              <span className="nnnn"></span>
            ) : (

            <span className="nnnn" onClick={handleServiceClick}><AddSharpIcon />Add Service</span>
            )}
            <span className="nnnn" onClick={handleProfileClick}>{user?.name}<br />{user?.role}</span>
            <div onClick={() => handleLogout()}>
              <span className="nnnn"><LogoutSharpIcon />Sign Out</span>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Navbar