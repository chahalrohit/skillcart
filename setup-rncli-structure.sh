# run command to create folder structure
# chmod +x setup-rncli-structure.sh
# ./setup-rncli-structure.sh 

set -euo pipefail

# ---------- helpers ----------
mkd() { mkdir -p "$1"; }
touch_if_missing() { [ -f "$1" ] || : > "$1"; }
write_if_missing() {
  local file="$1"; shift
  if [ ! -f "$file" ]; then
    mkdir -p "$(dirname "$file")"
    cat > "$file" <<'EOF'
'"$@"'
EOF
  fi
}

# ---------- top-level ----------
mkd ".expo"
mkd ".github/workflows"
mkd "__tests__"
mkd "android"
mkd "ios"
# node_modules is created by npm/yarn/pnpm; harmless if present
mkd "node_modules"

# ---------- src tree ----------
mkd "src/components/atoms/Button"
mkd "src/components/atoms/Input"
mkd "src/components/atoms/Text"
mkd "src/components/molecules/FormField"
mkd "src/components/molecules/SearchBar"
mkd "src/components/molecules/ListItem"
mkd "src/components/organisms/Header"
mkd "src/components/organisms/ProductCard"
mkd "src/components/organisms/UserProfile"

mkd "src/screens/Auth/LoginScreen"
mkd "src/screens/Auth/RegisterScreen"
mkd "src/screens/Home"
mkd "src/screens/Profile"
mkd "src/screens/Settings"

mkd "src/navigation"
mkd "src/hooks"
mkd "src/services/api"
mkd "src/services/storage"
mkd "src/services/notifications"
mkd "src/services/analytics"
mkd "src/store/slices"
mkd "src/store/middleware"
mkd "src/store/selectors"
mkd "src/utils/formatters"
mkd "src/utils/validators"
mkd "src/utils/helpers"
mkd "src/constants"
mkd "src/theme"
mkd "src/assets/images/icons"
mkd "src/assets/images/logos"
mkd "src/assets/images/backgrounds"
mkd "src/assets/fonts"
mkd "src/assets/videos"
mkd "src/assets/sounds"
mkd "src/assets/data"
mkd "src/localization/languages"
mkd "src/types"

touch_if_missing ".github/workflows/.gitkeep"

# ---------- components ----------
write_if_missing "src/components/atoms/Button/Button.tsx" \
"import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from './Button.styles';
type Props = { title: string; onPress?: () => void; style?: ViewStyle | ViewStyle[]; };
const Button: React.FC<Props> = ({ title, onPress, style }) => (
  <TouchableOpacity accessibilityRole=\"button\" onPress={onPress} style={[styles.root, style]}>
    <Text style={styles.label}>{title}</Text>
  </TouchableOpacity>
);
export default Button;
"
write_if_missing "src/components/atoms/Button/Button.styles.ts" \
"import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  root: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' },
  label: { fontWeight: '600' },
});
"
write_if_missing "src/components/atoms/Button/Button.test.tsx" \
"describe('Button', () => { it('renders', () => { expect(true).toBe(true); }); });
"
write_if_missing "src/components/atoms/Button/index.ts" "export { default } from './Button';\n"
touch_if_missing "src/components/atoms/Input/.gitkeep"
touch_if_missing "src/components/atoms/Text/.gitkeep"
write_if_missing "src/components/atoms/index.ts" "export {};\n"

# ---------- molecules & organisms ----------
touch_if_missing "src/components/molecules/FormField/.gitkeep"
touch_if_missing "src/components/molecules/SearchBar/.gitkeep"
touch_if_missing "src/components/molecules/ListItem/.gitkeep"
write_if_missing "src/components/molecules/index.ts" "export {};\n"
touch_if_missing "src/components/organisms/Header/.gitkeep"
touch_if_missing "src/components/organisms/ProductCard/.gitkeep"
touch_if_missing "src/components/organisms/UserProfile/.gitkeep"
write_if_missing "src/components/organisms/index.ts" "export {};\n"
write_if_missing "src/components/index.ts" "export {};\n"

# ---------- screens ----------
write_if_missing "src/screens/Auth/LoginScreen/LoginScreen.tsx" \
"import React from 'react';
import { View, Text } from 'react-native';
const LoginScreen: React.FC = () => (<View><Text>Login Screen</Text></View>);
export default LoginScreen;
"
write_if_missing "src/screens/Auth/LoginScreen/LoginScreen.styles.ts" \
"import { StyleSheet } from 'react-native';
export default StyleSheet.create({ container: { flex: 1, padding: 16 } });
"
write_if_missing "src/screens/Auth/LoginScreen/LoginScreen.test.tsx" \
"describe('LoginScreen', () => { it('renders', () => { expect(true).toBe(true); }); });
"
write_if_missing "src/screens/Auth/LoginScreen/index.ts" "export { default } from './LoginScreen';\n"
touch_if_missing "src/screens/Auth/RegisterScreen/.gitkeep"
write_if_missing "src/screens/Auth/index.ts" "export {};\n"
touch_if_missing "src/screens/Home/.gitkeep"
touch_if_missing "src/screens/Profile/.gitkeep"
touch_if_missing "src/screens/Settings/.gitkeep"
write_if_missing "src/screens/index.ts" "export {};\n"

