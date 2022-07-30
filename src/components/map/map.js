import { Divider, Grid, TextField, Card, CardHeader, CardContent } from "@mui/material";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import LinearLoader from '../loaders/LinealLoader';
import { useRef, useState } from "react";

/**
 * Formulario donde se digitarán los datos del usuario a crear.
 * 
 * @param {{}} initialPlaceValue  Can be "" or a place 
 * @returns React component.
 */
const MapComponent =  (initialPlaceValue) => {
  const [place, setPlace] = useState(initialPlaceValue);

  const MapRender = () => {
    const [markerValue, setMarkerValue] = useState({ lat: 48.85, lng: 2.2945 });
    const place = useRef();

    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    });

    if (!isLoaded) {
      return (<LinearLoader
        upperMessage='Cargando mapa'
      ></LinearLoader>);
      
    }

    const setNewAddress = () => {
      setPlace(place.current.children[1].children[0].value)
      //Value of the texfield  = place.current.children[1].children[0].value
      const geocoder = new google.maps.Geocoder();
      //Geocode takes the address of the selected place and convert it into a location for the maps marker
      geocoder.geocode(
        { address: place.current.children[1].children[0].value },
        function (results, status) {
          if (status == "OK") {
            setMarkerValue(results[0].geometry.location);
          } else {
            alert("Por favor verifique la dirección ingresada");
          }
        }
      );
    };

    return (
      <Card>
        <CardHeader title="Ubicación" subheader="¿Donde se realizará el evento?" />
        <Divider />
        <CardContent>

         <Grid container spacing={3}>
         <Grid item md={12} xs={12}>
           <Autocomplete onPlaceChanged={setNewAddress}>
            <TextField
              fullWidth
              label="Buscar"
              name="place"

              required
              placeholder={""}
              ref={place}
              variant="outlined"
            />
          </Autocomplete>
        </Grid>
        <Grid item md={12} xs={12}>
          <GoogleMap center={markerValue} zoom={17} mapContainerStyle={{ width: "100%", height: "17rem" } }
           options= {{streetViewControl: false}}>
            <Marker   position={markerValue} />
            {/* <Marker position={markerValue} draggable={true} onDrag={newDirection} /> */}
          </GoogleMap>
        </Grid>
      </Grid>

        </CardContent>

        <Divider />
      </Card>  
    );
  };

  const getPlace = () => {
    return place;
  };

  return { MapRender, getPlace };
};

export default MapComponent;
