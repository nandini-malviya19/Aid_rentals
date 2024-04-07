import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./searchItem.css";
import { Tooltip, Typography } from "@mui/material";
import axios from "axios"
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';


const SearchItem = ({ item, type, getInv }) => {
    const navigate = useNavigate();


    const handleItemsClick = (item) => {
        //idhr change krna h ab
        // console.log(item);
        console.log("clicked");
        navigate(`/item-detail/${item._id}`, { state: item })
    }

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    };
    //make this in Profilr



    const handleTogglerClick = async (item) => {
        console.log("wuff", item._id);
        const _id = item._id;

        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };

            const { data } = await axios.patch("http://localhost:8000/api/v1/inventory/set-rent", {
                _id
            }, config);
            getInv();
            console.log(data);

        } catch (error) {
            console.log(error);
        }

    }

    // console.log(item);



    return (
        <div className="searchItem">
            <img
                src={item.image[0]}
                alt=""
                className="siImg"
            />
            <div className="siDesc">
                <div style={{ display: "flex" }}>
                    <h1 className="siTitle">{item.name}</h1>
                    {true && (
                        <>
                            <Tooltip title="Verified" placement="top">
                                <span style={{ marginTop: "23px", color: "blue" }}><VerifiedUserIcon /></span>
                            </Tooltip>
                        </>
                    )}
                </div>
                <span className="siDistance">{item.life} yrs old</span>
                <span className="siTaxiOp">In best Condition</span>
                <span className="siSubtitle">
                    {truncateDescription(item.description, 100)}
                </span>


                <span className="siFeatures">
                    {item.tags.map((tag, index) => (
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
                    Prices are per day!
                </span>
            </div>
            <div className="siDetails">
                <div className="siRating">
                    <span>Excellent</span>
                    <button>{item.rating}.0⋆</button>

                </div>
                <div className="siDetailTexts">
                    <span className="siPrice">₹{item.rentalPrice} </span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    {item.isRented ? (
                        <button className="siCheckButton" style={{ backgroundColor: "red" }} onClick={() => handleItemsClick(item)}>Rented</button>

                    ) : (
                        <button className="siCheckButton" onClick={() => handleItemsClick(item)}>See availability</button>
                    )}
                    {type === "myProfile" && (
                        <button className="siCheckButton" onClick={() => handleTogglerClick(item)}>Togggle to Rent</button>

                    )}

                </div>
            </div>
        </div>
    );
};

export default SearchItem;