# ---------- navigation ----------
write_if_missing "src/navigation/AppNavigator.tsx" \
"import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
const AppNavigator = () => <NavigationContainer>{/* stacks/tabs */}</NavigationContainer>;
export default AppNavigator;
"
write_if_missing "src/navigation/AuthNavigator.tsx" \
"import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
const Stack = createNativeStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator><Stack.Screen name=\"Login\" component={LoginScreen} /></Stack.Navigator>
);
export default AuthNavigator;
"
write_if_missing "src/navigation/TabNavigator.tsx" \
"import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const TabNavigator = () => (<Tab.Navigator>{/* tabs */}</Tab.Navigator>);
export default TabNavigator;
"
write_if_missing "src/navigation/types.ts" "export type RootStackParamList = {};\n"
write_if_missing "src/navigation/index.ts" "export {};\n"

# ---------- hooks ----------
touch_if_missing "src/hooks/useAuth.ts"
touch_if_missing "src/hooks/useApi.ts"
touch_if_missing "src/hooks/useStorage.ts"
touch_if_missing "src/hooks/usePermissions.ts"
write_if_missing "src/hooks/index.ts" "export {};\n"

# ---------- services ----------
touch_if_missing "src/services/api/auth.ts"
touch_if_missing "src/services/api/users.ts"
touch_if_missing "src/services/api/products.ts"
touch_if_missing "src/services/api/client.ts"
touch_if_missing "src/services/api/interceptors.ts"
write_if_missing "src/services/api/index.ts" "export {};\n"
touch_if_missing "src/services/storage/secureStorage.ts"
touch_if_missing "src/services/storage/asyncStorage.ts"
write_if_missing "src/services/storage/index.ts" "export {};\n"
write_if_missing "src/services/index.ts" "export {};\n"

# ---------- store ----------
write_if_missing "src/store/store.ts" \
"import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({ reducer: {} });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
"
touch_if_missing "src/store/index.ts"
touch_if_missing "src/store/middleware/.gitkeep"
touch_if_missing "src/store/selectors/.gitkeep"
touch_if_missing "src/store/slices/authSlice.ts"
touch_if_missing "src/store/slices/userSlice.ts"
touch_if_missing "src/store/slices/appSlice.ts"
write_if_missing "src/store/slices/index.ts" "export {};\n"

# ---------- utils ----------
touch_if_missing "src/utils/formatters/date.ts"
touch_if_missing "src/utils/formatters/currency.ts"
write_if_missing "src/utils/formatters/index.ts" "export {};\n"
touch_if_missing "src/utils/validators/email.ts"
touch_if_missing "src/utils/validators/password.ts"
write_if_missing "src/utils/validators/index.ts" "export {};\n"
touch_if_missing "src/utils/helpers/debounce.ts"
touch_if_missing "src/utils/helpers/throttle.ts"
write_if_missing "src/utils/helpers/index.ts" "export {};\n"
write_if_missing "src/utils/index.ts" "export {};\n"

# ---------- constants ----------
touch_if_missing "src/constants/api.ts"
touch_if_missing "src/constants/colors.ts"
touch_if_missing "src/constants/dimensions.ts"
touch_if_missing "src/constants/strings.ts"
touch_if_missing "src/constants/routes.ts"
write_if_missing "src/constants/index.ts" "export {};\n"

# ---------- theme ----------
touch_if_missing "src/theme/colors.ts"
touch_if_missing "src/theme/typography.ts"
touch_if_missing "src/theme/spacing.ts"
touch_if_missing "src/theme/shadows.ts"
touch_if_missing "src/theme/types.ts"
write_if_missing "src/theme/index.ts" "export {};\n"

# ---------- assets ----------
write_if_missing "src/assets/images/index.ts" "export {};\n"
touch_if_missing "src/assets/fonts/.gitkeep"
touch_if_missing "src/assets/videos/.gitkeep"
touch_if_missing "src/assets/sounds/.gitkeep"
touch_if_missing "src/assets/data/.gitkeep"

# ---------- localization ----------
write_if_missing "src/localization/i18n.ts" "export {};\n"
write_if_missing "src/localization/index.ts" "export {};\n"
write_if_missing "src/localization/languages/en.json" "{\n  \"hello\": \"Hello\"\n}\n"
write_if_missing "src/localization/languages/es.json" "{\n  \"hello\": \"Hola\"\n}\n"
write_if_missing "src/localization/languages/fr.json" "{\n  \"hello\": \"Bonjour\"\n}\n"

# ---------- types ----------
touch_if_missing "src/types/api.ts"
touch_if_missing "src/types/user.ts"
touch_if_missing "src/types/navigation.ts"
write_if_missing "src/types/global.d.ts" \
"declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.json';
"
write_if_missing "src/types/index.ts" "export {};\n"

# ---------- RN CLI entry ----------
# Ensure index.js exists and loads App from src/App.tsx
write_if_missing "src/App.tsx" \
"import React from 'react';
import { SafeAreaView, Text } from 'react-native';
const App = () => (
  <SafeAreaView style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
    <Text>My RN CLI App</Text>
  </SafeAreaView>
);
export default App;
"
if [ ! -f "index.js" ]; then
cat > index.js <<'EOF'
/* auto-generated index.js */
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
EOF
fi
touch_if_missing "app.json"

# ---------- env & configs ----------
touch_if_missing ".env"
touch_if_missing ".env.development"
touch_if_missing ".env.staging"
touch_if_missing ".env.production"

if [ ! -f ".gitignore" ]; then
cat > .gitignore <<'EOF'
# React Native
node_modules/
ios/Pods/
*.log
.expo/
coverage/
dist/
build/
.env*
EOF
fi

touch_if_missing ".eslintrc.js"
touch_if_missing ".prettierrc.js"
touch_if_missing "babel.config.js"
touch_if_missing "metro.config.js"
touch_if_missing "package.json"
touch_if_missing "tsconfig.json"
touch_if_missing "README.md"
touch_if_missing ".expo/.gitkeep"

echo "✅ RN CLI structure created (non-destructive)."
