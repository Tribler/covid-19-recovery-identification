import React from 'react';
import {Button} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const DrawerButton: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Button
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
      }}
      color="dodgerblue"
      mode="outlined"
      icon="menu"
      onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }}> Menu </Button>
  );
};

export default DrawerButton;
