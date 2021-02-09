import React from 'react';
import {View, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.txtInputDetail = React.createRef();
    this.state = {
      name: '',
      detail: '',
    };
  }

  async addTask() {
    let tasks = await AsyncStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];

    let id = parseInt(await AsyncStorage.getItem('count'), 10) || 0;
    await AsyncStorage.setItem('count', (id + 1).toString());

    await AsyncStorage.setItem(
      'tasks',
      JSON.stringify([...tasks, {...this.state, id}]),
    );
    this.setState({name: '', detail: ''});
    Keyboard.dismiss();
    this.props.navigation.navigate('Home');
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={this.addTask.bind(this)}>
          <Icon name="add" size={30} color="#00beee" />
        </TouchableOpacity>
      ),
    });
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.containerInputs}>
          <TextInput
            style={styles.textInput}
            placeholder="Nome"
            autoCorrect={true}
            returnKeyType="next"
            value={this.state.name}
            onChangeText={(text) => {
              this.setState({name: text});
            }}
            onSubmitEditing={() => {
              this.txtInputDetail.current.focus();
            }}
          />
          <TextInput
            style={styles.textInput}
            ref={this.txtInputDetail}
            placeholder="Detalhes"
            autoCorrect={true}
            multiline={true}
            returnKeyType="done"
            value={this.state.detail}
            onChangeText={(text) => {
              this.setState({detail: text});
            }}
          />
        </View>
      </View>
    );
  }
}

export default NewTask;
