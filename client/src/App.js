import * as React from "react";
import { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import "./app.css";

function App() {
  const [pins, setPins] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  useEffect(() => {
    const getPin = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPin();
  }, []);
  return (
    <Map
      initialViewState={{
        longitude: 2.294694,
        latitude: 48.858093,
        zoom: 4,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      mapboxAccessToken="pk.eyJ1IjoiY2hhaW5zdW5ueSIsImEiOiJjbGQzY2FmZGEwZ2JjM3hvOWwyMjVrOG9vIn0.28ZcJzg7SIPr5eDvTt6Skg"
    >
      {pins.map((p) => (
        <>
          <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
            <LocationOnIcon style={{ fontSize: 42 }} />
          </Marker>
          {showPopup && (
            <Popup
              longitude={2.294694}
              latitude={48.858093}
              anchor="left"
              onClose={() => setShowPopup(false)}
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">Eiffell Tower</h4>
                <label>Review</label>
                <p className="desc">Beautiful place. I like it.</p>
                <label>Rating</label>
                <div className="staers">
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>Chain</b>
                </span>
                <span className="date">1 hour ago</span>
              </div>
            </Popup>
          )}
        </>
      ))}
    </Map>
  );
}

export default App;
