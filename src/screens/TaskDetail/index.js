import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const TaskDetail = (props) => {
  const [task, setTask] = useState({
    id: props.route.params.id,
    name: '',
    detail: '',
  });

  useEffect(() => {
    AsyncStorage.getItem('tasks').then((res) => {
      setTask(
        JSON.parse(res).find((Task) => Task.id === props.route.params.id),
      );
    });
  }, [props.route.params]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.btnDelete}
          onPress={async () => {
            let tasks = await AsyncStorage.getItem('tasks');
            tasks = tasks ? JSON.parse(tasks) : [];
            let index = tasks.findIndex((Task) => Task.id === task.id);
            if (index > -1) {
              tasks.splice(index, 1);
            }
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            props.navigation.navigate('Home');
          }}>
          <Icon name="delete" size={30} color="#ff0000" />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, task.id]);

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.txtName}>{task.name}</Text>
        <Text style={styles.txtDetail}>{task.detail}</Text>
      </View>
    </View>
  );
};

export default TaskDetail;
