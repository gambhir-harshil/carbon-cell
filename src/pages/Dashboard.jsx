import Chart from "../components/Chart";
import Crypto from "../components/Crypto";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] gap-16 justify-around">
      <Chart />
      <Crypto />
    </div>
  );
}
