import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask }) => {
  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        value={item.completed}
        onValueChange={() => onToggleTask(item.id)}
      />
      <Text style={item.completed ? styles.completedTask : styles.task}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  task: {
    marginLeft: 10,
  },
  completedTask: {
    marginLeft: 10,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TaskList;