import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, RefreshControl, ToastAndroid} from 'react-native';
import axios from 'axios';
import CardNews from '../components/CardNews';
import API_KEY from '../API_KEY';

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
        if (category == 'general') {
          ToastAndroid.show('Impossibile ottenere i dati', ToastAndroid.SHORT);
        }
        setRefreshing(false);
      });
  };

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
};

export default NewsListPage;

const styles = StyleSheet.create({});
