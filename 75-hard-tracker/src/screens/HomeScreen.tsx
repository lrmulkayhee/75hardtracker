import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TaskList from '../components/TaskList';

const HomeScreen = () => {
    interface Task {
        id: string;
        title: string;
        completed: boolean;
    }

    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', title: 'Follow a diet', completed: false },
        { id: '2', title: 'Work out twice a day', completed: false },
        { id: '3', title: 'Drink a gallon of water', completed: false },
        { id: '4', title: 'Read 10 pages of a book', completed: false },
        { id: '5', title: 'Take a progress picture', completed: false },
    ]);

    const toggleTaskCompletion = (id: string): void => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>75 Hard Challenge Tracker</Text>
            <TaskList tasks={tasks} onToggleTask={toggleTaskCompletion} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default HomeScreen;