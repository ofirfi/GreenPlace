import React, { Component } from "react"
import { Text,TouchableOpacity,Picker, Alert} from "react-native"
import { View, Button } from "native-base"
import { Header} from "react-native-elements"
import MapView , {PROVIDER_GOOGLE,Marker, Callout} from 'react-native-maps'
import firebase from '../config/Firebase'
import 'react-navigation'


class Map extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pickerSelectedLabel:'',
            latitude:'',
            longitude:'',
            myCoordinates: [{latitude:31.756106, longitude:35.165988, name: "נועם",description: "שלום", type:"dsf"},{latitude:31.756116, longitude:35.165088, name: 3,description: "blabla", type:"dsf"}]
        };
    }

    clickOnMap(){
        Alert.alert( 'הוספת מקום','האם אתה רוצה להוסיף את המקום למפה?',
        [{text: 'לא', onPress: ()=> {return}},
        {text: 'כן', onPress: () => this.yesPressed()}])
    }

    yesPressed(){
        if(this.props.navigation.state.params.user === "")
            Alert.alert("נא להרשם/להתחבר כדי להוסיף מקום למפה");
        else
            this.props.navigation.navigate('AddLocation',{latlng: {latitude: this.state.latitude, longitude: this.state.longitude}})
    }

    displayCoordinates(myCoordinates) {
        return(
            myCoordinates.map((coordinate, i) => (
                
			    <Marker coordinate = {{latitude: coordinate.latitude, longitude: coordinate.longitude}}
                onPress={(event)=>this.showPlace(event)}
                
                >
                </Marker>
            ))
        )
    }

    showPlace(event){
        var place = this.state.myCoordinates.filter((coordinate,i) => {
            return(coordinate.latitude==event.nativeEvent.coordinate.latitude && coordinate.longitude==event.nativeEvent.coordinate.longitude)

        });
        Alert.alert(""+place[0].name, ""+place[0].description,
        [{text: 'יציאה', onPress: ()=> {return}},
        {text: 'מחיקת מקום', onPress: ()=> this.deletePlace()},
        {text: 'עריכת מקום', onPress: (place) => this.updatePlace(place)}])
    }

    updatePlace(place){
        if(this.props.navigation.state.params.user === "")
            Alert.alert("נא להרשם/להתחבר כדי לערוך מקום במפה");
        else
            this.props.navigation.navigate('AddLocation', {place: place[0]});
    }

    deletePlace(){
        if(this.props.navigation.state.params.user === "")
            Alert.alert("נא להרשם/להתחבר כדי למחוק מקום מהמפה");
        else
            return;
    }

    show=(value)=>
    {
        this.setState({pickerSelectedLabel:value});
    }


    headerButton()
    {
        return(<TouchableOpacity
                title = "signOut"
                style={styles.returnButton}
                onPress={()=>this.buttonUser()}>
                <Text style = {styles.returnButtonText}>{this.props.navigation.state.params.btn}</Text>
            </TouchableOpacity>)
    }

    buttonUser()
    {
        if(this.props.navigation.state.params.user === "")
            this.props.navigation.goBack();
        else
            firebase.auth().signOut()
            .then(()=>{
                this.props.navigation.navigate('Login')
            })
            .catch(()=> Alert.alert("ההתנתקות נכשלה"));
    }

    render(){
        return(
            <View>
                <Header 
                    backgroundColor="#e6ffe6"
                    rightComponent = {()=>this.headerButton()}
                >  
                </Header>
                <View style={{width:"70%" , left:"1%"}}>
                    <Picker 
                        selectedValue={this.state.pickerSelectedLabel}
                        onValueChange={this.show.bind()}
                        style={{position:'absolute',left:0 , bottom:10 , right:5}}>
                        <Picker.Item label="בחר קטגוריה" value="1" ></Picker.Item>
                        <Picker.Item label="אתר פריחה" value="2"></Picker.Item>
                        <Picker.Item label="אתר צפרות וצפיית חיות בר" value="3"></Picker.Item>
                        <Picker.Item label="גינה ציבורית" value="4"></Picker.Item>
                        <Picker.Item label="גינה קהילתית" value="5"></Picker.Item>
                        <Picker.Item label="חנות אופניים" value="6"></Picker.Item>
                        <Picker.Item label="חנות טבע" value="7"></Picker.Item>
                        <Picker.Item label="חנות יד שניה" value="8"></Picker.Item>
                        <Picker.Item label="ספריית רחוב" value="9"></Picker.Item>
                        <Picker.Item label="עץ פרי" value="10"></Picker.Item>
                        <Picker.Item label="פח מיחזור" value="11"></Picker.Item>
                        <Picker.Item label="צמח מאכל ומרפא" value="12"></Picker.Item>
                        <Picker.Item label="קומפוסטר" value="13"></Picker.Item>  
                    </Picker>
                    
                </View>
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 31.756106,
                            longitude: 35.165088,
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.001
                        }}
                        onPress={(event)=>{
                            this.setState({
                                latitude: event.nativeEvent.coordinate.latitude,
                                longitude: event.nativeEvent.coordinate.longitude
                            });
                            this.clickOnMap();
                        }}
                        >
                        
                        {this.displayCoordinates(this.state.myCoordinates)}
                        
                    </MapView>
                </View>
            </View>
        )
    }
}

export default Map;

const styles = {
    buttonTextStyle:{
        fontSize : 20,
        color : "white",
    },

    returnButton:{
        backgroundColor:'#006400',
        color: "#fff",
        borderRadius: 26,
        fontSize: 20,
        width: 60,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 35,
        left: -10,
        top: -10
    },

    returnButtonText:{
        fontSize : 15,
        color : "white",
    },

    map: {
        height:'100%'
    },

}

                        /*<Marker
                            coordinate={{latitude:31.756106, longitude:35.165088}}>

                            <Callout onPress={()=>this.props.navigation.navigate('AddLocation')}><Button><Text>הוספת מקום</Text></Button></Callout>
                        </Marker> 

                        <Marker
                            coordinate={{latitude:31.756806, longitude:35.165088}}>

                            <Callout onPress={()=>this.props.navigation.navigate('AddLocation')}><Button><Text>הוספת מקום</Text></Button></Callout>
                        </Marker> 

                        <Marker
                            coordinate={{latitude:31.756106, longitude:35.165988}}>

                            <Callout onPress={()=>this.props.navigation.navigate('AddLocation')}><Button><Text>הוספת מקום</Text></Button></Callout>
                        </Marker> 

                        <Marker
                            coordinate={{latitude:31.756306, longitude:35.165988}}>

                            <Callout><Text>גינה קהילתית</Text></Callout>
                        </Marker> 

                        <Marker
                            coordinate={{latitude:31.756106, longitude:35.166988}}>

                            <Callout><Text>חנות טבע</Text></Callout>
                        </Marker> */