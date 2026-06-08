import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BaseType, RootStackParamList } from "../Types";
import { API_URL, deleteBase } from "../services/api";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Base() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [bases, setBases] = useState<BaseType[]>([]);

    const navigation = useNavigation<NavigationProps>();

    function handleCreateBase() {
        navigation.navigate("CREATEBASE");
    }

    function handleGoToBase(id: number) {
        navigation.navigate("GREENHOUSE", { id });
    }

    async function handleDeleteBase(id: number) {
        try {
            setError("");

            await deleteBase(id);
            carregarBases();
        } catch (error) {
            console.log(error);
            setError("Não foi possível excluir a base.");
        }
    }

    useFocusEffect(
        useCallback(() => {
            carregarBases();
        }, [])
    );

    async function carregarBases() {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(`${API_URL}/bases`);

            setBases(response.data);
        } catch (err) {
            console.log(err);
            setError("Não foi possível carregar as bases.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#509778" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.baseContainer}>
                <Text style={styles.title}>Cadastrar e gerenciar bases</Text>

                {error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : null}
                <FlatList
                    style={styles.baseCardContainer}
                    data={bases}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.baseCard}
                            onPress={() => handleGoToBase(item.id)}
                        >
                            <View>
                                <Text style={styles.title2}>
                                    Nome: {item.nome}
                                </Text>

                                <Text style={styles.text}>
                                    Localização: {item.localizacao}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => handleDeleteBase(item.id)}
                            >
                                <Text>🗑️</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={handleCreateBase}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
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

    error: {
        color: "#ff7b7b",
        textAlign: "center",
        marginBottom: 10,
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
        width: "100%",
        marginTop: 20,
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