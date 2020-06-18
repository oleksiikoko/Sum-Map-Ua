import anglesJson from "../data/angles.json";
import regionsJson from "../data/regions.json";

const startTemperature = [5, 5, 7, 10, 12, 15, 15, 15, 13, 10, 5, 4];

export default {
  helioCalculator: (
    square,
    efficiency,
    waterTemperature,
    lat,
    s_values,
    d_values
  ) => {
    const qS = 0.74;
    const qD = 0.64;

    let kLat;
    kLat = lat % 10;
    kLat =
      kLat < 5
        ? (parseInt(lat / 10) + 5 / 10) * 10
        : Math.round(parseInt(lat / 10) + kLat / 10) * 10;

    const latValues = anglesJson.filter((item) => item.lat === kLat);
    console.log(lat, kLat);
    let angles = new Array(12).fill(null).map((item, index) => {
      const curMonthValues = [
        latValues[0].ps_values[index],
        latValues[1].ps_values[index],
        latValues[2].ps_values[index],
        latValues[3].ps_values[index],
      ];
      const i = curMonthValues.indexOf(Math.max(...curMonthValues));

      return {
        angle: latValues[i].angle,
        ps_value: latValues[i].ps_values[index],
        pd_value: Math.pow(Math.cos((latValues[i].angle * Math.PI) / 360), 2),
      };
    });

    return angles.map((item, index) => {
      return (
        (30 *
          (efficiency / 100.0) *
          square *
          0.96 *
          (s_values[index] * qS * item.ps_value +
            d_values[index] * qD * item.pd_value)) /
        (1.16 * (waterTemperature - startTemperature[index]))
      );
    });
  },
  panelCalculator: (square, efficiency, lat, s_values, d_values) => {
    let kLat;
    kLat = lat % 10;
    kLat =
      kLat < 5
        ? (parseInt(lat / 10) + 5 / 10) * 10
        : Math.round(parseInt(lat / 10) + kLat / 10) * 10;

    const latValues = anglesJson.filter((item) => item.lat === kLat);
    console.log(lat, kLat);
    let angles = new Array(12).fill(null).map((item, index) => {
      const curMonthValues = [
        latValues[0].ps_values[index],
        latValues[1].ps_values[index],
        latValues[2].ps_values[index],
        latValues[3].ps_values[index],
      ];
      const i = curMonthValues.indexOf(Math.max(...curMonthValues));

      return {
        angle: latValues[i].angle,
        ps_value: latValues[i].ps_values[index],
        pd_value: Math.pow(Math.cos((latValues[i].angle * Math.PI) / 360), 2),
      };
    });

    return angles.map((item, index) => {
      return (
        (efficiency / 100.0) *
        square *
        0.96 *
        (s_values[index] * item.ps_value + d_values[index] * item.pd_value)
      );
    });
  },
};
