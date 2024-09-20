import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import SearchInput from "../../components/SearchInput";

import { images } from "../../constants";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";

import { getAllPosts } from "../../lib/appwrite.js"

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await getAllPosts();
        setData(response);
        console.log(response);  // This should now log the data
      } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch data when component mounts
    fetchData();
  }, []);




  const [refresing, setRefresing] = useState(false);

  const onRefresh = async () => {
    setRefresing(true);
    // re call videos -> if any new videos appear
    setRefresing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{id: 18}, {id: 28}, {id: 38},]}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-white text-2xl">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />
            <View className="w-ull flex-1 pt-5 pb-2">
              <Text className="text-gray-100 text-lg mb-3 font-pregular">
                Latest Videos
              </Text>

              <Trending posts={[{id : 1}, {id : 2}, {id: 3}] ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refresing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  );
};

export default Home;