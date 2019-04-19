import { createStackNavigator } from 'react-navigation';
import Dashboard from '../../components/dashboard/Dashboard';
import CreateProfile from '../../components/create-profile/CreateProfile';
import EditProfile from '../../components/edit-profile/EditProfile';
import AddEducation from '../../components/add-credentials/AddEducation';
import AddExperience from '../../components/add-credentials/AddExperience';
import AddMusic from '../../components/add-credentials/AddMusic';
import PlayerScreen from 'react-native-sound-playerview';

const ProfileStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard
  },
  CreateProfile: {
    screen: CreateProfile
  },
  EditProfile: {
    screen: EditProfile
  },
  AddEducation: {
    screen: AddEducation
  },
  AddExperience: {
    screen: AddExperience
  },
  AddMusic: {
    screen: AddMusic
  },
  player:{screen:PlayerScreen},
}, {
  headerMode: 'none'
});

export default ProfileStack;