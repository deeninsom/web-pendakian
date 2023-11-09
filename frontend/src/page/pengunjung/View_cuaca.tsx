/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import axios from "axios";

interface WeatherData {
    time: string[];
    temperature_2m_max: number[];
    weathercode: number[]
}

const View_cuaca = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        axios.get('https://api.open-meteo.com/v1/forecast?latitude=-7.472638&longitude=112.434084&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto')
            .then((response) => {
                setWeatherData(response.data.daily);
            })
            .catch((error) => {
                alert(`Error fetching weather data: ${error}`)
            });
    }, []);

    return (
        <Layout>
            <div className="weather" style={{ paddingTop: "90px", marginBottom: "10px"  }}>
                <div className="content-booking w-full d-flex justify-content-between align-items-center p-4" style={{ height: "auto", color: "white", backgroundColor: "#232D3F" }}>
                    <div className="content-text" style={{ marginLeft: "100px" }}>
                        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Ramalan Cuaca</div>
                    </div>
                </div>
                {weatherData ? (
                    <div className="weather-details p-4">
                        <label className="d-flex gap-2 align-items-center my-4" style={{ fontSize: "17px" }}><i className="fa fa-solid fa-cloud" style={{ color: "gray" }}></i> Ramalan cuaca beberapa hari kedepan ...</label>
                        <table className="table" border={1}>
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <th scope="col">Tanggal</th>
                                    <th scope="col">Temperatur</th>
                                </tr>
                            </thead>
                            <tbody>
                                {weatherData.time.map((time, index) => (
                                    <tr key={index} style={{ textAlign: "center" }}>
                                        <td>{time}</td>
                                        <td>{weatherData.temperature_2m_max[index]} °C</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="spinner-container" style={{ textAlign: "center", marginTop: "100px" }}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                
            </div>
            <footer className="fixed-bottom p-2" style={{ backgroundColor: "#232D3F", color: "white" }}>
                <div className="text-center fs-6">
                    © 2023 Penanggungan. Seluruh hak cipta dilindungi.
                </div>
            </footer>
        </Layout>
    );
};

export default View_cuaca;
