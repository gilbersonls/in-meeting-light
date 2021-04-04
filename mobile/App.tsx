import { StatusBar } from "expo-status-bar";
import * as TaskManager from "expo-task-manager";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import inMeetingTask from "./tasks/in-meeting-task";

TaskManager.defineTask(inMeetingTask.taskName, inMeetingTask.task);

export default function App() {
  React.useEffect(() => {
    inMeetingTask.register();

    return () => {
      inMeetingTask.unregister();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
