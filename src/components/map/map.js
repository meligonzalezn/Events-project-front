
import { Divider, Grid, TextField } from "@mui/material";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";


export default function MapRender() {
  
  const [markerValue , setMarkerValue] = useState({ lat: 48.85, lng: 2.2945 });
  const place = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <Divider/>;
    //To do: Add something to show while map loads
  }


  const setNewAddress = () => {
    //Value of the texfield  = place.current.children[1].children[0].value 
    const geocoder = new google.maps.Geocoder()
    //Geocode takes the address of the selected place and convert it into a location for the maps marker 
    geocoder.geocode( { 'address':place.current.children[1].children[0].value}, function(results, status) {
      if (status == 'OK') {
        setMarkerValue(results[0].geometry.location)
      } else {
        alert('Por favor verifique la dirección ingresada');
      }
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={12} xs={12}>
        <Autocomplete onPlaceChanged={setNewAddress}> 
          <TextField
            fullWidth
            label="Título"
            name="place"
  
            required
            placeholder={""}
            ref={place}
            variant="outlined"
          />
        </Autocomplete>
      </Grid>
      <Grid item md={12} xs={12}>
        <GoogleMap center={markerValue} zoom={10} mapContainerStyle={{ width: "100%", height: "17rem" }}>
          <Marker   position={markerValue} />
          {/* <Marker position={markerValue} draggable={true} onDrag={newDirection} /> */}
        </GoogleMap>
      </Grid>
    </Grid>
  );
}
