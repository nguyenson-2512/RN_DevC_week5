import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Linking,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Icon } from "react-native-elements";

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import moment from "moment";
import { AntDesign } from '@expo/vector-icons';

//a7e6466278b14b1dae15f3024f2c035c
const url =
  "http://newsapi.org/v2/top-headlines?" +
  "country=us&" +
  "apiKey=a7e6466278b14b1dae15f3024f2c035c";

  const filterForUniqueArticles = arr => {
    const cleaned = [];
    arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  };


export default function App() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticle] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasErrored, setHasApiError] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    //const response = await fetch(`${url}&page=${pageNumber}`);
    if (lastPageReached) return;
    setLoading(true)
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=a7e6466278b14b1dae15f3024f2c035c&page=${pageNumber}`
      );
      const jsonData = await response.json();
      const hasMoreArticles = jsonData.articles.length > 0;
      if(hasMoreArticles) {
        const newArticleList = filterForUniqueArticles(
          articles.concat(jsonData.articles)
        )
        setArticle(newArticleList);
        setPageNumber(pageNumber + 1);
      } else {
        setLastPageReached(true)
      }
    } catch (error) {
      setHasApiError(true)
    }
    setLoading(false);
    // console.log('jsonData', jsonData)
  };



  if (loading) {
    console.log("clicked");
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (hasErrored) {
    return (
      <View style={styles.container}>
        <Text>Error =(</Text>
      </View>
    );
  };

  const renderArticleItem = ({ item }) => {
    return (
      <Card title={item.title} image={{ uri: item.urlToImage }}>
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Text style={{ marginBottom: 10 }}>{item.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).format("LLL")}
          </Text>
        </View>
        <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" onPress={() => onPress(item.url)} />
      </Card>
    );
  };

  const onPress = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Articles Count:</Text>
        <Text style={styles.info}>{articles.length}</Text>
      </View>
      <View style={styles.searchWrapper}>
        <TextInput style={styles.input} placeholder= "Search" />
        <TouchableOpacity style={styles.searchButton} onPress={() => console.log('clicksearch')}>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

// <FlatList
// data={articles}
// renderItem={renderArticleItem}
// keyExtractor={(item) => item.title}
// onEndReached={getNews}
// onEndReachedThreshold={1}
// ListFooterComponent={lastPageReached ? <Text>No more articles</Text> : <ActivityIndicator
//   size="large"
//   loading={loading}
// />}
// />

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    height: 30,
    width: "100%",
    backgroundColor: "pink",
  },
  row: {
    flexDirection: "row",
  },
  searchWrapper: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    height: 30,
    width: '70%',
    borderColor: 'gray',
    paddingLeft: 10,
  },
  searchButton: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    color: "black",
    marginRight: 10,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
    color: "grey",
  },
});
