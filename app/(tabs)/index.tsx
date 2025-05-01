import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TaskCard } from '@/components/TaskCard/TaskCard';
import { ScheduleModal } from '@/components/ScheduleModal/ScheduleModal';
import { CustomTimeModal } from '@/components/CustomTimeModal/CustomTimeModal';
import { Task } from '@/types/Task';

export default function TodoScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
 const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [customMinutes, setCustomMinutes] = useState('');

  // Update timer every second for active tasks
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(currentTasks => 
        currentTasks.map(task => ({
          ...task,
          timeSpent: task.isTracking ? task.timeSpent + 1 : task.timeSpent
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTask = () => {
    if (newTask.trim() === '') {
      Alert.alert('Error', 'Please enter a task');
      return;
    }
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      priority: 'medium',
      completed: false,
      timeSpent: 0,
      isTracking: false,
      wastedTime: 0
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleTimer = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isTracking: !task.isTracking } : task
    ));
  };

  const addWastedTime = (id: string, minutes: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, wastedTime: task.wastedTime + (minutes * 60) } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const setPriority = (id: string, priority: Task['priority']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, priority } : task
    ));
  };

  const handleScheduleTask = (id: string) => {
    setSelectedTaskId(id);
    setScheduleModalVisible(true);
  };

  const handleSaveSchedule = (reminder: Date, repeat: 'daily' | 'weekly' | 'monthly' | 'none', repeatTime?: string) => {
    if (selectedTaskId) {
      setTasks(tasks.map(task =>
        task.id === selectedTaskId
          ? { ...task, reminder, repeat, repeatTime }
          : task
      ));
      setScheduleModalVisible(false);
    }
  };
  const openTimeModal = (id: string) => {
    setSelectedTaskId(id);
    setModalVisible(true);
    setCustomMinutes('');
  };

  const addCustomWastedTime = () => {
    const minutes = parseInt(customMinutes);
    if (isNaN(minutes) || minutes <= 0) {
      Alert.alert('Error', 'Please enter a valid number of minutes');
      return;
    }

    if (selectedTaskId) {
      addWastedTime(selectedTaskId, minutes);
      setModalVisible(false);
      setCustomMinutes('');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Daily Tasks</ThemedText>
      
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add a new task..."
          placeholderTextColor="#999"
        />
       <TouchableOpacity onPress={addTask} style={styles.addButton}>
  <IconSymbol name="plus.circle.fill" size={32} color="white" />
  <ThemedText style={styles.addButtonText}>+</ThemedText>
</TouchableOpacity>
      </ThemedView>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleTask={toggleTask}
          onToggleTimer={toggleTimer}
          onAddWastedTime={addWastedTime}
          onOpenTimeModal={openTimeModal}
          onSetPriority={setPriority}
          onDeleteTask={deleteTask}
          onScheduleTask={handleScheduleTask}
        />
      ))}

      <CustomTimeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTime={addCustomWastedTime}
        customMinutes={customMinutes}
        onChangeMinutes={setCustomMinutes}
      />

     <ScheduleModal
        visible={scheduleModalVisible}
        onClose={() => setScheduleModalVisible(false)}
        onSave={handleSaveSchedule}
        currentReminder={selectedTaskId ? tasks.find(t => t.id === selectedTaskId)?.reminder : undefined}
        currentRepeat={selectedTaskId ? tasks.find(t => t.id === selectedTaskId)?.repeat : 'none'}
        currentRepeatTime={selectedTaskId ? tasks.find(t => t.id === selectedTaskId)?.repeatTime : undefined}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    position: 'absolute',
    opacity: 0.5,
    marginBottom: 5,
  },
});
