import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BaseType, EstadoBase, RootStackParamList } from "../Types";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";
import { API_URL, updateBase } from "../services/api";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "GREENHOUSE"
>;

export default function Estufa({ route }: Props) {
    const { id } = route.params;
    const [base, setBase] = useState<BaseType>()

    useFocusEffect(
        useCallback(() => {
            carregarBase();
        }, [])
    );

    async function carregarBase() {
        const response = await axios.get(
            `${API_URL}/bases/${id}`
        );

        setBase(response.data);
    }

    async function mudarTemperatura(valor: number) {
        if (!base) return;

        const baseAtualizada = await updateBase(base.id, {
            temperatura: base.temperatura + (valor)
        });

        setBase(baseAtualizada);
    }

    console.log("BASE", base);

    return (
        <View style={styles.container}>
            {base !== undefined ? (
                <View style={styles.baseContainer}>
                    <View>
                        <Text style={styles.text}>
                            Nome: <Text style={styles.value}>{base.nome}</Text>
                        </Text>

                        <Text style={styles.text}>
                            Local: <Text style={styles.value}>{base.localizacao}</Text>
                        </Text>

                        <Text style={styles.text}>
                            Estado: <Text style={styles.value}>{base.estado}</Text>
                        </Text>

                        <Text style={styles.text}>
                            Temperatura: <Text style={styles.value}>{base.temperatura}°C</Text>
                        </Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={[styles.button, styles.minusMinButton]}
                            onPress={() => mudarTemperatura(-5)}
                        >
                            <Text style={styles.buttonText}>−</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.minusButton]}
                            onPress={() => mudarTemperatura(-1)}
                        >
                            <Text style={styles.buttonText}>−</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.plusButton]}
                            onPress={() => mudarTemperatura(1)}
                        >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.plusMaxButton]}
                            onPress={() => mudarTemperatura(5)}
                        >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageView}>
                        {base.estado === EstadoBase.TEMPERATURA_ALTA ? (
                            <Image source={require("../assets/State_Light.png")} style={styles.image} resizeMode="contain" />
                        ) : base.estado === EstadoBase.MORTA ? (
                            <Image source={require("../assets/State_Dead.png")} style={styles.image} resizeMode="contain" />
                        ) : base.estado === EstadoBase.QUEIMADA ? (
                            <Image source={require("../assets/State_Burnt.png")} style={styles.image} resizeMode="contain" />
                        ) : base.estado === EstadoBase.AGUA ? (
                            <Image source={require("../assets/State_Water.png")} style={styles.image} resizeMode="contain" />
                        ) : base.estado === EstadoBase.CONGELADA ? (
                            <Image source={require("../assets/State_Frozen.png")} style={styles.image} resizeMode="contain" />
                        ) : (
                            <Image source={require("../assets/State_Normal.png")} style={styles.image} resizeMode="contain" />
                        )}
                    </View>
                </View>
            ) : (
                <View style={styles.baseContainer}>
                    <Text style={styles.warning}>Problema ao encontrar a base!</Text>
                </View>
            )}
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

    text: {
        color: "white",
        fontSize: 28,
        fontWeight: "semibold"
    },

    value: {
        color: "#50D89A",
        fontWeight: "bold",
    },

    warning: {
        color: "#ff5f6a",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center"
    },

    baseContainer: {
        height: "80%",
        width: "90%",
        justifyContent: "space-between"
    },

    button: {
        width: "25%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    plusButton: {
        backgroundColor: "#269c79a9",
    },

    plusMaxButton: {
        backgroundColor: "#166b52a9",
        fontWeight: "bold"
    },

    minusButton: {
        backgroundColor: "#e23939a9",
    },

    minusMinButton: {
        backgroundColor: "#ac2525a9",
        fontWeight: "bold"
    },

    buttonView: {
        flexDirection: "row",
        gap: 5,
        width: "110%",
    },

    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },

    imageView: {
        height: "30%"
    },

    image: {
        position: "absolute",
        width: "110%",
        bottom: 0
    }
});