import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Task } from '@/types/Task';
import { TimeTracking } from './TimeTracking';

type TaskCardProps = {
  task: Task;
  onToggleTask: (id: string) => void;
  onToggleTimer: (id: string) => void;
  onAddWastedTime: (id: string, minutes: number) => void;
  onOpenTimeModal: (id: string) => void;
  onSetPriority: (id: string, priority: Task['priority']) => void;
  onDeleteTask: (id: string) => void;
};

export function TaskCard({
  task,
  onToggleTask,
  onToggleTimer,
  onAddWastedTime,
  onOpenTimeModal,
  onSetPriority,
  onDeleteTask,
}: TaskCardProps) {
  return (
    <ThemedView
      style={[
        styles.taskCard,
        task.completed && styles.completedTask,
        styles[`${task.priority}Priority`],
      ]}
    >
      <View style={styles.taskMainContent}>
        <TouchableOpacity style={styles.taskContent} onPress={() => onToggleTask(task.id)}>
          <ThemedText style={[styles.taskText, task.completed && styles.completedTaskText]}>
            {task.title}
          </ThemedText>
        </TouchableOpacity>

        <TimeTracking
          task={task}
          onToggleTimer={onToggleTimer}
          onAddWastedTime={onAddWastedTime}
          onOpenTimeModal={onOpenTimeModal}
        />
      </View>

      <ThemedView style={styles.taskActions}>
        <TouchableOpacity
          onPress={() => onSetPriority(task.id, 'high')}
          style={[styles.priorityButton, styles.highPriorityButton]}
        >
          <ThemedText>H</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSetPriority(task.id, 'medium')}
          style={[styles.priorityButton, styles.mediumPriorityButton]}
        >
          <ThemedText>M</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSetPriority(task.id, 'low')}
          style={[styles.priorityButton, styles.lowPriorityButton]}
        >
          <ThemedText>L</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeleteTask(task.id)} style={styles.deleteButton}>
          <IconSymbol name="trash" size={20} color="#FF4444" />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskMainContent: {
    flex: 1,
    gap: 8,
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    opacity: 0.7,
    backgroundColor: '#f0f0f0',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
  },
  taskActions: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highPriorityButton: {
    backgroundColor: '#FFE5E5',
  },
  mediumPriorityButton: {
    backgroundColor: '#FFF4E5',
  },
  lowPriorityButton: {
    backgroundColor: '#E5FFE5',
  },
  deleteButton: {
    padding: 5,
  },
  highPriority: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF4444',
  },
  mediumPriority: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFA500',
  },
  lowPriority: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
}); 