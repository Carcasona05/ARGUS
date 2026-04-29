import React from "react";
import { useLocalSearchParams } from "expo-router";
import User_RepPostView_Layout from "../../components/User_compo/User_RepPostView_Layout";

const User_RepPostView = () => {
  const { post } = useLocalSearchParams();

  let parsedPost = null;

  try {
    parsedPost = post ? JSON.parse(post) : null;
  } catch (error) {
    parsedPost = null;
  }

  return <User_RepPostView_Layout post={parsedPost} />;
};

export default User_RepPostView;