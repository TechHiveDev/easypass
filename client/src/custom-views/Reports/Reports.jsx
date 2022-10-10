import React, { useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  Bar,
  Pie,
  getDatasetAtEvent,
  getElementAtEvent,
} from "react-chartjs-2";
import { useQuery } from "react-query";
import { Loading, Error } from "react-admin";
import customFetch from "../../utils/customFetch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const Reports = () => {
  const {
    data: compounds,
    compoundsLoading,
    compoundsError,
  } = useQuery(["compound", "getAll"], () => customFetch("/compound", {}), {
    staleTime: Infinity,
  });
  const [{ from, to, interval }, setFromToInterval] = useState({
    from: "2022-10-01",
    to: "2022-10-30",
    interval: 7,
  });
  const chartRef = useRef();
  const [compound, setCompound] = useState(compounds?.[0]?.id || "");
  const [chart, setChart] = useState(0);
  const { data, isLoading, error } = useQuery(
    ["report", from, to, interval, compound],
    () =>
      customFetch(
        `/scan-report/?start=${new Date(from).getTime()}&end=${new Date(
          to
        ).getTime()}&interval=${interval}${
          compound ? "&compoundId=" + compound : ""
        }`,
        {}
      )
  );

  if (isLoading || compoundsLoading) return <Loading />;
  if (error || compoundsError) return <Error error={error || compoundsError} />;
  if (!data || !compounds) return null;
  const graphData =
    chart === 0
      ? {
          labels: data?.[0]?.report?.dates.map((d) => d.substring(0, 10)),
          datasets: [
            {
              label: "Fail",
              data: data?.[0]?.report?.fail,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Success",
              data: data?.[0]?.report?.success,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        }
      : {
          labels: ["fail", "success"],
          datasets: [
            {
              data: [
                data?.[0]?.report?.fail.reduce(
                  (partialSum, a) => partialSum + a,
                  0
                ),
                data?.[0]?.report?.success.reduce(
                  (partialSum, a) => partialSum + a,
                  0
                ),
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(53, 162, 235, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(53, 162, 235, 0.5)",
              ],
            },
          ],
        };
  const onClick = (event) => {
    const elementAtEvent = getElementAtEvent(chartRef.current, event);
    if (chart === 1) {
      if (elementAtEvent?.[0]?.index === 1) {
        console.log("suc");
      }
      if (elementAtEvent?.[0]?.index === 0) {
        console.log("fail");
      }
    }
    if (chart === 0) {
      if (elementAtEvent?.[0]?.datasetIndex === 1) {
        console.log("suc");
      }
      if (elementAtEvent?.[0]?.datasetIndex === 0) {
        console.log("fail");
      }
    }
  };
  return (
    <div>
      <h1>Reports</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <label>
          From{" "}
          <input
            id="from-select"
            type={"date"}
            value={from}
            onChange={(e) =>
              setFromToInterval((p) => ({ ...p, from: e.target.value }))
            }
            style={{
              minWidth: "120px",
              minHeight: "35px",
            }}
          />
        </label>
        <label>
          To
          <input
            id="to-select"
            type={"date"}
            value={to}
            onChange={(e) =>
              setFromToInterval((p) => ({ ...p, to: e.target.value }))
            }
            style={{
              minWidth: "120px",
              minHeight: "35px",
            }}
          />
        </label>
        <FormControl fullWidth>
          <InputLabel id="interval">Interval</InputLabel>
          <Select
            labelId="interval"
            id="interval-select"
            label="Interval"
            value={interval}
            onChange={(e) => {
              console.log(e.target);
              setFromToInterval((p) => ({ ...p, interval: e.target.value }));
            }}
          >
            <MenuItem value={7}>Week</MenuItem>
            <MenuItem value={4}>Month</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="compound">Compound</InputLabel>
          <Select
            labelId="compound"
            id="compound-select"
            label="compound"
            value={compound}
            onChange={(e) => setCompound(e.target.value)}
          >
            {compounds?.map((c) => {
              return (
                <MenuItem key={c?.id} value={c?.id}>
                  {c?.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="shape">Chart</InputLabel>
          <Select
            labelId="shape"
            id="shape-select"
            label="Chart"
            value={chart}
            onChange={(e) => setChart(e.target.value)}
          >
            <MenuItem value={0}>Bar</MenuItem>
            <MenuItem value={1}>Pie</MenuItem>
          </Select>
        </FormControl>
      </div>
      {!compound ? (
        <h2>Select a compound</h2>
      ) : chart === 0 ? (
        <Bar
          options={options}
          data={graphData}
          ref={chartRef}
          onClick={onClick}
          style={{
            maxWidth: "80vw",
            maxHeight: "70vh",
          }}
        />
      ) : (
        <Pie
          data={graphData}
          ref={chartRef}
          onClick={onClick}
          style={{
            maxWidth: "80vw",
            maxHeight: "70vh",
          }}
        />
      )}
    </div>
  );
};

export default Reports;
