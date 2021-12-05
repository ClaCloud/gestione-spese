export default function Offline() {
  function goBack() {
    window.history.back();
  }

  return (
    <div className="modal" style={{ height: "calc(100vh - 67px)" }}>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <h1>Sei Offline</h1>
        <p>
          Se sei offline non puoi aggiungere, modificare o rimuovere nulla,
          altrimenti non verrebbe salvato
        </p>
        <a onClick={goBack} className="button bgprimary">
          torna indietro
        </a>
      </div>
    </div>
  );
}
