import { createAppContainer } from 'react-navigation';
import { createStackNavigation, createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            },
        },
        Profile:{
            screen: Profile,
            navigationOptions: {
                title: 'Perfil do Github'
            }
        },
    }, {
        defaultNavigationOptions:{
            headerTintColor: '#FFF',
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
            headerStyle:{
                backgroundColor: '#7D40E7',
            },
        },
    })
);

export default Routes;