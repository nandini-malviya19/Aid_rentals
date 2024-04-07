import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./serviceBox.css";
import { Typography } from "@mui/material";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Tooltip } from '@mui/material';

const ServiceBox = ({ service }) => {
    const navigate = useNavigate();



    const handleItemsClick = (service) => {
        //idhr change krna h ab
        // console.log(item);
        console.log("clicked");
        navigate(`/service-detail/${service._id}`, { state: service })
    }

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    };




    return (
        <div className="searchItem">
            <img
                src={service.pic}
                alt=""
                className="siImg"
            />
            <div className="siDesc">
                <div style={{ display: "flex" }}>
                    <h1 className="siTitle">{service.name}</h1>
                    {service.verified && (
                        <>
                            <Tooltip title="Verified" placement="top">
                                <span style={{ marginTop: "23px", color: "blue" }}><VerifiedUserIcon /></span>
                            </Tooltip>
                        </>
                    )}

                </div>
                <span className="siDistance">{service.age} yrs old</span>
                <span className="siTaxiOp">{service.city}</span>
                <span className="siSubtitle">
                    {truncateDescription(service.bio, 100)}
                </span>


                <span className="siFeatures">
                    {service.specialty.map((tag, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && ' • '}
                            {tag}
                        </React.Fragment>
                    ))}
                </span>

                {/* <span className="siFeatures">
                    tag1 • tag2 • tag3
                </span> */}
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                    Prices are per visit!
                </span>
            </div>
            <div className="siDetails">
                <div className="siRating">
                    <span style={{ opacity: "0" }}>{service.city}</span>

                    <button>{"3"}⋆</button>
                </div>
                <div className="siDetailTexts">
                    <span className="siPrice">₹{service.price} </span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <button className="siCheckButton" onClick={() => handleItemsClick(service)}>See availability</button>
                </div>
            </div>
        </div>
    );
};

export default ServiceBox;

