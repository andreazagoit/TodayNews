import React from 'react';
import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewsListPage from './pages/NewsListPage';
import Colors from './style/Colors';

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: Colors.primary,
            paddingHorizontal: 20,
            height: 64,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: 'white'}}>TodayNews</Text>
        </View>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              scrollEnabled: true,
              tabStyle: {width: 140, height: 50},
              labelStyle: {color: 'white'},
              indicatorStyle: {backgroundColor: 'white'},
              style: {backgroundColor: Colors.secondary},
            }}>
            <Tab.Screen
              name="general"
              component={NewsListPage}
              initialParams={{category: 'general'}}
            />
            <Tab.Screen
              name="business"
              component={NewsListPage}
              initialParams={{category: 'business'}}
            />
            <Tab.Screen
              name="entertainment"
              component={NewsListPage}
              initialParams={{category: 'entertainment'}}
            />
            <Tab.Screen
              name="health"
              component={NewsListPage}
              initialParams={{category: 'health'}}
            />
            <Tab.Screen
              name="science"
              component={NewsListPage}
              initialParams={{category: 'science'}}
            />
            <Tab.Screen
              name="sports"
              component={NewsListPage}
              initialParams={{category: 'sports'}}
            />
            <Tab.Screen
              name="technology"
              component={NewsListPage}
              initialParams={{category: 'technology'}}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
