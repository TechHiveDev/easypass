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
import { Loading, Error, useTranslate, useLocaleState } from "react-admin";
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
    text: "Scans",
  },
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      ticks: {
        // remove fractions from graph
        callback: function (value, index, ticks) {
          const isInteger = Number.isInteger(value);
          return isInteger ? value : "";
        },
      },
    },
  },
};

const Scan = () => {
  const translate = useTranslate();
  const [locale] = useLocaleState();
  const [compound, setCompound] = useLocalStorage("reportCompoundScan", "");
  const {
    data: compounds,
    compoundsLoading,
    compoundsError,
  } = useQuery(["compound", "getAll"], () => customFetch("/compound", {}), {
    staleTime: Infinity,
  });
  const [{ from, to, interval }, setFromToInterval] = useLocalStorage(
    "fromToIntervalScan",
    {
      from: "2022-10-01",
      to: "2022-10-30",
      interval: 7,
    }
  );
  const [filterParams, setFilterParams] = useState({});
  const chartRef = useRef();

  const [chart, setChart] = useLocalStorage("reportChartScan", 0);
  const { data, isLoading, error } = useQuery(
    ["scan-report", from, to, interval, compound],
    () =>
      customFetch(
        `/scan-report/?start=${new Date(from).getTime()}&end=${new Date(
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
                  if (interval === 30) {
                    currentDate.setMonth(currentDate.getMonth() + 1);
                  } else {
                    currentDate.setDate(currentDate.getDate() + interval);
                  }
                  return `${d?.substring(0, 10)} / ${
                    nextDay
                      ? nextDay.substring(0, 10)
                      : currentDate.toISOString().substring(0, 10)
                  }`;
                }),
          datasets: [
            {
              label: translate("fail"),
              data: data?.[0]?.report?.fail,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: translate("success"),
              data: data?.[0]?.report?.success,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        }
      : {
          labels: [translate("fail"), translate("success")],
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
    if (!elementAtEvent?.[0]) return;
    const { datasetIndex, index: dataIndex } = elementAtEvent[0];
    let success = false;
    if (chart === 1) {
      if (dataIndex === 1) {
        success = true;
      }
      if (dataIndex === 0) {
        success = false;
      }
    }
    if (chart === 0) {
      if (datasetIndex === 1) {
        success = true;
      }
      if (datasetIndex === 0) {
        success = false;
      }
    }
    const lastDate = new Date(data?.[0]?.report?.dates[dataIndex]);
    if (interval === 30) {
      lastDate.setMonth(lastDate.getMonth() + 1);
    } else {
      lastDate.setDate(lastDate.getDate() + interval);
    }
    setFilterParams({
      createdAt: {
        gte:
          chart === 0
            ? data?.[0]?.report?.dates[dataIndex].substring(0, 10) +
              "T10:00:00.000Z"
            : from + "T10:00:00.000Z",
        lte:
          chart === 0
            ? data?.[0]?.report?.dates[dataIndex + 1]
              ? `${data?.[0]?.report?.dates[dataIndex + 1].substring(
                  0,
                  10
                )}T10:00:00.000Z`
              : lastDate.toISOString().substring(0, 10) + "T10:00:00.000Z"
            : to + "T10:00:00.000Z",
      },
      success,
      compoundId: compound,
    });
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
          {translate("from")}
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
          {translate("to")}
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
        {chart === 0 ? (
          <FormControl fullWidth>
            <InputLabel id="interval">{translate("interval")}</InputLabel>
            <Select
              labelId="interval"
              id="interval-select"
              label="Interval"
              value={interval}
              onChange={(e) => {
                setFromToInterval((p) => ({ ...p, interval: e.target.value }));
              }}
            >
              <MenuItem value={1}>{translate("day")}</MenuItem>
              <MenuItem value={7}>{translate("week")}</MenuItem>
              <MenuItem value={30}>{translate("month")}</MenuItem>
            </Select>
          </FormControl>
        ) : null}
        <FormControl fullWidth>
          <InputLabel id="compound">{translate("compound")}</InputLabel>
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
          <InputLabel id="shape">{translate("chart")}</InputLabel>
          <Select
            labelId="shape"
            id="shape-select"
            label="Chart"
            value={chart}
            onChange={(e) => setChart(e.target.value)}
          >
            <MenuItem value={0}>{translate("bar")}</MenuItem>
            <MenuItem value={1}>{translate("pie")}</MenuItem>
          </Select>
        </FormControl>
      </div>
      {!compound ? (
        <h2 style={{ textAlign: "center" }}>
          {translate("selectA")} {translate("compound")}
        </h2>
      ) : (
        <>
          <h2 style={{ textAlign: "center", marginLeft: "-5vw" }}>
            {translate("menu.Scan")}
          </h2>
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
            pathname: "/scan",
            search: `filter=${JSON.stringify(filterParams)}`,
          }}
          style={{
            textTransform: "none",
          }}
        >
          {locale === "ar"
            ? `كل الكشوف ال ${
                filterParams?.success ? "ناجحة" : "غير ناجحة"
              }  من${filterParams.createdAt.gte.substring(0, 10)}  الي` +
              `${filterParams.createdAt.lte.substring(0, 10)}`
            : ` ${filterParams?.success ? "successful" : "failed"} scans from
          ${filterParams.createdAt.gte.substring(0, 10)} to
          ${filterParams.createdAt.lte.substring(0, 10)}`}
        </Button>
      ) : null}
    </div>
  );
};

export default Scan;
