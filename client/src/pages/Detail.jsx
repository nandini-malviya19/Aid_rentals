import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Mail from "../components/MailList/Mail";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./css/detail.css"
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation } from "react-router-dom";
import Map from "../components/Map/Map";
import RentForm from "../components/RentForm/RentForm";
import ShowDetails from "../components/ShowDetails/ShowDetails";
import ReCAPTCHA from "react-google-recaptcha";


const Detail = () => {
  const { state } = useLocation();
  console.log(state);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [captchaClicked, setCaptchaClicked] = useState(false);



  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  const [visibility, setVisibility] = useState(false);
  const toggleShow = () => {
    setVisibility(!visibility);
  };

  function onChange(value) {
    console.log("Captcha value:", value);
    setCaptchaClicked(true);
  }
  const handledowncllick = () => {
    window.scrollTo({ top: 999, behavior: 'smooth' })
    console.log("clickd");

  }

  useEffect(() => {
    setCaptchaClicked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div>
      <Navbar />
      <Header type={"list"} />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <CloseIcon className="close" onClick={() => setOpen(false)} />

            <ArrowBackIcon className="arrow" onClick={() => handleMove("l")} />

            <div className="sliderWrapper">
              <img
                src={state.image[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>
            <ArrowForwardIcon
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}

        <div className="hotelWrapper">
          {state.isRented ? (

            <>
              <button className="bookNow" style={{ backgroundColor: "red" }}>Rented</button>

            </>


          ) : (

            <>
              <button className="bookNow"
                onClick={handledowncllick}
                
              >
                Rent
              </button>

            </>
          )}
          <h1 className="hotelTitle">{state.name}</h1>
          <div className="hotelAddress">
            {state.tags.map((tag) => {
              return (
                <span
                  key={tag}
                  style={{
                    backgroundColor: "#febb02",
                    fontSize: "0.8rem",
                    padding: "5px",
                    color: "#003580",
                    borderRadius: "9px",
                  }}
                >
                  {tag}{" "}
                </span>
              );
            })}
          </div>
          {isFormVisible && (
            <RentForm
              state={state}
              toggleForm={toggleForm}
              toggleShow={toggleShow}
            />
          )}

          {visibility && (
            <ShowDetails
              state={state}
              visibility={visibility}
              setVisibility={setVisibility}
            />
          )}
          <span className="hotelDistance">
            Excellent location – {state.address}, {state.city}
          </span>
          <span className="hotelPriceHighlight">
            Rent these items at the cheapest price.
          </span>
          <div className="hotelImages">
            {state.image.map((photo, i) => (
              <div
                key={i}
                style={{
                  width: '33%',
                  marginBottom: '3px'
                }}
              >
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                />
              </div>
            ))}
          </div>


          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              {/* <h1 className="hotelTitle">{state.name}</h1> */}
              <p className="hotelDesc">{state.description}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Rent Now!</h1>
              <span>
                By Renting we will provide you with the details of the owner
                contact him directly, we will also provide your details to him.
              </span>
              <h2>
                <b>₹{state.rentalPrice}</b> (per day)
              </h2>
              {state.isRented ? (

                <button style={{ backgroundColor: "red" }} onClick={()=> alert("Item already rented")}>Rented</button>

              ) : (
                <>
                  <button onClick={toggleForm} disabled={!captchaClicked} >Rent</button>
                  <ReCAPTCHA
                    sitekey="6Lc7sr8oAAAAABPYEpja1v5r_c3SC9yceQp_Ll1O"
                    onChange={onChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            height: "100%",
            width: "100%",
            maxWidth: "1024px",
            padding: "20px",
          }}
        >
          <Map city={state.city} address={state.address} zip={state.zip} />
        </div>

        <Mail />
        <Footer />
      </div>
    </div>
  );
};

export default Detail;