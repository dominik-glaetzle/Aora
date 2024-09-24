import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, View } from "react-native";
import { searchPosts } from "../../lib/appwrite.js";
import useAppwrite from "../../lib/useAppwrite.js";
import { useLocalSearchParams } from "expo-router";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard.jsx";

const Bookmark = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <Text className="text-2xl text-white font-psemibold">
              Saved Videos
            </Text>

            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} text="Search your saved videos" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No saved videos found"
            subtitle="No saved videos found for this query"
            buttontext="Browse Videos"
            route='/home'
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
