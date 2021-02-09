import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Task from './Task';

import styles from './styles';

const Home = (props) => {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.btnAddTask}
          onPress={() => {
            props.navigation.navigate('New Task');
          }}>
          <Icon name="add-task" size={30} color="#00beee" />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  useEffect(() => {
    AsyncStorage.getItem('tasks').then((res) => {
      setTasks(JSON.parse(res));
    });
  }, [isFocused]);

  const renderTask = ({item}) => {
    return (
      <Task
        name={item.name}
        id={item.id}
        navigate={props.navigation.navigate}
      />
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(task) => task.id.toString()}
      />
    </View>
  );
};

export default Home;
