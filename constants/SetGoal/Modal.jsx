import React from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Fonts } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";
export default function PickerModal({
  visible,
  data,
  title,
  onSelect,
  onClose,
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.modalText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Xong</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 50
  },
  modalTitle: {
    fontSize: 28,
    fontFamily: Fonts.NUNITO_BLACK,
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  modalItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: "#000",
    fontFamily: Fonts.NUNITO_BLACK,
  },
  closeButton: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffa726",
    borderRadius: 30,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: Fonts.NUNITO_BLACK,
  },
});
