import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const rules = [
  { id: 1, description: 'Drink 1 gallon of water', isCompleted: false },
  { id: 2, description: 'Read 10 pages of a book', isCompleted: false },
  { id: 3, description: 'Follow a diet', isCompleted: false },
  { id: 4, description: 'No cheat meals or alcohol', isCompleted: false },
  { id: 5, description: 'Exercise twice a day for 45 minutes', isCompleted: false },
];

type Rule = {
  id: number;
  description: string;
  isCompleted: boolean;
};

const App = () => {
  const [taskList, setTaskList] = useState<Rule[]>(rules);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [progressPicture, setProgressPicture] = useState<string | null>(null);

  const toggleCompletion = (id: number) => {
    const updatedTasks = taskList.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTaskList(updatedTasks);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setStartDate(currentDate);
  };

  const takeProgressPicture = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        if (response.assets[0].uri) {
          setProgressPicture(response.assets[0].uri);
        }
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>75 Hard Tracker</Text>
        <View style={styles.datePickerContainer}>
        </View>
        {taskList.map(task => (
          <View key={task.id} style={styles.taskContainer}>
            <CheckBox
              value={task.isCompleted}
              onValueChange={() => toggleCompletion(task.id)}
            />
            <Text style={styles.taskText}>{task.description}</Text>
          </View>
        ))}
        <View style={styles.photoContainer}>
          <Button title="Take Progress Picture" onPress={takeProgressPicture} />
          {progressPicture && (
            <Image source={{ uri: progressPicture }} style={styles.progressImage} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  datePickerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateText: {
    fontSize: 18,
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 18,
    marginLeft: 10,
  },
  photoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default App;