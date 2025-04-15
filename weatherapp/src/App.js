// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("tr");
  const apiKey = "";
  const units = "metric";
  const [array, setArray] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const submit = async () => {
    if (!city) {
      alert("Lütfen şehir ismi giriniz");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${language}`
      );
      console.log("Veri başarı ile çekildi", response.data);

      setArray(response.data);
    } catch (error) {
      console.log("Veri çekilemedi", error);
      setArray(null);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #74ebd5, #9face6)",
      }}
    >
      <div
        className="p-4 rounded shadow-lg text-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2 className="mb-4 text-white">Hava Durumu</h2>
        <div className="input-group mb-4">
          <input
            type="text"
            value={city}
            onChange={handleChange}
            className="form-control bg-transparent text-gray border-white placeholder-white"
            placeholder="Şehir girin..."
            style={{
              backdropFilter: "blur(5px)",
              border: "1px solid white",
            }}
          />
          <button onClick={submit} className="btn btn-warning fw-bold">
            Ara
          </button>
        </div>
        {array ? (
          <div className="card bg-dark bg-opacity-50 text-white mt-4 shadow-lg">
            <div className="card-body">
              <h4 className="card-title">{array.name}</h4>
              <h6 className="card-subtitle mb-2 text-info">Hava Durumu</h6>
              <p className="card-text">
                <strong>Gün:</strong> {new Date().toLocaleDateString("tr-TR")}
              </p>
              <p className="card-text">
                <strong>Açıklama:</strong> {array.weather[0].description}
              </p>

              <p className="card-text">
                <strong>Sıcaklık:</strong> {array.main.temp}°C
              </p>
              <p className="card-text">
                <strong>Nem:</strong> {array.main.humidity}%
              </p>
              <p className="card-text">
                <strong>Rüzgar Hızı:</strong> {array.wind.speed} km/s
              </p>
            </div>
          </div>
        ) : (
          <p className="text-white mt-4">Hava durumu bilgisi alınamadı.</p>
        )}
      </div>
    </div>
  );
}

export default App;
