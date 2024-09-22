import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider.js";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { getCurrentUser, signIn, deleteSessions } from "../../lib/appwrite";
import { router } from "expo-router";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  // Check for an active session
  const checkActiveSession = async () => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      // No active session
      return null;
    }
  };

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return; // Exit early if validation fails
    }

    setSubmitting(true);

    try {
      const activeSession = await checkActiveSession();

      if (activeSession) {
        // Delete the active sessions if one exists
        await deleteSessions();
      }

      // Proceed with sign-in
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      // Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[74vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in into Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton title="Sign-In"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting }/>
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-white font-psemibold text-base">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-secondary font-psemibold text-base">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
