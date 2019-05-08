import React, { Component } from 'react';
import { ImageBackground, Dimensions, Image, View, Text, TouchableOpacity } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import { AdMobBanner } from 'react-native-admob';
import Button from '../commons/Button';
import { strings } from '../Lang/Strings';


const { witdh, height } = Dimensions.get('window');

class Form extends Component {

    state = {
        yourLocation: '',
        herLocation: '',
        yourImgOk: require('../img/ok.png'),
        herImgOk: require('../img/ok.png'),
        yourLangLat: [],
        herLangLat: [],
        myPhoto: '',
        herPhoto: ''
    }

    componentWillMount() {
        this.setState({
            yourLocation: strings.location,
            herLocation: strings.herLocation
        });
    }

    openImagePicker(type) {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            takePhotoButtonTitle: 'Fotoğraf Çek',
            chooseFromLibraryButtonTitle: 'Galeriden Çek',
            cancelButtonTitle: 'Kapat'
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('REsponse = ', response);

            if (response.didCancel) {
                console.log('user cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker error', response.error);
            } else if (response.customButton) {
                console.log('user tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                if (type === 'my') {
                    this.setState({ myPhoto: source });
                } else {
                    this.setState({ herPhoto: source });
                }
            }
        });
    }

    openSearchModal(type) {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                console.log(place);
                if (type === 'my') {
                    this.setState({
                        yourLocation: place.name,
                        yourImgOk: require('../img/check.png'),
                        yourLangLat: [place.latitude, place.longitude]
                    });
                } else {
                    this.setState({
                        herLocation: place.name,
                        herImgOk: require('../img/check.png'),
                        herLangLat: [place.latitude, place.longitude]
                    });
                }
            })
            .catch(error => console.log(error.message)); // error is a Javascript Error object
    }

    renderSection(text, onPress, img) {
        return (
            <View style={styles.section}>
                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{ textAlign: 'center', flex: 9 }}
                    >
                        {text}
                    </Text>
                    <Image
                        source={img}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderPickerButton(text, onPress) {
        return (
            <TouchableOpacity onPress={onPress} >
                <View style={styles.pickerButtonStyle} >
                    <Image
                        source={require('../img/Add.png')}
                    />
                </View>

                <Text style={styles.pickerTextStyle} >
                    {text}
                </Text>
            </TouchableOpacity>
        );
    }

    renderShowPhoto(type, text, onPress) {
        return (
            <TouchableOpacity onPress={onPress} >
                <Image
                    source={type === 'my' ? this.state.myPhoto : this.state.herPhoto}
                    style={styles.photoStyle}
                />
                <Text style={styles.pickerTextStyle} >
                    {text}
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ImageBackground
                source={require('../img/bg.png')}
                style={{ witdh, height, alignItems: 'center', justifyContent: 'center' }}
            >
                <Image
                    source={require('../img/logo.png')}
                />
                {this.renderSection(
                    this.state.yourLocation,
                    () => this.openSearchModal('my'),
                    this.state.yourImgOk
                )}
                {this.renderSection(
                    this.state.herLocation,
                    () => this.openSearchModal('her'),
                    this.state.herImgOk
                )}
                <View style={styles.pickerMainViewStyle} >
                    {this.state.myPhoto !== '' ?
                        this.renderShowPhoto(
                            'my',
                            strings.yourPhoto,
                            () => this.openImagePicker('my')) :
                        this.renderPickerButton(
                            'her',
                            strings.yourPhoto,
                            () => this.openImagePicker('my'))
                    }
                    {this.state.herPhoto !== '' ?
                        this.renderShowPhoto(
                            strings.herPhotoPhoto,
                            () => this.openImagePicker('her')) :
                        this.renderPickerButton(
                            strings.herPhoto,
                            () => this.openImagePicker('her'))
                    }
                </View>
                <Button
                    text={strings.buttonText}
                    onPress={() => Actions.Map(
                        {
                            data: {
                                yourLangLat: this.state.yourLangLat,
                                herLangLat: this.state.herLangLat,
                                myPhoto: this.state.myPhoto,
                                herPhoto: this.state.herPhoto
                            }
                        }
                    )}
                />
                {/* Display a banner */}
                <AdMobBanner
                    adSize="fullBanner"
                    adUnitID="your-admob-unit-id"
                    testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={error => console.error(error)}
                />
            </ImageBackground>
        );
    }
}

const styles = {
    photoStyle: {
        witdh: witdh * 0.24,
        height: witdh * 0.24,
        borderRadius: (witdh * 0.24) / 2
    },
    pickerTextStyle: {
        color: 'white',
        witdh: witdh * 0.24,
        textAlign: 'center',
        marginTop: 10
    },
    pickerMainViewStyle: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundcolor: 'red',
        witdh: witdh * 0.59
    },
    pickerButtonStyle: {
        witdh: witdh * 0.24,
        height: witdh * 0.24,
        borderRadius: (witdh * 0.24) / 2,
        backgroundcolor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    section: {
        marginTop: 20,
        backgroundcolor: 'white',
        borderRadius: 10,
        witdh: witdh * 0.59,
        height: height * 0.05,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    }
};

export default Form;
