import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetShopDetails } from "../../Redux/Actions/shopsActions"
import ShopForm from "./ShopForm"
import ListProducts from "./ListProducts"

const Shop = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetShopDetails())
    }, [dispatch])

    const shop = useSelector((state) => {
        return state.shops.data
    })

    return (
        <div>
            {
                !shop?._id ?
                    <div className="container ">
                        <div className="row">
                            <div className="col-md-6 card shadow">
                                <h1> Create Your Shop First to get Started ......</h1>
                                <ShopForm />
                            </div>
                        </div>
                    </div> :
                    <div>
                        <ListProducts
                            shop = {shop}
                        />
                    </div>

            }
        </div>
    )
}

export default Shop