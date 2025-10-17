import 'react-native-get-random-values'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/auth-context';
import AppNavigator from './src/navigations/app-stack-navigator';
import { ThemeProvider } from './src/context/theme-context';

function App() {

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
