import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../styles";

export default function Publisher(props) {
  let { articles } = props.route.params;
  let publishers = [];

  articles.map((item) => {
    publishers.push(item.source.name);
  });
  publishers.sort();

  function getAmountArticle(arr) {
    let a = [],
      b = [],
      prev;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        b.push(1);
      } else b[b.length - 1]++;
      prev = arr[i];
    }
    return [a, b];
  }

  const [publisherList, amount] = getAmountArticle(publishers);
  return (
    <ScrollView>
      <View style={styles.publisherWrapper}>
        <View style={styles.publisher}>
          <Text style={styles.tableHeader}>Publishers</Text>
          {publisherList.map((item) => {
            return (
              <Text style={[styles.tableText, { color: "blue" }]}>{item}</Text>
            );
          })}
        </View>
        <View style={styles.amountArticles}>
          <Text style={styles.tableHeader}>Amount of Articles</Text>
          {amount.map((item) => {
            return (
              <Text style={[styles.tableText, { color: "red" }]}>{item}</Text>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
