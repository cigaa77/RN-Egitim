import React, { Component } from 'react';
import { View, Image, Dimensions, Text, Platform, Linking } from 'react-native';
import Share from 'react-native-share';
import { strings } from '../Lang/Strings';
import Button from '../commons/Button';


class FinalScreen extends Component {
    render() {
        const image = 'data:image/png;base64' + this.props.uri;
        const shareOptionsImage = {
            url: image,
            type: 'image/png'
        };
        const shareOptionsAppShare = {
            title: 'asd',
            message: 'asd',
            url: Platform.OS === 'ios'
                ? strings.appUrl
                : strings.appUrl
        };
        return (
            <View style={styles.container} >
                <Image
                    source={require('../img/test.png')}
                    style={{ marginTop: 20 }}
                />
                <Image
                    source={require('../img/test.png')}
                    style={styles.imageStyle}
                />
                <View
                    style={styles.back}
                >
                    <Button
                        onPress={() => Share.open(shareOptionsImage)}
                        text={strings.shareImage}
                    />
                    <Button
                        onPress={() => Share.open(shareOptionsAppShare)}
                        text={strings.shareApp}
                    />
                    <Text
                        onPress={() => Linking.openURL(
                            Platform.OS === 'ios'
                                ? strings.appUrl
                                : strings.appUrl
                        )}
                    >
                        {strings.givePoints}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    imageStyle: {
        width: Dimensions.get('window').width * 0.40,
        height: Dimensions.get('window').height * 0.35,
        marginTop: 30,
        borderWidth: 3,
        borderColor: 'blue'
    },
    back: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width - 40,
        padding: 10,
        alignItems: 'center'
    }
};

export default FinalScreen;
