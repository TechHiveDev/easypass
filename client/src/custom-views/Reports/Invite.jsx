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
import { Bar, Pie, getElementAtEvent } from "react-chartjs-2";
import { useQuery } from "react-query";
import { Loading, Error } from "react-admin";
import customFetch from "../../utils/customFetch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const options = {
  responsive: true,
  title: {
    display: true,
    text: "Invites",
  },
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      stacked: true,
      ticks: {
        // remove fractions from graph
        callback: function (value, index, ticks) {
          const isInteger = Number.isInteger(value);
          return isInteger ? value : "";
        },
      },
    },
    x: {
      stacked: true,
    },
  },
};

const Invite = () => {
  const [compound, setCompound] = useLocalStorage("reportCompoundInvite", "");
  const {
    data: compounds,
    compoundsLoading,
    compoundsError,
  } = useQuery(["compound", "getAll"], () => customFetch("/compound", {}), {
    staleTime: Infinity,
  });
  const [{ from, to, interval }, setFromToInterval] = useLocalStorage(
    "fromToIntervalInvite",
    {
      from: "2022-10-01",
      to: "2022-10-30",
      interval: 7,
    }
  );
  const [filterParams, setFilterParams] = useState({});
  const chartRef = useRef();

  const [chart, setChart] = useLocalStorage("reportChartInvite", 0);
  const { data, isLoading, error } = useQuery(
    ["invitation-report", from, to, interval, compound],
    () =>
      customFetch(
        `/invitation-report/?start=${new Date(from).getTime()}&end=${new Date(
          to
        ).getTime()}&interval=${interval}${
          compound ? "&compoundId=" + compound : ""
        }`,
        {}
      ),
    {
      enabled: !!compound,
    }
  );
  const graphData =
    chart === 0
      ? {
          labels:
            interval === 1
              ? data?.[0]?.report?.dates?.map((d) => d?.substring(0, 10))
              : data?.[0]?.report?.dates?.map((d, i) => {
                  const currentDate = new Date(d);
                  const nextDay = data?.[0]?.report?.dates?.[i + 1];
                  currentDate.setDate(currentDate.getDate() + interval);
                  return `${d?.substring(0, 10)} / ${
                    nextDay
                      ? nextDay.substring(0, 10)
                      : currentDate.toISOString().substring(0, 10)
                  }`;
                }),
          datasets: [
            {
              label: "Visitor",
              data: data?.[0]?.report?.visitor,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Delivery",
              data: data?.[0]?.report?.delivery,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        }
      : {
          labels: ["Visitor", "Delivery"],
          datasets: [
            {
              data: [
                data?.[0]?.report?.visitor.reduce(
                  (partialSum, a) => partialSum + a,
                  0
                ),
                data?.[0]?.report?.delivery.reduce(
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
    if (!elementAtEvent?.[0]) return;
    const { datasetIndex, index: dataIndex } = elementAtEvent[0];
    let type = "";
    if (chart === 1) {
      if (dataIndex === 0) {
        type = "Visitor";
      }
      if (dataIndex === 1) {
        type = "Delivery";
      }
    }
    if (chart === 0) {
      if (datasetIndex === 0) {
        type = "Visitor";
      }
      if (datasetIndex === 1) {
        type = "Delivery";
      }
      if (datasetIndex === 2) {
        type = "all";
      }
    }
    setFilterParams(
      type !== "all"
        ? {
            createdAt: {
              gte:
                chart === 0
                  ? data?.[0]?.report?.dates[dataIndex].substring(0, 10) +
                    "T10:00:00.000Z"
                  : from + "T10:00:00.000Z",
              lte:
                chart === 0
                  ? data?.[0]?.report?.dates[dataIndex + 1].substring(0, 10) +
                    "T10:00:00.000Z"
                  : to + "T10:00:00.000Z",
            },
            type,
            compoundId: compound,
          }
        : {
            createdAt: {
              gte:
                chart === 0
                  ? data?.[0]?.report?.dates[dataIndex].substring(0, 10) +
                    "T10:00:00.000Z"
                  : from + "T10:00:00.000Z",
              lte:
                chart === 0
                  ? data?.[0]?.report?.dates[dataIndex + 1].substring(0, 10) +
                    "T10:00:00.000Z"
                  : to + "T10:00:00.000Z",
            },
            compoundId: compound,
          }
    );
  };
  if (isLoading || compoundsLoading) return <Loading />;
  if (error || compoundsError) return <Error error={error || compoundsError} />;
  if (!compounds || (!compounds && !compound)) return null;
  return (
    <div>
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
            <MenuItem value={1}>Day</MenuItem>
            <MenuItem value={7}>Week</MenuItem>
            <MenuItem value={30}>Month</MenuItem>
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
        <h2 style={{ textAlign: "center" }}>Select a compound</h2>
      ) : (
        <>
          <h2 style={{ textAlign: "center", marginLeft: "-5vw" }}>Invites</h2>
          {chart === 0 ? (
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
        </>
      )}
      {filterParams?.createdAt ? (
        <Button
          color="primary"
          component={Link}
          to={{
            pathname: "/invitation",
            search: `filter=${JSON.stringify(filterParams)}`,
          }}
          style={{
            textTransform: "none",
          }}
        >
          All {filterParams?.type === "all" ? "" : filterParams?.type} Invites
          from&nbsp;
          {filterParams.createdAt.gte.substring(0, 10)} to&nbsp;
          {filterParams.createdAt.lte.substring(0, 10)}
        </Button>
      ) : null}
    </div>
  );
};

export default Invite;
