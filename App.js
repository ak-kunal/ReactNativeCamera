import React, { Component ,useState} from 'react';
import { StyleSheet,Image,TouchableOpacity,Button,Text, View, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio,Video } from 'expo-av';
import * as Permissions from 'expo-permissions';
import base64 from 'react-native-base64'



let record="off";
export default class App extends Component
{

  state=
  {
      hasPermission:null,
      result:"",
      secret_key : "sk_64c453e82a545f68385295f7",
      setHasPermission:null,
      type:Camera.Constants.Type.back,
      img:"https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg",
      plate: 'Scan a plate',
      
  }

  onPlateRecognized = ({ plate, confidence }) => {
    this.setState({
      plate,
    })
  }


  getPermissions=async()=>
  {

    const { status } = await Camera.requestPermissionsAsync();
   await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
    hasPermission:status
  });
  }

  onPressCheck=()=>
  {
    if(this.state.type===Camera.Constants.Type.back)
    {
      this.setState({
        type:Camera.Constants.Type.front
      });
    }
    else
    {
      this.setState({
        type:Camera.Constants.Type.back
      });
    }
  }

  onPressCheck2=async()=>
  {

    
    if(record==="off")
    {
      record="on"
      // Alert.alert("ON");
    let photo=await this.camera.takePictureAsync();
    
    this.setState({
      img:photo.uri,
    
    });
    // Alert.alert(this.state.img);
    }
    // else
    // {
      
    //   await this.camera.stopRecording();
    //     record="off"
    //     // Alert.alert("End");
    // }

    let localUri = this.state.img;
    let filename = localUri;  
  }

 constructor(props)
 {
  super(props);
  this.getPermissions();
}
 
    
  render() {

   
    return(
      <View style={{ flex: 1 }}>
        <Camera 
      
        ref={
          ref=>{
            this.camera=ref;
          }
        } style={{ flex: 1 }}type={this.state.type}>

    
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>

      
        
          <TouchableOpacity
            style={{
              flex: 0.3,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
             this.onPressCheck()
          
            }}>
            <Text style={{marginBottom:50,color:"#ffffff",fontSize:25}}> Flip </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 0.3,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
             this.onPressCheck2()
            }}>
            <Text style={{marginBottom:50,color:"#ffffff",fontSize:25}}> Click </Text>
          </TouchableOpacity>

          <Text>{this.state.plate}</Text>

          {/* <Video
          source={{ uri: this.state.img }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ flex: 0.4,
              alignSelf: 'flex-end',
              alignItems: 'center',width: 150, height: 150}}
        /> */}
          <Image
          style={{ flex: 0.4,
              alignSelf: 'flex-end',
              alignItems: 'center',width: 150, height: 150}}
          source={{uri: this.state.img}}
        />
        </View>
      </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: 100,
    left: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});
