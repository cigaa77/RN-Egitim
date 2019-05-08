import LocalizedStrings from 'react-native-localization';

export const strings = new LocalizedStrings({
    'en-US': {
        location: 'your location',
        herLocation: 'her location',
        yourPhoto: 'your photo',
        herPhoto: 'her photo',
        buttonText: 'create map',
        textPhoto: require('../img/textRoadEn.png'),
        shareImage: 'Share Image',
        shareApp: 'Share App',
        givePoints: 'Give Points',
        appUrl: 'asd'
    },
    tr: {
        location: 'konumunuz',
        herLocation: 'sevdiceğinin Konumu',
        yourPhoto: 'senin fotoğrafın',
        herPhoto: 'sevdiceğinin fotoğrafı',
        buttonText: 'Yol Haritasını Oluştur',
        textPhoto: require('../img/textRoad.png'),
        shareImage: 'Fotoğrafı Paylaş',
        shareApp: 'Uygulamayı Başlat',
        givePoints: 'Puan ver',
        appUrl: 'asd'
    }
});
