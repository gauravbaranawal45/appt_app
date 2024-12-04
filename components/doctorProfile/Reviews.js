import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
const seeAllColor = "#4C4DDC";

const Reviews = ({ item, defaultColor }) => {
  const [textlimit, setTextlimit] = useState(30);
  const [isredmore, setIsredmore] = useState(false);

  const handleAbout = (about) => {
    let newword = "";
    const words = about?.split(" ") ?? [];
    words?.slice(0, textlimit).forEach((item) => {
      newword += item + " ";
    });
    return newword;
  };

  const readMore = (about) => {
    if (isredmore) {
      setTextlimit(30);
      setIsredmore(false);
    } else {
      const words = about.split(" ");
      setTextlimit(words.length);
      setIsredmore(true);
    }
  };

  return (
    <View
      style={{
        marginTop: 20,
        // borderWidth: 1,
        borderBottomWidth: 0.5,
        borderColor: defaultColor.defaultBorder,
        // borderTopWidth: 0.5,
        paddingBottom: 15,
      }}
    >
      <View>
        <View style={styles.sectionWrapper}>
          <Avatar.Text size={24} label={item.fullName[0]} />
          <View style={styles.reviewWrapper}>
            <View style={styles.flexBetween}>
              <View style={styles.flexCenter}>
                <Text style={styles.reviewName}>{item.fullName}</Text>
                <MaterialIcons
                  style={{ marginLeft: 5 }}
                  name="verified"
                  size={18}
                  color={seeAllColor}
                />
              </View>
              <View style={styles.flexCenter}>
                {item.recommendation === "yes" ? (
                  <AntDesign name="like1" size={18} color={seeAllColor} />
                ) : (
                  <AntDesign name="dislike2" size={18} color={"red"} />
                )}
                {/* <MaterialIcons
                  name="star"
                  size={22}
                  color={"#ffa534"}
                  style={{ marginRight: 5 }}
                />
                <Text>4.5</Text> */}
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 14, color: "#2d2d32" }}>
            {handleAbout(item.desc)}
          </Text>
          {(item.desc?.split(" ") ?? []).length > 30 && (
            <Text
              style={{
                color: defaultColor.defaultColor,
                fontWeight: 600,
                marginTop: 8,
              }}
              onPress={() => readMore(item.desc)}
            >
              {isredmore ? "Show Less" : "Read More"}
            </Text>
          )}

          <View style={{ ...styles.flexCenter, marginTop: 15 }}>
            <FontAwesome name="heart" size={22} color="red" />
            <Text style={{ marginLeft: 5, fontSize: 14, fontWeight: 600 }}>
              12
            </Text>
            <Text style={{ marginLeft: 50, fontWeight: 600 }}>5 month ago</Text>
          </View>
        </View>
      </View>

      {/* <View style={styles.inputWrapper}>
        <TextInput
          multiline={true}
          numberOfLines={9}
          style={styles.input}
          placeholder="Enter Your Comment"
          placeholderTextColor="#63635E"
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            paddingVertical: 10,
            backgroundColor: seeAllColor,
            borderRadius: 10,
            marginTop: 10,
          }}
          // onPress={onPress}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              color: "#fff",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D9D9",
    borderRadius: 10,
    gap: 10,
  },
  reviewImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  reviewWrapper: {
    // marginLeft: 10,
    flex: 1,
  },
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  inputWrapper: {
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // marginTop: 10,
  },
  input: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    backgroundColor: "#fff",
    color: "#424242",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#e3e6f0",
  },
  // sendIconWrap: {
  //   backgroundColor: seeAllColor,
  //   padding: 10,
  //   borderTopRightRadius: 10,
  //   borderBottomRightRadius: 10,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});

export default Reviews;
