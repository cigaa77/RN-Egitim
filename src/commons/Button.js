import React, { Component } from 'react';
import { Text, Dimensions, Touchable } from 'react-native';

const { witdh, height } = Dimensions.get('window');

class Button extends Component {

    render() {
        return (
            <Touchable
                style={{
                    width: witdh * 0.71,
                    height: height * 0.07,
                    backgroundColor: '#53008C',
                    marginTop: 20,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.props.onPress}
            >
                <Text style={{ color: 'white' }} >{this.props.text} </Text>
            </Touchable>
        );
    }
}

export default Button;
