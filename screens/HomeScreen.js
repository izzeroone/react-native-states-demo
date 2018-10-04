import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import NetworkService from '../service/NetworkService';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      color:'pink'
    }
  }

  componentDidMount(){
    NetworkService.getData().then(value => {
      this.setState({
        networkData: value
      })
      alert("We got our data");
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevState.color && prevState.color === this.state.color){
      alert('The color is not changed!');
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.color === 'blue'){
      alert('Sorry mate. I hate blue color!');
      return false;
    }

    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>

            <Text style={{color: this.state.color, fontSize: 26}}>this.state.color={this.state.color}</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>
            {this.renderNetworkData()}
            {this.state.newPlayerName ?
            <MonoText style={styles.codeHighlightText}>{this.state.newPlayerName} has joined the game</MonoText>
            :
            null}
          </View>
        </ScrollView>
          {/* //View for button */}
          <View style={styles.horizonContainer}>
            <View style={styles.buttonContainer}>
              <Button color='red' title="Red" 
                onPress = {() => {
                  this.setState({color: 'red'});
                  alert("Red is chosen");
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button color='blue' title="Blue"
                  onPress = {() => {
                  this.setState({color: 'blue'});
                  alert("Blue is chosen");
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button color='green' title="Green"
                  onPress = {() => {
                  this.setState({color: 'green'});
                  alert("Green is chosen");
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button color='black' title="New player"
                  onPress = {() => {
                  this.setState({newPlayerName: '2nd player'});
                }}
              />
            </View> 
          </View>
      </View>
    );
  }

  renderNetworkData(){
    if(this.state.networkData){
      return(<Text style={styles.networkPassText}>
        We got {this.state.networkData} from our friendly network
      </Text>)
    } else {
      return(<Text style={styles.networkPassText}>
        Still waiting for network sss
      </Text>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 1)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  networkFailedText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
  networkPassText: {
    fontSize: 20,
    color: 'blue',
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  horizonContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  }
});
