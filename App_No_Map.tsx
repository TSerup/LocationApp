import React, {useState, useEffect} from 'react';
import { Button, ImageBackground, Text, View} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import styles from './styles';

export default function App () {
  
  // State variable to contain latitude and longitude
  const [location, setLocation] = useState({latitude: null, longitude: null});
  // State variable to display if access denied
  const [errorMessage, setErrorMessage] = useState("");
  // State variable to contain street, city etc.
  const [geo, setGeo] = useState({street:"", city:"", postalCode:"", country:""});

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
  };
  // Find location (street, city etc.) from lat. and lon.
  const getGeocodeAsync= async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location)
    // Change state for 'geo' variable
    setGeo(geocode[0]);
  }
  return (
    <ImageBackground  source={require("./assets/gps.jpg")} blurRadius={0.5} style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.heading1}>{geo  ? `${geo.postalCode}, ${geo.city}` :""}</Text>
        <Text style={styles.heading2}>{geo ? geo.street:""}</Text>
        <Text style={styles.heading3}>{location ? `${location.latitude}, ${location.longitude}` :""}</Text>
        <Text style={styles.heading2}>{errorMessage}</Text>
      </View>
    </ImageBackground>);
}