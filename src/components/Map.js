import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { captureScreen } from 'react-native-view-shot';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

class Map extends Component {
    state = {
        region: {
            latitude: 37.78825,
            longitude: 12,
            latitudeDelta: 12,
            longilatitudeDelta: 12
        },
        isButtonShow: true
    }
    componentWillMount() {
        const { yourLangLat } = this.props.data;

        this.setState({
            region: {
                latitude: yourLangLat[0],
                longitude: yourLangLat[1],
                latitudeDelta: 0.0922,
                longilatitudeDelta: 0.0421
            }
        });
    }

    screenShot() {
        this.setState({
            isButtonShow: false
        });
        setTimeout(() => {
            captureScreen({
                format: 'jpg',
                quality: 0.8
            })
                .then(
                    uri => {
                        Actions.Compare({
                            data: {
                                uri
                            }
                        });
                    },
                    error => console.log('Opps snapshot failed ', error)
                );
        }, 500);

    }

    render() {
        const { yourLangLat, herLangLat } = this.props.data;
        const origin = { latitude: yourLangLat[0], longitute: yourLangLat[1] };
        const destination = { latitude: herLangLat[0], longitute: herLangLat[1] };
        const GOOGLE_API_KEY: 'asdasdasdasd';

        return (
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                <MapView
                    style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
                    region={this.state.region}
                    onRegionChange={this.state.onRegionChange}
                >
                    <Marker coordinate={...origin} />
                    <Marker coordinate={...destination} />
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_API_KEY}
                        strokeWitdh={3}
                        strokeColor='#05B3FD'
                    />
                </MapView>
                {this.state.isButtonShow
                    ? < TouchableOpacity
                        onPress={() => this.screenShot()}
                        style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Image source={require('../img/button.png')} />
                    </TouchableOpacity>
                    : null
                }
            </View >
        );
    }
}
export default Map;
