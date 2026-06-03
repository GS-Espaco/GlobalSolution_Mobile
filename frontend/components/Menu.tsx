import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";

export default function Menu() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigation = useNavigation();
    const { logout } = useAuth();

    function handleHome() {
        navigation.navigate("MAIN" as never);
        setMenuOpen(false);
    }

    function handleLogout() {
        logout();
        setMenuOpen(false);
    }

    return (
        <View style={styles.fullMenu}>
            <StatusBar hidden />

            <View style={styles.menuContainer}>
                <View style={styles.menu}>
                    {/*<Image source={require("../assets/ECOA.png")} />*/}

                    <TouchableOpacity
                        onPress={() => setMenuOpen(!menuOpen)}
                    >
                        <MaterialIcons
                            name="menu"
                            size={32}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {menuOpen && (
                <View style={styles.dropDown}>
                    <TouchableOpacity onPress={handleHome}>
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.menuText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    fullMenu: {
        width: "100%",
        zIndex: 1,
    },
    menuContainer: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 70,
        backgroundColor: "#fff",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    menu: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dropDown: {
        position: "absolute",
        marginTop: 70,
        width: "100%",
        backgroundColor: "#1E3E6D",
        padding: 30,
        gap: 10,
    },
    menuText: {
        color: "#fff",
        fontSize: 20,
    },
});