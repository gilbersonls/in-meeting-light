import * as TaskManager from "expo-task-manager";

import inMeetingTask from "./in-meeting-task";

TaskManager.defineTask(inMeetingTask.taskName, inMeetingTask.task);
