import React from "react";
import { View, Text, FlatList } from "react-native";

import styles from "../styles";
import { renderArticleItem } from "../utility";

export default function Article(props) {
  let { text } = props.route.params;
  let { articles } = props.route.params;

  const filteredArticle = articles.filter(
    (item) => item.title.indexOf(text) !== -1
  );
  return (
    <View>
      <Text style={styles.resultText}>Search results for {`"${text}"`}: </Text>
      <FlatList
        data={filteredArticle}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
}
