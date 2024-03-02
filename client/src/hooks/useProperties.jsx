import React from "react";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
 const isError = false
 const isLoading = false

  return {
    // data,
    isError,
    isLoading,
    // refetch,
  };
};

export default useProperties;
