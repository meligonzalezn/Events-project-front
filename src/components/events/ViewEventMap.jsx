import { Divider, Grid, TextField, Card, CardHeader, CardContent } from "@mui/material";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import LinearLoader from "../loaders/LinealLoader";
import { useRef, useState, useEffect } from "react";

export default function MapComponentView ({ place }) {    
    const [markerValue, setMarkerValue] = useState({ lat: 48.85, lng: 2.2945 });
    const [loadingAddress, setLoadingAddress] = useState(true);
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    });

    useEffect(() => {
        if(!isLoaded) return 

        /**
         * Transforma la dirección en un objeto {lat: , lng: } para el marcador de ubicación
         * en el mapa 
         */
         const getMarkerValue = () => {
            const geocoder = new google.maps.Geocoder();
            //Geocode takes the address of the selected place and convert it into a location for the maps marker
            console.log(place);
            geocoder.geocode(
              { address: place },
              function (results, status) {
                if (status == "OK") {
                  setMarkerValue(results[0].geometry.location);
                } else {
                  alert("Se presentó un error obteniendo la ubicación del evento");
                }
              }
            );
          };
      
    
        getMarkerValue();
      }, [isLoaded])

    if (!isLoaded ) {
      return <LinearLoader upperMessage="Cargando mapa"></LinearLoader>;
    }

    return (
      <Card >
        <CardHeader title="Ubicación" subheader={place} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <GoogleMap
                center={markerValue}
                zoom={17}
                mapContainerStyle={{ width: "100%", height: "17rem" }}
                options={{ streetViewControl: false }}
              >
                <Marker position={markerValue} />
                {/* <Marker position={markerValue} draggable={true} onDrag={newDirection} /> */}
              </GoogleMap>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />
      </Card>
    );
};

