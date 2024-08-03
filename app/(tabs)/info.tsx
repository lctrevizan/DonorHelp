import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  Platform,
} from "react-native";
import * as Linking from "expo-linking";
import { strings } from "../locales/strings";

// Função para abrir o mapa e buscar hemocentros
const buscarBancos = () => {
  const url = Platform.select({
    ios: "maps:0,0?q=hemocentro",
    android: "geo:0,0?q=hemocentro",
  });
  if (url) {
    Linking.openURL(url);
  } else {
    Alert.alert("Não foi possível determinar a URL específica da plataforma");
  }
};

export default function TabThreeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secao}>
        <Text style={styles.label}>Hemocentros próximos</Text>
        <Button title={strings.buttons.findBloodBank} onPress={buscarBancos} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  secao: {
    margin: 20,
  },
  label: {
    fontSize: 20,
    color: "black",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
