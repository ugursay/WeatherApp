// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("tr");
  const apiKey = "YourKey";
  const units = "metric";
  const [array, setArray] = useState(null);
  // const debounceRef = useRef(null);

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

  // useEffect(() => {
  //   if (city === "") return;

  //   // önceki zamanlayıcıyı temizle
  //   clearTimeout(debounceRef.current);

  //   // yeni zamanlayıcı başlat
  //   debounceRef.current = setTimeout(() => {
  //     submit(city);
  //   }, 300); // 500ms beklemeden sonra çalışır

  //   // Temizleme fonksiyonu
  //   return () => clearTimeout(debounceRef.current);
  // }, [city]);

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
        <h2 className="mb-4 text-white">
          {language === "tr" ? "Hava Durumu" : "Weather"}
        </h2>
        <div className="input-group mb-4">
          <input
            type="text"
            value={city}
            onChange={handleChange}
            className="form-control bg-transparent text-gray border-white placeholder-white"
            placeholder={language === "tr" ? "Şehir Giriniz..." : "Enter city"}
            style={{
              backdropFilter: "blur(5px)",
              border: "1px solid white",
              transition: "all 0.5s ease",
            }}
          />
          <button onClick={submit} className="btn btn-warning fw-bold">
            Ara
          </button>
          <select
            className="form-select w-auto"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
            style={{
              maxWidth: "80px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              border: "1px solid white",
              fontWeight: "bold",
              backdropFilter: "blur(6px)",
              opacity: 0.9,
              borderRadius: "8px",
              padding: "5px 10px",
              cursor: "pointer",
              transition: "all 0.5s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "rgba(117, 170, 206, 0.45)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "rgba(98, 174, 209, 0.2)";
            }}
          >
            <option value="tr">TR</option>
            <option value="en">EN</option>
          </select>
        </div>
        {array ? (
          <div className="card bg-dark bg-opacity-50 text-white mt-4 shadow-lg">
            <div className="card-body">
              <h4 className="card-title">{array.name}</h4>
              <h6 className="card-subtitle mb-2 text-info">
                {language === "tr" ? "Hava Durumu" : "Weather"}
              </h6>
              <p className="card-text">
                <strong>{language === "tr" ? "Tarih: " : "Date: "}</strong>
                {language === "tr"
                  ? new Date().toLocaleDateString("tr-TR")
                  : new Date().toLocaleDateString("en-EN")}
              </p>
              <p className="card-text">
                <strong>
                  {language === "tr" ? "Açıklama: " : "Description: "}
                </strong>
                {array.weather[0].description}
              </p>

              <p className="card-text">
                <strong>{language === "tr" ? "Sıcaklık: " : "Temp: "}</strong>
                {array.main.temp}°C
              </p>
              <p className="card-text">
                <strong>{language === "tr" ? "Nem: " : "Humidity: "}</strong>
                {array.main.humidity}%
              </p>
              <p className="card-text">
                <strong>
                  {language === "tr" ? "Rüzgar Hızı: " : "Wing Speed: "}
                </strong>{" "}
                {array.wind.speed} km/s
              </p>
            </div>
          </div>
        ) : language === "tr" ? (
          <p className="text-white mt-4">Hava durumu bilgisi alınamadı</p>
        ) : (
          <p className="text-white mt-4">No weather information available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
