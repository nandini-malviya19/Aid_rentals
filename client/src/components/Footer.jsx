import { useEffect, useState } from "react";
import "./footer.css";

const Footer = () => {


  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Countries</li>
          <li className="fListItem">Regions</li>
          <li className="fListItem">Cities</li>
          <li className="fListItem">Districts</li>

          <li className="fListItem">Hospitals</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Beds </li>
          <li className="fListItem">Oxygen </li>
          <li className="fListItem">Cough Suction </li>
          <li className="fListItem">Ventilator</li>
          <li className="fListItem">Oxygen Mask</li>
          <li className="fListItem">Air Bed</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Compounder</li>
          <li className="fListItem">Reviews</li>
          <li className="fListItem">Compounder: Compounder articles </li>
          <li className="fListItem">Compounder Compounder </li>
          <li className="fListItem">Compounder and Compounder </li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Curtomer Service</li>
          <li className="fListItem">Partner Help</li>

          <li className="fListItem">Press center</li>
          <li className="fListItem">Safety Resource Center</li>

          <li className="fListItem">Terms & conditions</li>
        </ul>
      </div>
      <div className="fText">Copyright © {currentYear} Major.</div>
    </div>
  );
};

export default Footer;