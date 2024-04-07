import { useEffect, useState } from "react"
import "./mail.css"

const Mail = () => {

  const [mail, setMail] = useState("")

const handleChange = (e)=>{
  // console.log(mail);
  setMail(e.target.value);
}

const handleSubmit =()=>{
  alert("mail added to");
}

 


  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send information to you</span>
      <div className="mailInputContainer">
        <input
          type="text"
          placeholder="Your Email"
          value={mail}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Subscribe</button>
      </div>
    </div>
  )
}

export default Mail