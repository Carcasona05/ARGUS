import React, { useState } from "react";
import { View, Button } from "react-native";

import User_successalert from "../../components/User_successalert";
import User_failalert from "../../components/User_failalert";

const SampleScreen = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Button title="Show Success" onPress={() => setShowSuccess(true)} />
      <Button title="Show Fail" onPress={() => setShowFail(true)} />

      <User_successalert
        visible={showSuccess}
        title="Report Submitted"
        message="Your incident report has been submitted successfully."
        buttonText="Done"
        onClose={() => setShowSuccess(false)}
      />

      <User_failalert
        visible={showFail}
        title="Submission Failed"
        message="Please check your connection and try again."
        buttonText="Try Again"
        onClose={() => setShowFail(false)}
      />
    </View>
  );
};

export default SampleScreen;