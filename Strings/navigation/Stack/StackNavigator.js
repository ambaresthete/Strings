import Home from '../../screens/Home';
import Join from '../../screens/Join';
import Test from '../../screens/Test';
import Register from '../../components/auth/Register';
import Login from '../../components/auth/Login';


import { createStackNavigator } from 'react-navigation';




const AuthStack = createStackNavigator({
  Home: {
    screen: Home
  },
  Join: {
    screen: Join
  },
  Test: {
    screen: Test
  },
  Register: {
    screen: Register
  },
  Login: {
    screen: Login
  }
}, {
  headerMode: 'none'
});

export default AuthStack;