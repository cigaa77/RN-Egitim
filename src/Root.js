import React, { Component } from 'react';
import { Router, Scene, Drawer } from 'react-native-router-flux';
import { Dimensions } from 'react-native';
import Form from './components/Forms';
import Map from './components/Map';
import Compare from './components/Compare';
import Menu from './components/Menu';
import FinalScreen from './components/FinalScreen';


class Root extends Component {

    render() {
        return (
            <Router>
                <Scene key='Root'>
                    <Scene
                        key='Form'
                        component={Form}
                        initial
                        hideNavBar
                    />
                    <Scene
                        key='Map'
                        component={Map}
                        hideNavBar
                    />
                    <Scene
                        key='Compare'
                        component={Compare}
                        hideNavBar
                    />
                </Scene>
                <Drawer
                    key='LastScreen'
                    contentComponent={Menu}
                    drawerPosition='left'
                    drawerImage={require('./img/menu.png')}
                    drawerWidth={Dimensions.get('window').width / 2}
                >
                    <Scene
                        key='FinalScreen'
                        component={FinalScreen}
                        hideNavBar
                    />
                </Drawer>
            </Router>
        );
    }
}

export default Root;
