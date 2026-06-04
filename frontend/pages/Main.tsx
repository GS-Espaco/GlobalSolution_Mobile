import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Main() {

    const navigation = useNavigation();

    function handleBase() {
        navigation.navigate("BASE" as never);
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Bem-vindo</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.flex}>
                    <Text style={styles.title2}>O que é o</Text>
                    <Text style={[styles.title2, { color: "#509778" }]}>GREENHOUSE</Text>
                    <Text style={styles.title2}>?</Text>
                </View>
                <Text style={styles.text}>O greenhouse é um aplicativo de monitoramento de estufas em colônias extraterrestres, identificando e prevenindo em tempo real alterações climáticas e espaciais que prejudicariam a vida nas estufas.</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleBase()}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Começar</Text>
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
        gap: 10
    },

    flex: {
        display: "flex",
        flexDirection: "row",
        gap: 5
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

    title2: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 12,
    },

    subtitle: {
        fontSize: 16,
        color: "#FFF",
        textAlign: "center",
        marginBottom: 24,
    },

    text: {
        fontSize: 14,
        color: "#FFF",
        textAlign: "justify",
    },

    button: {
        backgroundColor: "#509778",
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 12,
        alignItems: "center",
        width: "100%",
        marginTop: 20
    },

    buttonText: {
        color: "#10283F",
        fontSize: 18,
        fontWeight: "bold",
    },
});