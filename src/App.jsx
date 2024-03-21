import Cards from "./components/Cards";
import Default from "./components/Default";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import SkeletonCard from "./components/SkeletonCard";
import { Grid } from "@mui/material";
import { ErrorPage } from "./components/Error";
import { useEffect } from "react";
import ModalWindow from "./components/ModalWindow";

function App() {
  const [crew, setCrew] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const getSpaceXData = () => {
    setLoading(true);
    setError(false);
    axios
      .get("https://api.spacexdata.com/v4/crew")
      .then((res) => {
        setCrew(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    console.log("render");
    getSpaceXData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Default getSpaceXData={getSpaceXData} />} />

      <Route
        path="/crew"
        element={
          isLoading ? (
            <Grid container spacing={4}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <Grid item xs={4} key={index}>
                  <SkeletonCard />
                </Grid>
              ))}
            </Grid>
          ) : isError ? (
            <ErrorPage />
          ) : (
            <Cards crew={crew} />
          )
        }
      >
        <Route path="/crew/:launchID" element={<ModalWindow />} />
      </Route>
    </Routes>
  );
}

export default App;
