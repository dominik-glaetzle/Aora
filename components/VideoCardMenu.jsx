import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Beispiel für FontAwesome

const VideoComponent = ({ video }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Hier kannst du den Like-Status in deiner Datenbank aktualisieren
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLike}>
        <Icon name={isLiked ? 'heart' : 'heart-o'} size={35} color={isLiked ? 'red' : 'gray'} />
      </TouchableOpacity>
    </View>
  );
};

export default VideoComponent;