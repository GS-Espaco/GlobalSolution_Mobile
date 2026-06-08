import { useCallback, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { API_URL, createBase } from "../services/api";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { EstadoBase, LocalType } from "../Types";

export default function CreateBase({ navigation }: any) {
    const [nome, setNome] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const estado = EstadoBase.NORMAL;
    const temperatura = 0;

    const [locais, setLocais] = useState([]);

    async function handleCreateBase() {
        if (!nome.trim() || !localizacao.trim()) {
            alert("Preencha todos os campos.");
            return;
        }

        try {
            await createBase(
                nome,
                localizacao,
                estado,
                temperatura,
            );

            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            carregarLocais();
        }, [])
    );

    async function carregarLocais() {
        const response = await axios.get(
            `${API_URL}/locais`
        );

        setLocais(response.data);
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

            {/* 2. Substituição do TextInput pelo Picker */}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={localizacao}
                    onValueChange={(itemValue) => setLocalizacao(itemValue)}
                    dropdownIconColor="#509778"
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione um local..." value="" enabled={false} />
                    {locais.map((local: LocalType) => (
                        <Picker.Item 
                            key={local.id} 
                            label={local.nome} 
                            value={local.nome}
                        />
                    ))}
                </Picker>
            </View>

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
        color: "#000",
    },

    pickerContainer: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 15,
        height: 55,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    
    picker: {
        color: "#000",
        padding: 20,
        borderRadius: 10,
        width: "100%",
        height: "100%",
        borderWidth: 0
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