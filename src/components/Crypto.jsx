import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Button } from "@/components/ui/button";

const Crypto = () => {
  const [data, setData] = useState([]);
  const { response, refetch } = useAxios(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  );

  useEffect(() => {
    if (response) {
      setData(Object.values(response.bpi));
    }
  }, [response]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div className="grid grid-cols-2 gap-4 px-4 lg:px-16 lg:flex lg:flex-row">
      {data.map((item) => (
        <div
          key={item.code}
          className="flex flex-col w-40 h-full gap-8 p-2 border rounded-md shadow-md lg:p-4 lg:w-52 bg-muted"
        >
          <div className="flex justify-between">
            <div className="lg:h-[60px] lg:w-[60px] h-[32px] w-[32px]">
              <img
                src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                alt="btc"
              />
            </div>
            <div className="flex flex-col items-end">
              <h1 className="text-xl font-bold lg:text-2xl text-muted-foreground">
                Bitcoin
              </h1>
              <span className="font-semibold text-muted-foreground">
                ({item.code})
              </span>
            </div>
          </div>
          <h1
            dangerouslySetInnerHTML={createMarkup(`${item.rate}${item.symbol}`)}
            className="text-xl font-bold"
          />
          <Button className="font-semibold">Trade</Button>
        </div>
      ))}
    </div>
  );
};

export default Crypto;
