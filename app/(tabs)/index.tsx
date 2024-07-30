import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Alert,
  Platform,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";
import * as Calendar from "expo-calendar";
import DatePicker from "../../components/DatePicker";
import { strings } from "../locales/strings";

export default function TelaInicial() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const anoAtual = new Date().getFullYear();

  // Solicita permissão para acessar o calendário ao carregar o componente
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(strings.alerts.permissionDenied);
      }
    })();
  }, []);

  // Função para criar um evento no calendário
  const criarEvento = async () => {
    if (!dia || !mes || !ano) {
      Alert.alert(strings.alerts.selectDate);
      return;
    }

    // Cria o objeto de data e define para meio-dia para evitar problemas de fuso horário
    const eventDate = new Date(
      parseInt(ano),
      parseInt(mes) - 1,
      parseInt(dia),
      12,
      0,
      0
    );

    // Cria as datas de início e fim para o evento
    const startDate = new Date(eventDate);
    const endDate = new Date(eventDate);
    endDate.setHours(23, 59, 59);

    try {
      // Obtém os calendários disponíveis
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      const defaultCalendar = calendars.find((cal) => cal.allowsModifications);

      if (!defaultCalendar) {
        Alert.alert("Calendário padrão não encontrado");
        return;
      }

      // Cria o evento no calendário padrão
      await Calendar.createEventAsync(defaultCalendar.id, {
        title: "Marcar doação de sangue",
        startDate,
        endDate,
        allDay: true,
        timeZone: "GMT",
      });
      Alert.alert(strings.alerts.eventCreated);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      Alert.alert(strings.alerts.eventError, errorMessage);
    }
  };

  return (
    <SafeAreaView style={estilos.container}>
      <Button title="Marcar lembrete" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={estilos.centeredView}>
          <View style={estilos.modalView}>
            <TouchableOpacity
              style={estilos.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={estilos.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={estilos.label}>{strings.datePickerLabel}</Text>
            <DatePicker
              dia={dia}
              setDia={setDia}
              mes={mes}
              setMes={setMes}
              ano={ano}
              setAno={setAno}
              anoAtual={anoAtual}
            />
            <Button title={strings.buttons.createEvent} onPress={criarEvento} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Estilos para os componentes
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#222",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
