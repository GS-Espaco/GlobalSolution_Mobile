import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/Login";
import Main from "../pages/Main";
import Base from "../pages/Base";

import { useAuth } from "../context/AuthContext";
import Menu from "../components/Menu";
import CreateBase from "../pages/CreateBase";
import Estufa from "../pages/Estufa";
import { RootStackParamList } from "../Types";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Rotas que o usuario logado pode acessar
function AppStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => <Menu />,
            }}
        >
            <Stack.Screen
                name="MAIN"
                component={Main}
            />
            <Stack.Screen
                name="BASE"
                component={Base}
            />
            <Stack.Screen
                name="CREATEBASE"
                component={CreateBase}
            />
            <Stack.Screen 
                name="GREENHOUSE"
                component={Estufa}
            />
        </Stack.Navigator>
    );
}

export default function AppRouter() {
    const { isAuthenticated } = useAuth();

    return (
        <NavigationContainer>
            {isAuthenticated ? (
                <AppStack />
            ) : (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        name="LOGIN"
                        component={Login}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}