import Profile from '../../components/profile/Profile';
import Profiles from '../../components/profiles/Profiles';
import Location from '../../components/location/Location';
import { createStackNavigator } from 'react-navigation';
import PlayerScreen from 'react-native-sound-playerview';

const ViewStack = createStackNavigator({
  Profiles: {
    screen: Profiles
  },
  Location: {
    screen: Location,
  },
  Profile: {
    screen: Profile
  },
  player:{screen:PlayerScreen}, 
}, {
  headerMode: 'none'
});

export default ViewStack;