import { useEffect, useState } from "react";

const useHeaderColor = () => {
const [headerColor, setHeaderColor] = useState(false)
  //to handle shadow of header
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 8) {
        setHeaderColor("#FFFFFF")
      } else {
        setHeaderColor("");
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return headerColor
};

export default useHeaderColor;
