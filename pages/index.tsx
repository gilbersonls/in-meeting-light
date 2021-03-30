import useServiceWorker from "../hooks/useServiceWorker";

export default function Home() {
  const { start, stop, logs, isRunning, isBusy } = useServiceWorker();

  return (
    <div className="grid">
      <div className="grid__item sw-status">
        Service Worker Status:
        <br />
        {isRunning ? "Running..." : "Not Running"}
      </div>

      <div className="grid__item logs">
        <pre>{logs.map(log => JSON.stringify(log, null, 2))}</pre>
      </div>

      <div className="grid__item">{isBusy ? "BUSY" : "AVAILABLE"}</div>

      <div className="grid__item">
        <button onClick={() => start()}>START</button>
        <button onClick={() => stop()}>STOP</button>
      </div>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
        }

        .grid {
          display: grid;
          height: 100vh;
          grid-template-columns: 1f;
          grid-template-rows: auto 1fr auto auto;
          grid-gap: 16px;
        }

        .grid__item {
          padding: 16px;
          display: flex;
          justify-content: center;
          flex: 1;
        }

        .logs {
          overflow: auto;
        }
      `}</style>
    </div>
  );
}
