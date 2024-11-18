import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PLogin from './app/(tabs)/PLogin';
import PRegistro from './app/(tabs)/PRegistro';
import EsqueciASenha from './app/(tabs)/EsqueciASenha';
import PInicial from './app/(tabs)/PInicial';
import GroupListScreen from './app/(tabs)/GroupListScreen';
import GroupDetailScreen from './app/(tabs)/GroupDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="PLogin">
        <Stack.Screen name="PLogin" component={PLogin} />
        <Stack.Screen name="PRegistro" component={PRegistro} />
        <Stack.Screen name="EsqueciASenha" component={EsqueciASenha} />
        <Stack.Screen name="PInicial" component={PInicial} />
        <Stack.Screen name="GroupListScreen" component={GroupListScreen} />
        <Stack.Screen name="GroupDetailScreen" component={GroupDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
