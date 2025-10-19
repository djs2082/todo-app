import React from "react";
import { Loader as RainLoader, LoaderProps as RainLoaderProps} from "@karya_app1/rain-js";
import useLoaderStore from "./store";

const Loader: React.FC<RainLoaderProps> = (props) => {
    const { count } = useLoaderStore();
    console.log("Loader count:", count);
    if (count <= 0) return null;
    return (
      <RainLoader 
      label="Loading..."
      onBackdropClick={() => {}}
      spinnerType="ring"
      fullscreen
      variant="spinner" {...props} />
    );
};
export default Loader;
