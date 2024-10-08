import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { strings } from "../app/locales/strings";

interface WelcomeModalProps {
  visible: boolean;
  onClose: () => void;
}

// Componente de modal de boas-vindas
export default function WelcomeModal({ visible, onClose }: WelcomeModalProps) {
  // Função chamada quando o usuário clica em "Sim"
  const handleYes = async () => {
    // Armazena a aceitação do usuário no AsyncStorage
    await AsyncStorage.setItem("userAccepted", "true");
    // Fecha o modal
    onClose();
  };

  // Função chamada quando o usuário clica em "Não"
  const handleNo = () => {
    // Fecha o aplicativo
    BackHandler.exitApp();
  };

  return (
    // Modal que aparece quando 'visible' é verdadeiro
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Texto do modal */}
          <Text style={styles.modalText}>{strings.modal.title}</Text>
          {/* Link para os requisitos de doação */}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.prosangue.sp.gov.br/artigos/requisitos_basicos_para_doacao.html"
              )
            }
          >
            {strings.modal.requirements}
          </Text>
          <View style={styles.buttonContainer}>
            {/* Botão "Não" */}
            <TouchableOpacity
              style={[styles.button, styles.buttonNo]}
              onPress={handleNo}
            >
              <Text style={styles.buttonText}>{strings.modal.no}</Text>
            </TouchableOpacity>
            {/* Botão "Sim" */}
            <TouchableOpacity
              style={[styles.button, styles.buttonYes]}
              onPress={handleYes}
            >
              <Text style={styles.buttonText}>{strings.modal.yes}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semitransparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#222", // Updated background color
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 5,
    fontSize: 18,
    color: "white", // Updated text color
  },
  link: {
    marginBottom: 10,
    fontSize: 16,
    color: "#87CEEB", // Updated to a lighter blue color
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonYes: {
    backgroundColor: "green",
  },
  buttonNo: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
