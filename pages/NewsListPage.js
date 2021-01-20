import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import CardNews from '../components/CardNews';
import API_KEY from '../API_KEY';
import LottieView from 'lottie-react-native';
import Colors from '../style/Colors';

const NewsListPage = ({route}) => {
  const [newsList, setNewsList] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const {category} = route.params;

  useEffect(() => {
    getAPIData();
  }, []);

  const getAPIData = () => {
    axios
      .get(
        `http://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`,
      )
      .then((response) => {
        if (response.status == 200) {
          if (response.data.status == 'ok') {
            setNewsList(response.data.articles);
            setRefreshing(false);
          }
        }
      })
      .catch(function (error) {
        setNewsList([]);
        setRefreshing(false);
      });
  };

  if (newsList.length == 0 && !refreshing) {
    return (
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: Colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          margin: 20,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', paddingTop: 20, fontSize: 24}}>
          Impossibile caricare i dati
        </Text>
        <LottieView
          source={require('../assets/38463-error.json')}
          autoPlay
          loop
          style={{height: 300, width: 300, marginTop: -10}}
        />
        <TouchableOpacity
          disabled={refreshing}
          onPress={() => getAPIData()}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 40,
            paddingVertical: 16,
            borderRadius: 5,
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Ricarica</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <FlatList
        data={newsList}
        renderItem={({item}) => (
          <CardNews
            title={item.title}
            description={item.description}
            url={item.url}
            urlToImage={item.urlToImage}
            publishedAt={item.publishedAt}
            content={item.content}
          />
        )}
        keyExtractor={(item) => item.url}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getAPIData();
            }}
          />
        }
      />
    );
  }
};

export default NewsListPage;

const styles = StyleSheet.create({});
