import Crypto from "../components/Crypto";

const Assets = () => {
  return (
    <div>
      <h1 className="px-4 mb-8 text-3xl font-semibold lg:px-16">
        Current Assets
      </h1>
      <Crypto />
    </div>
  );
};

export default Assets;
