import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../style/Colors';

const CardNews = ({
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  content,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(url)}>
      {urlToImage && (
        <Image
          style={styles.cardImage}
          source={{
            uri: urlToImage,
          }}
        />
      )}
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text>{description}</Text>
        <Text style={styles.cardDate}>
          {publishedAt.substring(0, 10).split('-').reverse().join('-')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardNews;

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  cardContainer: {
    padding: 20,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  cardImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    backgroundColor: Colors.primary,
  },
  cardDate: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
});
