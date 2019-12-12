
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from '../screen/HomeScreen';
import { PaymentScreen } from '../screen/PaymentScreen';

const AppNavigator = createStackNavigator({
  home: HomeScreen,
  payment: PaymentScreen
},{
    initialRouteName: 'home'
});

export default createAppContainer(AppNavigator);