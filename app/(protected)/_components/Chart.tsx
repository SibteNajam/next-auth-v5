import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface ChartData {
  labels: string[];
  values: number[];
  chartTitle: string;
}

const dummyOutput: ChartData = {
  labels: ["Product A", "Product B", "Product C", "Product D"],
  values: [120, 200, 150, 80],
  chartTitle: "Sales Data",
};

const ChartComponent: React.FC = () => {
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement>(null);
  const barChartInstance = useRef<Chart | null>(null);
  const doughnutChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Bar Chart Initialization
    if (barChartRef.current) {
      if (barChartInstance.current) barChartInstance.current.destroy();

      barChartInstance.current = new Chart(barChartRef.current, {
        type: "bar",
        data: {
          labels: dummyOutput.labels,
          datasets: [
            {
              label: "Sales Data",
              data: dummyOutput.values,
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Bar Chart - " + dummyOutput.chartTitle,
            },
          },
        },
      });
    }

    // Doughnut Chart Initialization
    if (doughnutChartRef.current) {
      if (doughnutChartInstance.current)
        doughnutChartInstance.current.destroy();

      doughnutChartInstance.current = new Chart(doughnutChartRef.current, {
        type: "doughnut",
        data: {
          labels: dummyOutput.labels,
          datasets: [
            {
              label: "Sales Data",
              data: dummyOutput.values,
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Doughnut Chart - " + dummyOutput.chartTitle,
            },
          },
        },
      });
    }

    // Cleanup on unmount
    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
      if (doughnutChartInstance.current)
        doughnutChartInstance.current.destroy();
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div className="accordion" id="accordionExample">
          {/* Accordion Item 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Accordion Item #1
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div style={{ width: "30%", height: "400px" }}>
                  <canvas
                    ref={barChartRef}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Accordion Item 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Accordion Item #2
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div style={{ width: "30%", height: "400px" }}>
                  <canvas
                    ref={doughnutChartRef}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Accordion Item 3 */}
        </div>
      </div>
    </>
  );
};

export default ChartComponent;
