import React from "react";
import { View, Text, Linking } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import styles from "./styles";
import moment from "moment";

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
        <Text style={styles.info}>{moment(item.publishedAt).fromNow()}</Text>
      </View>
      <Button
        icon={<Icon />}
        title="Read more"
        backgroundColor="#03A9F4"
        onPress={() => onPress(item.url)}
      />
    </Card>
  );
};

const onPress = (url) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URL: ${url}`);
    }
  });
};

export { renderArticleItem };
