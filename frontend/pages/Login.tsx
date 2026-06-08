import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();

    async function handleLogin() {
        console.log("botão clicado")
        setError("");

        const result = await loginRequest(email, password);

        console.log(result)

        if (result.success) {
            await login(result.token);
        } else {
            setError("Email ou senha inválidos.");
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require("../assets/Planet1.png")} style={styles.planet1} />
            <Image source={require("../assets/Planet2.png")} style={styles.planet2} />
            <View style={styles.logoContainer}>
                <Image source={require("../assets/icon.png")} style={styles.logo} />
            </View>
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#7CC0A3"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#7CC0A3"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : null}

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleLogin()}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
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

    planet1: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 200,
        height: 210,
    },

    planet2: {
        position: "absolute",
        right: 0,
        bottom: 140,
        width: 150,
        height: 144,
    },

    logo: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },

    logoContainer: {
        marginBottom: 50,
        borderWidth: 10,
        borderColor: "#16334F",
        padding: 10,
        borderRadius: 20,
        elevation: 8
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
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#509778",
        textAlign: "center",
        marginBottom: 30,
    },

    input: {
        backgroundColor: "#1B3A57",
        color: "#FFF",
        borderWidth: 1,
        borderColor: "#509778",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 16,
        fontSize: 16,
    },

    button: {
        backgroundColor: "#509778",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
    },

    buttonText: {
        color: "#10283F",
        fontSize: 18,
        fontWeight: "bold",
    },

    error: {
        color: "#ff7b7b",
        marginBottom: 12,
        textAlign: "center",
    },
});