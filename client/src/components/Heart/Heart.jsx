import { useContext, useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import useAuthCheck from "../../hooks/useAuthCheck"
import UserDetailContext from "../../context/UserDetailContext"
import { checkFavourites, updateFavourites } from "../../utils/common"
import { toFav } from "../../utils/api"

const Heart = ({id}) => {

    const [heartColor, setHeartColor] = useState("white")
    const {validateLogin} = useAuthCheck()

    // const {
    //     userDetails: { favourites, token },
    //     setUserDetails,
    //   } = useContext(UserDetailContext);

    //   useEffect(()=> {
    //         setHeartColor(()=> checkFavourites(id, favourites))
    //   },[favourites])


      const user={
        email:"hvygu"
      }
const token = "vbhyjghb"

   

    const handleLike = () => {
        if(validateLogin())
        {
            mutate()
            setHeartColor((prev)=> prev === "#fa3e5f" ? "white": "#fa3e5f")
        }
    }

  return (
    <AiFillHeart size={24} color={heartColor} onClick={(e)=> {
        e.stopPropagation()
        handleLike()
    }}/>
  )
}

export default Heart