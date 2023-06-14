import "./App.css";
import { useState, useEffect } from "react";
import { Box, CssBaseline, Grid } from "@mui/material";
import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [repairs, setRepairs] = useState(true);
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  // useEffect(() => {
  //   // built in browser geo-location api
  //   navigator.geolocation.getCurrentPosition(
  //     ({ coords: { latitude, longitude } }) => {
  //       setCoordinates({ lat: latitude, lng: longitude });
  //     }
  //   );
  // }, []);

  // useEffect(() => {
  //   const filteredPlaces = places.filter((place) => place.rating > rating);

  //   setFilteredPlaces(filteredPlaces);
  // }, [rating, places]);

  // useEffect(() => {
  //   if (bounds.sw && bounds.ne) {
  //     setIsLoading(true);

  //     getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
  //       setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
  //       setFilteredPlaces([]);
  //       setIsLoading(false);
  //     });
  //   }
  // }, [type, bounds]);

  return (
    <>
      {repairs ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              padding: "350px",
            }}
          >
            <h1>
              Sorry! RapidApi has usage limits and this app has reached it. Come
              back on 6/17/2023 to view this site! Please view the{" "}
              <a
                href="https://github.com/JiBang92/travel-advisor-companion-app"
                target="_blank"
                rel="noreferrer"
              >
                Read Me
              </a>{" "}
              on GitHub in the meantime :&#41;
            </h1>
          </Box>
        </>
      ) : (
        <>
          <CssBaseline />
          <Header setCoordinates={setCoordinates} />
          <Grid container spacing={3} style={{ width: "100%" }}>
            <Grid item xs={12} md={4}>
              <List
                places={filteredPlaces.length ? filteredPlaces : places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Map
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                places={filteredPlaces.length ? filteredPlaces : places}
                setChildClicked={setChildClicked}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default App;
