import React, { useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

type ScheduleModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (reminder: Date, repeat: 'daily' | 'weekly' | 'monthly' | 'none', repeatTime?: string) => void;
  currentReminder?: Date;
  currentRepeat?: 'daily' | 'weekly' | 'monthly' | 'none';
  currentRepeatTime?: string;
};

export function ScheduleModal({
  visible,
  onClose,
  onSave,
  currentReminder,
  currentRepeat = 'none',
  currentRepeatTime,
}: ScheduleModalProps) {
  const [date, setDate] = useState(currentReminder || new Date());
  const [repeat, setRepeat] = useState<'daily' | 'weekly' | 'monthly' | 'none'>(currentRepeat);
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    const repeatTime = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    onSave(date, repeat, repeat !== 'none' ? repeatTime : undefined);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText type="title" style={styles.modalTitle}>
            Schedule Task
          </ThemedText>

          <View style={styles.dateSection}>
            <ThemedText type="subtitle">Reminder Date & Time:</ThemedText>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowPicker(true)}
            >
              <ThemedText>
                {date.toLocaleString()}
              </ThemedText>
            </TouchableOpacity>
          </View>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setShowPicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}

          <View style={styles.repeatSection}>
            <ThemedText type="subtitle">Repeat:</ThemedText>
            <View style={styles.repeatButtons}>
              <TouchableOpacity
                style={[styles.repeatButton, repeat === 'none' && styles.repeatButtonActive]}
                onPress={() => setRepeat('none')}
              >
                <ThemedText>None</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.repeatButton, repeat === 'daily' && styles.repeatButtonActive]}
                onPress={() => setRepeat('daily')}
              >
                <ThemedText>Daily</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.repeatButton, repeat === 'weekly' && styles.repeatButtonActive]}
                onPress={() => setRepeat('weekly')}
              >
                <ThemedText>Weekly</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.repeatButton, repeat === 'monthly' && styles.repeatButtonActive]}
                onPress={() => setRepeat('monthly')}
              >
                <ThemedText>Monthly</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
              <ThemedText>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSave}>
              <ThemedText style={styles.saveButtonText}>Save</ThemedText>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  dateSection: {
    marginBottom: 20,
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 8,
  },
  repeatSection: {
    marginBottom: 20,
  },
  repeatButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    flexWrap: 'wrap',
    gap: 8,
  },
  repeatButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 70,
    alignItems: 'center',
  },
  repeatButtonActive: {
    backgroundColor: '#007AFF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: 'white',
  },
}); 