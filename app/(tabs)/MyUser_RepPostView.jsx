import React from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import MyUser_RepPostView_Layout from "../../components/User_compo/MyUser_RepPostView_Layout";

const MyUser_RepPostView = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  let parsedReport = null;

  try {
    const reportParam = Array.isArray(params.report)
      ? params.report[0]
      : params.report;

    parsedReport = reportParam ? JSON.parse(reportParam) : null;
  } catch (error) {
    console.log("Failed to parse report data:", error);
    parsedReport = null;
  }

  const handleEdit = () => {
    Alert.alert("Edit Report", "Edit function will be connected later.");
  };

  const handleDelete = () => {
    Alert.alert("Delete Report", "Are you sure you want to delete this report?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <MyUser_RepPostView_Layout
      report={parsedReport}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default MyUser_RepPostView;