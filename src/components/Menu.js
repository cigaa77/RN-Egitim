import React from 'react';
import { View, Text } from 'react-native';

export default function Menu() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'green'
            }}
        >
            <Text style={style.sectionStyle}> Home </Text>
            <Text style={style.sectionStyle}> Hakkımızda </Text>
            <Text style={style.sectionStyle}> İletişim </Text>

        </View>
    );
}

const style = {
    sectionStyle: {
        color: 'white',
        marginLeft: 20,
        marginTop: 20,
        fontSize: 16,
        fontWeight: 600
    }
};
