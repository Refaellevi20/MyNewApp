import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Task } from '@/types/Task';
import { formatTime } from '@/utils/formatTime';

type TimeTrackingProps = {
  task: Task;
  onToggleTimer: (id: string) => void;
  onAddWastedTime: (id: string, minutes: number) => void;
  onOpenTimeModal: (id: string) => void;
};

export function TimeTracking({  task,  onToggleTimer,  onAddWastedTime,  onOpenTimeModal,}: TimeTrackingProps) {
  return (
    <>
      <View style={styles.timeTracking}>
        <ThemedText style={styles.timeText}>⏱ {formatTime(task.timeSpent)}</ThemedText>
        {task.wastedTime > 0 && (
          <ThemedText style={styles.wastedTimeText}>🎮 {formatTime(task.wastedTime)}</ThemedText>
        )}
      </View>

      <View style={styles.timeButtons}>
        <TouchableOpacity
          style={[styles.timerButton, task.isTracking && styles.timerButtonActive]}
          onPress={() => onToggleTimer(task.id)}
        >
          <ThemedText>{task.isTracking ? '⏸' : '▶️'}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wastedTimeButton}
          onPress={() => onAddWastedTime(task.id, 5)}
        >
          <ThemedText>+5m 🎮</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customTimeButton} onPress={() => onOpenTimeModal(task.id)}>
          <ThemedText>Custom ⏰</ThemedText>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  timeTracking: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  wastedTimeText: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  timeButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  timerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
  },
  timerButtonActive: {
    backgroundColor: '#FFE5E5',
  },
  wastedTimeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFE5E5',
  },
  customTimeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E5E5FF',
  },
}); 