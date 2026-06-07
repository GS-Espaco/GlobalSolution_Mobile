import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_URL } from "../services/api";
import axios from "axios";
import { BaseType } from "../Types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deleteBase } from "../services/api";

export default function Base() {

    const [bases, setBases] = useState<BaseType[]>([]);

    const navigation = useNavigation();

    function handleCreateBase() {
        navigation.navigate("CREATEBASE" as never);
    }

    async function handleDeleteBase(id: number) {
        try {
            await deleteBase(id);

            carregarBases();
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            carregarBases();
        }, [])
    );

    async function carregarBases() {
        const response = await axios.get(
            `${API_URL}/bases`
        );

        setBases(response.data);
    }

    return (
        <View style={styles.container}>
            <View style={styles.baseContainer}>
                <Text style={styles.title}>Cadastrar e gerenciar bases</Text>
                <ScrollView style={styles.baseCardContainer}>
                    {bases.map(base => (
                        <View key={base.id} style={styles.baseCard}>
                            <View>
                                <Text style={styles.title2}>
                                    Nome: {base.nome}
                                </Text>

                                <Text style={styles.text}>
                                    Localização: {base.localizacao}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => handleDeleteBase(base.id)}>
                                <Text>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <View>
                        <TouchableOpacity
                            style={styles.buttonAdd}
                            onPress={() => handleCreateBase()}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
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

    baseContainer: {
        height: "80%",
        width: "90%",
        alignItems: 'flex-end',
    },

    baseCardContainer: {
        width: "100%",
    },

    flex: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },

    baseCard: {
        width: "100%",
        backgroundColor: "#16334F",
        padding: 24,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 8,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#509778",
        marginBottom: 12,
    },

    title2: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
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

    buttonAdd: {
        backgroundColor: "#509778",
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 12,
        alignItems: "center"
    },

    buttonText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
});