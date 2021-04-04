import { Notifications } from "expo";
import * as BackgroundFetch from "expo-background-fetch";

import api from "../services/api";

const IN_MEETING_TASK = "IN_MEETING_TASK";

const task = async () => {
  console.warn("entrei");

  try {
    const data = await api.getEvents();

    console.warn("foi");
    console.log(data);

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Time's up!",
        body: "Change sides!",
      },
      trigger: {
        seconds: 1,
      },
    });

    return data
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData;
  } catch (error) {
    return BackgroundFetch.Result.Failed;
  }
};

const register = async () => {
  console.warn("registering");
  alert("entrei");
  await BackgroundFetch.registerTaskAsync(IN_MEETING_TASK, {
    stopOnTerminate: false,
    minimumInterval: 25,
  });
  console.warn("registered");
};

const unregister = async () =>
  await BackgroundFetch.unregisterTaskAsync(IN_MEETING_TASK);

export default {
  register,
  unregister,
  taskName: IN_MEETING_TASK,
  task,
};
