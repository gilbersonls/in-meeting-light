const broadcast = async message => {
  const clients = await self.clients.matchAll({ type: "window" });
  for (const client of clients) {
    client.postMessage(message);
  }
};

self.addEventListener("message", event => {
  const { type, ...payload } = event.data;
  switch (type) {
    case "START":
      const intervalId = setInterval(() => {
        fetch("/api/events")
          .then(response => response.json())
          .then(data => {
            broadcast({ status: "success", events: data });
            console.info("[sw]: fetch success.", data);
          })
          .catch(err => {
            broadcast({ status: "error", err });
            console.info("[sw]: fetch error.", err);
          });
      }, 60000);

      console.info("[sw]: started.");
      return event.ports[0].postMessage(intervalId);

    case "STOP":
      clearInterval(payload.intervalId);
      console.info("[sw]: stopped.");
      return event.ports[0].postMessage(true);
  }
});
