import React, { useState, useEffect } from "react";

import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import regionsJson from "../../data/regions.json";

import "./MarkerInfo.scss";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import panelsJson from "../../data/panels.json";
import stationJson from "../../data/station.json";
import helioCalculator from "../../utils/helioCalculator";

import { markerApi } from "../../utils/api";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MarkerInfo = ({ marker }) => {
  console.log(marker);
  const classes = useStyles();
  const [systemValue, setSystemValue] = useState(-1);
  const [typeValue, setTypeValue] = useState(-1);
  const [regionName, setRegionName] = useState("");
  const [square, setSquare] = useState(0);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (marker) {
      const region = regionsJson.find((item) => {
        return item.iso === marker.region_iso;
      });
      if (region.iso === "UA-43") {
        setRegionName(region.region_name);
      } else {
        setRegionName(region.region_name + " область");
      }

      if (marker.marker) {
        setSystemValue(marker.marker.system);
        setTypeValue(marker.marker.systemType);
        setSquare(marker.marker.square);

        setChartData(
          marker.marker.calculations.map((item, index) => {
            return {
              kWh: item.kWh,
              month: index,
            };
          })
        );
      } else {
        setSystemValue(-1);
        setTypeValue(-1);
        setSquare(0);
        setChartData(null);
      }
    }

    console.log(chartData);
    // markerApi.getAll().then((res) => {
    //   console.log("mmmmmmmmmm", res);
    // });
  }, [marker]);
  function onChangeSystem(value) {
    console.log(value.target);
    setSystemValue(value.target.value);
    setTypeValue(-1);
    console.log("lfadksj");
  }

  function onChangeType(value) {
    setTypeValue(value.target.value);
    console.log("lfadksj");
  }

  const onSquareChange = (event) => {
    setSquare(event.target.value);
  };

  const calculateData = () => {
    if (systemValue !== -1 && typeValue !== -1 && square !== 0) {
      switch (systemValue) {
        case 0: {
          const curRegion = regionsJson.find(
            (item) => item.iso === marker.region_iso
          );
          setChartData(
            helioCalculator
              .panelCalculator(
                square,
                panelsJson[typeValue].efficiency,
                marker.coordinates.lat.toFixed(2),
                curRegion.s_values,
                curRegion.d_values
              )
              .map((item, index) => {
                return {
                  kWh: Math.round(item),
                  month: index,
                };
              })
          );
          break;
        }
        case 1: {
          const curRegion = regionsJson.find(
            (item) => item.iso === marker.region_iso
          );
          setChartData(
            helioCalculator
              .helioCalculator(
                square,
                stationJson[typeValue].efficiency,
                stationJson[typeValue].temperature,
                marker.coordinates.lat.toFixed(2),
                curRegion.s_values,
                curRegion.d_values
              )
              .map((item, index) => {
                return { kWh: Math.round(item), month: index };
              })
          );
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  const saveMarker = () => {
    const markerData = {
      position: {
        lat: marker.coordinates.lat.toFixed(3),
        lng: marker.coordinates.lng.toFixed(3),
      },
      creator: window.localStorage["account_id"],
      system: systemValue,
      systemType: typeValue,
      square: square,
      calculations: chartData.map((item) => {
        return { kWh: item.kWh };
      }),
      region_iso: marker.region_iso,
    };

    console.log(markerData.calculations);

    markerApi.createMarker({ marker: markerData }).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      {marker && (
        <div className="marker-info">
          <div className="marker-info__locality">
            <h2>Місцезнаходження:</h2>
            <p>
              {marker.coordinates.lat.toFixed(3)}{" "}
              {marker.coordinates.lng.toFixed(3)}
            </p>
            <h3>{regionName}</h3>
            <hr />
          </div>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label-system">
              Система
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label-system"
              id="demo-simple-select-outlined"
              value={systemValue}
              onChange={onChangeSystem}
              label="Система"
            >
              <MenuItem value={0}>Сонячна панель</MenuItem>
              <MenuItem value={1}>Геліосистема</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label-type">
              Тип
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label-type"
              id="demo-simple-select-outlined"
              value={typeValue}
              onChange={onChangeType}
              label="Тип"
            >
              {systemValue === 0 &&
                panelsJson.map((item, index) => {
                  return <MenuItem value={index}>{item.name}</MenuItem>;
                })}
              {systemValue === 1 &&
                stationJson.map((item, index) => {
                  return <MenuItem value={index}>{item.name}</MenuItem>;
                })}
            </Select>
          </FormControl>
          <TextField
            onChange={onSquareChange}
            value={square}
            id="outlined-basic"
            label="Площа"
            variant="outlined"
          />
          {systemValue === 0 && typeValue !== -1 && (
            <p>ККД: {panelsJson[typeValue].efficiency}% </p>
          )}
          {systemValue === 1 && typeValue !== -1 && (
            <>
              <p>ККД: {stationJson[typeValue].efficiency}%</p>
              <p>Вода: {stationJson[typeValue].temperature}℃</p>
            </>
          )}
          <Button onClick={calculateData}>Розрахувати</Button>
          {chartData && (
            <Button color="primary" onClick={saveMarker}>
              Зберегти
            </Button>
          )}
          <div className="marker-info__chart">
            {chartData && (
              <>
                <BarChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="kWh" fill="#8884d8" />
                </BarChart>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MarkerInfo;
