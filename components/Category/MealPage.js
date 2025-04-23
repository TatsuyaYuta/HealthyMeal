import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TopBarTest from "../TopBar/TopBarTest";
import BottomNav from "../NavBar/BottomNav";
import CategoryList from "./Main/CategoryList";
import { useNavigation } from "@react-navigation/native";
import config from "../../backend/config/config";
const { API_BASE_URL } = config;

const categories = [
  { id: 1, name: "Meal", image: require("../../assets/icons/Meal.png") },
  {
    id: 2,
    name: "Appetizers",
    image: require("../../assets/icons/Appetizers.png"),
  },
  { id: 3, name: "Dessert", image: require("../../assets/icons/Dessert.png") },
  { id: 4, name: "Salad", image: require("../../assets/icons/Salad.png") },
  { id: 5, name: "Drinks", image: require("../../assets/icons/Drinks.png") },
];

const MealPage = () => {
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();

  // Fetch meal data from API
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories/1`);
        const data = await response.json();
        setMeals(data.menus);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
  
    fetchMeals();
  }, []);
  

  return (
    <View style={styles.container}>
      <TopBarTest />

      <ScrollView style={styles.scrollView}>
        <View style={styles.mainContent}>
          <View style={styles.categoryListContent}>
            <CategoryList categories={categories} />
          </View>

          <View style={styles.sortByContainer}>
            <Text style={styles.sortByText}>Sort By</Text>
            <TouchableOpacity>
              <Text style={styles.sortByOption}>Popular</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterButton}>
              <Image
                source={require("../../assets/icons/Filter.png")}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>

          {meals.map((item) => {
  console.log("Image URL:", item.image); // ✅ ใส่ตรงนี้เพื่อดูค่า URL ของภาพ

  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate("MealDetail", { meal: item })}
      style={styles.mealCard}
    >
      <Image
  source={{ uri: item.image }}
  style={styles.mealImage}
/>
      <View style={styles.mealDetails}>
        <Text style={styles.mealName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingValue}>4.5</Text>
          <Image
            source={require("../../assets/icons/Star.png")}
            style={styles.starIcon}
          />
        </View>
        <Text style={styles.mealPrice}>{item.price} ฿</Text>
      </View>
      <View style={styles.line} />
    </TouchableOpacity>
  );
})}

        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFC757",
    paddingTop: 30,
  },
  scrollView: {
    flex: 1,
  },
  categoryListContent: {
    backgroundColor: "#FE8935",
    overflow: "hidden",
  },
  mainContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flex: 1,
    overflow: "hidden",
    paddingBottom: 80,
  },
  sortByContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  sortByText: {
    fontSize: 16,
    fontFamily: "Kanit-Regular",
    marginRight: 8,
  },
  sortByOption: {
    fontSize: 16,
    fontFamily: "Kanit-Regular",
    color: "#FF4500",
    marginRight: "auto",
    justifyContent: "flex-end",
  },
  filterButton: {
    width: 52,
    height: 33,
    backgroundColor: "#FFC757",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  filterIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  mealCard: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  mealImage: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },
  mealDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  mealName: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Kanit-Regular",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF5F1F",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  ratingValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Kanit-Regular",
    marginRight: 4,
  },
  starIcon: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  mealPrice: {
    fontSize: 16,
    fontFamily: "Kanit-Medium",
  },
  separator: {
    height: 1,
    backgroundColor: "#FD561F",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  line: {
    width: 376,
    height: 0,
    borderWidth: 0.5,
    borderColor: "#FD561F",
    alignSelf: "center",
  },
});

export default MealPage;
