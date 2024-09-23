import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

import { images } from "../constants";

const EmptyState = ({ title, subtitle, buttontext, route }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
        />
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <CustomButton
        title={buttontext}
        handlePress={() => router.push(route)}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
