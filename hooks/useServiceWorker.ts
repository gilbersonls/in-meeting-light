import { CalendarComponent } from "node-ical";
import { useCallback, useEffect, useState } from "react";
import { Workbox } from "workbox-window";

type BroadcastEventData = {
  status: "success" | "error";
  events: CalendarComponent[];
};

const LOCAL_STORAGE_KEY = "intervalId";

const IntervalID = {
  get: () => localStorage.getItem(LOCAL_STORAGE_KEY),
  set: (value: string) => localStorage.setItem(LOCAL_STORAGE_KEY, value),
  remove: () => localStorage.removeItem(LOCAL_STORAGE_KEY),
};

const useServiceWorker = () => {
  const [workbox, setWorkbox] = useState<Workbox>();
  const [logs, setLogs] = useState<BroadcastEventData[]>([]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const wb = new Workbox("/service-worker.js");
      await wb.register();

      wb.addEventListener("message", (event: { data: BroadcastEventData }) => {
        if (event.data.status === "success") {
          setIsBusy(event.data.events.some(e => e.summary === "Busy"));
        }

        console.info("[wb]: log.", event.data);
        setLogs(logs => [...logs, event.data]);
      });

      setWorkbox(wb);
      setIsRunning(!!IntervalID.get());
    })();
  }, []);

  const start = useCallback(() => {
    (async () => {
      if (!IntervalID.get()) {
        IntervalID.set(await workbox.messageSW({ type: "START" }));
        setIsRunning(true);
      }
    })();
  }, [workbox, setIsRunning]);

  const stop = useCallback(() => {
    (async () => {
      const intervalId = IntervalID.get();
      if (
        intervalId &&
        (await workbox.messageSW({ type: "STOP", intervalId }))
      ) {
        IntervalID.remove();
        setIsRunning(false);
      }
    })();
  }, [workbox, setIsRunning]);

  return { start, stop, logs, isRunning, isBusy };
};

export default useServiceWorker;
