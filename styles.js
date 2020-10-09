import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //Home.js
  container: {
		flex: 1,
		paddingTop: 10,
    alignItems: "center",
    backgroundColor: "#f4f2f2",
    justifyContent: "center",
  },
  header: {
    height: 30,
    width: "100%",
    backgroundColor: "pink",
  },
  row: {
    flexDirection: "row",
    paddingBottom: 10
  },
  searchWrapper: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    height: 30,
    width: "70%",
    borderColor: "gray",
    paddingLeft: 10,
  },
  searchButton: {
    justifyContent: "center",
    marginLeft: 10,
  },
  publishWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 60
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
  //Publisher.js
  publisherWrapper: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
  },
  publisher: {
    flex: 0.6 ,
    alignItems: "center",
  },
  amountArticles: {
    flex: 0.4,
    alignItems: "center",
  },
  tableHeader: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'lightblue',
    width: "100%",
    textAlign: "center",
    borderWidth: 1,
    borderColor: 'gray',
  },
  tableText: {
    padding: 7,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
    fontWeight: "400",
    fontSize: 16
},
//Article.js
resultText: {
  fontSize: 24,
  fontWeight: "300",
  padding: 15
}
});

export default styles;
