import React, { Component } from 'react';
import { ImageBackground, Dimensions, TouchableOpacity, Image } from 'react-native';
import Draggable from 'react-native-draggable';
import Actions from 'react-native-router-flux';
import { captureScreen } from 'react-native-view-shot';
import { strings } from '../Lang/Strings';


const { width, height } = Dimensions.get('window');

class Compare extends Component {
    componentDidMount() {
        console.log(this.props.data);
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
        return (
            <ImageBackground
                source={{ uri: this.props.data.uri }}
                style={{ width, height }}
            >
                <Draggable
                    renderSize={75}
                    offSetX={0}
                    offSetY={-100}
                    renderShape='image'
                    imageSource={this.props.data.myPhoto}
                    reserve={false}
                    isRadius
                />
                <Draggable
                    renderSize={75}
                    offSetX={0}
                    offSetY={100}
                    renderShape='image'
                    imageSource={this.props.data.herPhoto}
                    reserve={false}
                    isRadius
                />
                <Draggable
                    renderSize={75}
                    offSetX={60}
                    offSetY={0}
                    renderShape='image'
                    imageSource={strings.textPhoto}
                    reserve={false}
                />
                {this.state.isButtonShow
                    ? < TouchableOpacity
                        onPress={() => this.screenShot()}
                        style={{
                             width: 80,
                              height: 80,
                               justifyContent: 'center',
                                alignItems: 'center' }}
                    >
                        <Image source={require('../img/button.png')} />
                    </TouchableOpacity>
                    : null
                }
            </ImageBackground>
        );
    }
}

export default Compare;
