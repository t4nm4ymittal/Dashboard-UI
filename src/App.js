import Dashboard from "./Dashboard";

function App() {
  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "'Roboto', sans-serif",
        background: "linear-gradient(to right, #001f3f, #0056b3)",
        minHeight: "100vh",
        padding: "30px",
        color: "white",
      }}
    >
      <header
        style={{
          marginBottom: "20px",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
        OpenShift Pod Monitoring
        </h1>
      </header>

      <main
         style={{
           background: "white",
           borderRadius: "10px",
           boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
           padding: "20px",
           maxWidth: "90%",
           margin: "auto",
         }}
      >
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
