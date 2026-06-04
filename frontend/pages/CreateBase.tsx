import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { createBase } from "../services/api";

export default function CreateBase({ navigation }: any) {
    const [nome, setNome] = useState("");
    const [localizacao, setLocalizacao] = useState("");

    async function handleCreateBase() {
        if (!nome.trim() || !localizacao.trim()) {
            alert("Preencha todos os campos.");
            return;
        }

        try {
            await createBase(
                nome,
                localizacao
            );

            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Nova Base
            </Text>

            <TextInput
                placeholder="Nome"
                placeholderTextColor="#999"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                placeholder="Localização"
                placeholderTextColor="#999"
                style={styles.input}
                value={localizacao}
                onChangeText={setLocalizacao}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleCreateBase}
            >
                <Text style={styles.buttonText}>
                    Cadastrar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#10283F",
        justifyContent: "center",
        padding: 40,
    },

    title: {
        color: "#509778",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },

    input: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },

    button: {
        backgroundColor: "#509778",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});