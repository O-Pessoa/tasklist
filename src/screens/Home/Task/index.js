import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Task = ({name, id, navigate}) => {
  return (
    <TouchableOpacity
      style={styles.task}
      onPress={() => {
        navigate('TaskDetail', {id});
      }}>
      <Text style={styles.h1}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Task;
