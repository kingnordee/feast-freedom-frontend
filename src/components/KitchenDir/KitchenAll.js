import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import KitchenRegistration from "./KitchenRegistration";
import WorkingDaysForm from "../WorkingDays/WorkingDaysForm";
import PostMenuItemsForm from "../MenuItems/PostMenuItemsForm";
import {KITCHEN_FORM, MENU_ITEM_FORM, WORKING_DAYS_FORM} from "../../reducers/RootReducer";

const KitchenAll = () => {
    const [ KitchenAllState, setState ] = useState({

    })

    const select = useSelector(cur => cur.AllReducers.current )
    const select2 = useSelector(cur => cur.AllReducers )
    // useEffect(() => {
    //     console.log(select)
    //     console.log(select2)
    //
    // }, [])

    return(
        <div>
            {select === KITCHEN_FORM && <KitchenRegistration/>}
            {select === WORKING_DAYS_FORM && <WorkingDaysForm/>}
            {select === MENU_ITEM_FORM && <PostMenuItemsForm/>}
        </div>


    )

}

export default KitchenAll
