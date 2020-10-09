import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import styles from "../styles";
import { renderArticleItem } from "../utility";

const filterForUniqueArticles = (arr) => {
  const cleaned = [];
  arr.forEach((item) => {
    let unique = true;
    cleaned.forEach((item2) => {
      const isEqual = JSON.stringify(item) === JSON.stringify(item2);
      if (isEqual) unique = false;
    });
    if (unique) cleaned.push(item);
  });
  return cleaned;
};

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticle] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasErrored, setHasApiError] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    if (lastPageReached) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=a7e6466278b14b1dae15f3024f2c035c&page=${pageNumber}`
      );
      const jsonData = await response.json();
      const hasMoreArticles = jsonData.articles.length > 0;
      if (hasMoreArticles) {
        const newArticleList = filterForUniqueArticles(
          articles.concat(jsonData.articles)
        );
        setArticle(newArticleList);
        setPageNumber(pageNumber + 1);
      } else {
        setLastPageReached(true);
      }
    } catch (error) {
      setHasApiError(true);
    }
    setLoading(false);
  };

  if (loading) {
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
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(text) => setText(text)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate("Article", { text, articles })}
        >
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Articles Count:</Text>
        <Text style={styles.info}>{articles.length}</Text>

        <View style={styles.publishWrapper}>
          <Text style={styles.label}>PUBLISHER</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Publisher", { articles })}
          >
            <AntDesign name="rightcircleo" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.title}
        onEndReached={getNews}
        onEndReachedThreshold={1}
        ListFooterComponent={
          lastPageReached ? (
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              No more articles
            </Text>
          ) : (
            <ActivityIndicator size="large" loading={loading} />
          )
        }
      />
    </View>
  );
}
