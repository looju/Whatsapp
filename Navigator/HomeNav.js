import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Photo } from '../Screens/Home/Photo';
import { Chat } from '../Screens/Home/Chat';

const Tab = createMaterialTopTabNavigator();

export const HomeNav=()=>{
  return (
    <Tab.Navigator>
      <Tab.Screen name="Photo" component={Photo} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
}