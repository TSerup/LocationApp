import React, {useState, useEffect} from 'react';
import { Text, View} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, {Marker} from 'react-native-maps'; 
import styles from './styles';

export default function App () {
  
  // State variable to contain latitude and longitude
  const [location, setLocation] = useState({latitude: null, longitude: null});
  // State variable to display if access denied
  const [errorMessage, setErrorMessage] = useState("");
  // State variable to contain street, city etc.
  const [geo, setGeo] = useState({street:"", city:"", postalCode:"", country:""});
  // Region to show
  const [region, setRegion] = useState({
    latitude: 56.09691311,
    longitude: 8.6106467,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  // Runs after every render 
  useEffect(()=>{
    getLocationAsync()
  })

  // Find latitude and longitude
  const getLocationAsync = async () => {
    // Get permission for app to use locations
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      // Change state for 'errorMessage' variable
      setErrorMessage('Permission to access location was denied');
    }
    // 6 states of accuracy
    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    const { latitude , longitude } = location.coords
    getGeocodeAsync({latitude, longitude})
    // Change state for 'location' variable
    setLocation({latitude, longitude});
    // Sets the region to the same as device location. Used for both map region and marker 
    setRegion({latitude: latitude, longitude: longitude, latitudeDelta: 0.01, longitudeDelta: 0.01})
  };
  // Find location (street, city etc.) from lat. and lon.
  const getGeocodeAsync= async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location)
    // Change state for 'geo' variable
    setGeo(geocode[0]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>{geo  ? `${geo.postalCode}, ${geo.city}` :""}</Text>
      <Text style={styles.heading2}>{geo ? geo.street:""}</Text>
      <Text style={styles.heading3}>{location ? `${location.latitude}, ${location.longitude}` :""}</Text>
      <Text style={styles.heading2}>{errorMessage}</Text>      
      <MapView
        style={styles.map}
        region={region}
        maxZoomLevel={10}>
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
      </MapView>  
    </View>
    );
}