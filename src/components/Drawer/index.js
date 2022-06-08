import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../../theme';
import { connect } from 'react-redux';
import { logout, toggleAuthActionCreator } from '../../store/actions/authActions';
import { onSnackbar } from '../../store/actions/layoutActions';
import { useNavigation } from '@react-navigation/core';
import { InlineButton } from '../Button';
import { getStorageItem, setStorageItem } from '../../utils';

const DrawerContent = (props) => {
  const [token, setToken] = useState('')
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const token = await getStorageItem("Authorization")
      setToken(token)
    })()
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {token ? (
            null
          ) : (
              <View style={styles.userInfoSection}>


                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingVertical: 10,
                  }}>
                  <InlineButton
                    onPress={() => props.navigation.navigate('Signin')}
                    label={'Login / Register'}
                  />
                </View>
              </View>
            )}
          <Drawer.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => props.navigation.navigate('Settings')}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        {token ? (
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="log-out-outline" color={color} size={size} />
            )}
            label="Logout"
            onPress={() =>
              logout(() => {
                props.showAlert('Logging out');
                console.log('nav -->', props.navigation);
                props.toggleAuth('');
                setStorageItem('Authorization', '');
                setToken('')
                // navigation.navigate('AuthFlow', { screen: 'Signin' });
                // props.logout();
              })
            }
          />
        ) : null}

        {/* <TouchableOpacity style={styles.socialItem}>
          <Icon name="logo-facebook" size={26} color={theme.color.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialItem}>
          <Icon name="logo-linkedin" size={26} color={theme.color.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialItem}>
          <Icon name="logo-twitter" size={26} color={theme.color.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialItem}>
          <Icon name="logo-instagram" size={26} color={theme.color.primary} />
        </TouchableOpacity> */}
      </Drawer.Section>
    </View>
  );
};

const mapStateToProps = (state) => {
  // console.log('auth -->', state.auth);
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    showAlert: (message) => dispatch(onSnackbar(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    // padding: 20
  },
  userInfoSection: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomColor: '#00000029',
    borderBottomWidth: 1,
  },
  avatar: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  username: {
    fontFamily: theme.font.bold,
    fontSize: 16,
  },
  bottomDrawerSection: {
    // paddingLeft: 4,
  },
  socialItem: {
    marginHorizontal: 10,
  },
});
