import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTask = tasks.find(task => task.title === newTaskTitle);
    if(findTask){
      Alert.alert('Você não pode cadastrar uma task com o mesmo nome');
    }else{
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks([...tasks, newTask]);
  }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists

    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
      {text: "Não"},
      {text: "Sim", onPress: () => setTasks(tasks.filter(task => task.id !== id))},
    ]);
  }

  function handleEditTask(id: number, title: string) {
    //TODO - edit task from state
    const findTask = tasks.find(task => task.id === id);
    if(findTask){
      findTask.title = title;
      setTasks([...tasks]);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})