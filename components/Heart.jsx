import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useGlobalContext } from "../context/GlobalProvider.js";
import { updateLikes } from "../lib/appwrite.js";

// VideoComponent for rendering
const Heart = ({ videoId, likedBy }) => {
  const { user } = useGlobalContext();
  const username = user?.username;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (likedBy.includes(username)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedBy, username]);

  const handleButtonPress = () => {
    // console.log("likedBy: ", likedBy);
    // console.log("username :", username);

    if (isLiked) {
      console.log("Benutzer hat das Video bereits geliket");
      updateLikes(videoId, username, 'unlike');
      setIsLiked(false);
    } else {
      console.log("Array leer oder Video nicht geliket");
      updateLikes(videoId, username, 'like');
      setIsLiked(true);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleButtonPress}>
        <Icon name={isLiked ? 'heart' : 'heart-o'} size={35} color={isLiked ? 'red' : 'gray'} />
      </TouchableOpacity>
    </View>
  );
};

export default Heart;