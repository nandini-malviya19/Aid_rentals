import React from 'react'
import "./itemlist.css"

const Itemlist = () => {
  return (
    <div className="pList">
    <div className="pListItem">
      <img
        src="https://www.holidify.com/images/cmsuploads/compressed/3551_20190228103219.jpg"
        alt=""
        className="pListImg"
      />
            <div className="pListTitles">
        <h1>Indore</h1>
      </div>
    </div>
    <div className="pListItem">
      <img
       src="https://img.etimg.com/thumb/msid-94741949,width-300,height-225,imgsize-270960,,resizemode-75/shri-mahakal-lok.jpg"
        alt=""
        className="pListImg"
      />
      <div className="pListTitles">
        <h1>Ujjain</h1>
      </div>
    </div>
    <div className="pListItem">
      <img
      src="https://www.livelaw.in/h-upload/2023/07/14/750x450_481164-bhopal-lake.webp"
        alt=""
        className="pListImg"
      />
      <div className="pListTitles">
        <h1>Bhopal</h1>
      </div>
    </div>
    <div className="pListItem">
      <img
        src="https://www.nationsonline.org/gallery/India/Gateway-of-India.jpg"
        alt=""
        className="pListImg"
      />
      <div className="pListTitles">
        <h1>Mumbai</h1>
        
      </div>
    </div>
    <div className="pListItem">
      <img
        src="https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg"
        alt=""
        className="pListImg"
      />
      <div className="pListTitles">
        <h1>Delhi</h1>
        
      </div>
    </div>
  </div>
  )
}

export default Itemlist