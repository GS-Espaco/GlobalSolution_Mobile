import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useAuth } from "../context/AuthContext";

export default function Main() {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Bem-vindo</Text>

                <Text style={styles.subtitle}>
                    Usuário logado com sucesso
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={logout}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#10283F",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    card: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#16334F",
        padding: 24,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 8,
        alignItems: "center",
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#509778",
        marginBottom: 12,
    },

    subtitle: {
        fontSize: 16,
        color: "#FFF",
        textAlign: "center",
        marginBottom: 24,
    },

    button: {
        backgroundColor: "#509778",
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 12,
        alignItems: "center",
        width: "100%",
    },

    buttonText: {
        color: "#10283F",
        fontSize: 18,
        fontWeight: "bold",
    },
});