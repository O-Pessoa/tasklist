import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../../screens/Home';
import NewTask from '../../screens/NewTask';
import TaskDetail from '../../screens/TaskDetail';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Tarefas'}}
        />
        <Stack.Screen
          name="New Task"
          component={NewTask}
          options={{title: 'Novas Tarefas'}}
        />
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetail}
          options={{title: 'Tarefa'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
