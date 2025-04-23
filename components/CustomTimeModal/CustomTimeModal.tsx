import { StyleSheet, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type CustomTimeModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddTime: () => void;
  customMinutes: string;
  onChangeMinutes: (value: string) => void;
};

export function CustomTimeModal({
  visible,
  onClose,
  onAddTime,
  customMinutes,
  onChangeMinutes,
}: CustomTimeModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText type="title" style={styles.modalTitle}>
            Add Custom Time
          </ThemedText>

          <TextInput
            style={styles.modalInput}
            keyboardType="number-pad"
            placeholder="Enter minutes"
            value={customMinutes}
            onChangeText={onChangeMinutes}
            placeholderTextColor="#999"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
              <ThemedText style={styles.modalButtonText}>Cancel</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={onAddTime}>
              <ThemedText style={styles.modalButtonText}>Add Time</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 20,
    fontSize: 20,
  },
  modalInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF4444',
  },
  addButton: {
    backgroundColor: '#007AFF',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 