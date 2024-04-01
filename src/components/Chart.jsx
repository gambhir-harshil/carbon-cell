import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Bar } from "react-chartjs-2";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ pagination }) => {
  const [data, setData] = useState([]);
  const { response, loading, error } = useAxios(
    "https://datausa.io/api/data?drilldowns=State&measures=Population"
  );

  //Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const statesPerPage = 8;
  const itemsPerPage = statesPerPage * 2;

  const [chartData, setChartData] = useState({
    labels: data.map((item) => item.State),
    datasets: [
      {
        label: "2021",
        data: data
          .filter((item) => item.Year === "2021")
          .map((item) => item.Year),
      },
    ],
  });

  useEffect(() => {
    if (response) {
      setData(response.data);
    }
  }, [response]);

  useEffect(() => {
    const uniqueStates = [...new Set(data.map((item) => item.State))];
    const sliceStart = currentPage * statesPerPage;
    const sliceEnd = sliceStart + statesPerPage;
    const currentPageStates = uniqueStates.slice(sliceStart, sliceEnd);

    const currentPageData = data.filter((item) =>
      currentPageStates.includes(item.State)
    );

    setChartData({
      labels: currentPageData.slice(0, 8).map((item) => item.State),
      datasets: [
        {
          label: "2021",
          data: currentPageData
            .filter((item) => item.Year === "2021")
            .map((item) => item.Population),
          backgroundColor: ["blue"],
          borderColor: "black",
          borderWidth: "2",
        },
        {
          label: "2020",
          data: currentPageData
            .filter((item) => item.Year === "2020")
            .map((item) => item.Population),
          backgroundColor: ["red"],
          borderColor: "black",
          borderWidth: "1",
        },
      ],
    });
  }, [data, currentPage]);

  const handlePrev = () => {
    if (currentPage !== 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    const totalPages = 9;
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Population",
          font: {
            size: 18,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "States",
          font: {
            size: 18,
          },
        },
      },
    },
  };

  return (
    <div className="lg:w-[1200px] lg:h-[420px] md:w-[600px] w-[400px]">
      <h1 className="text-lg font-semibold">Population Chart</h1>
      <Bar data={chartData} options={options} />
      {pagination && (
        <div className="flex justify-center gap-4 mt-4 ">
          <Button size={"icon"} className="rounded-full">
            <ChevronLeft
              onClick={handlePrev}
              className="cursor-pointer"
              size={24}
            />
          </Button>
          <Button size={"icon"} className="rounded-full">
            <ChevronRight
              onClick={handleNext}
              className="cursor-pointer"
              size={24}
            />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Chart;
