import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { getAllBookings, getAllFav } from "../utils/api";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  
  const user = {
    email:"jjjhj"
  }
  // const queryRef = useRef();


  // queryRef.current = refetch;

  // useEffect(() => {
  //   queryRef.current && queryRef.current();
  // }, [userDetails?.token]);

  // return { data, isError, isLoading, refetch };
};

export default useBookings;
