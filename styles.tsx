import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    overlay:{
      backgroundColor:"#00000090",
      height:"100%",
      width:"100%",
      justifyContent:"center",
      alignItems:"center"
    },
    heading1:{
      color:"#000",
      fontWeight:"bold",
      fontSize:30,
      margin:20
    },
    heading2:{
      color:"#000",
      margin:5,
      fontWeight:"bold",
      fontSize:15
    },
    heading3:{
      color:"#000",
      margin:5
    },
    map: {
      width: Dimensions.get('window').width,
      height: (Dimensions.get('window').height)/2

    },
  });
  export default styles;