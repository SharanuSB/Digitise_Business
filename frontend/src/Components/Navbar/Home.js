import decode from "jwt-decode"
import HomePageShopOwner from '../shopOwner/HomePageShopOwner';
import HomeCustomer from "../Customers/HomeCustomer";
import HomePageSuperAdmin from "../SuperAdmin/HomePageSuperAdmin";

const HomePage = () => {
    const token = localStorage.getItem("token")

    let tokenData
    if (token) {
        tokenData = decode(token)
    }


    return (
        <div className="container">
            {
                tokenData?.role === "customer" && <HomeCustomer/>
            }
            {
                tokenData?.role === "superAdmin" && <HomePageSuperAdmin/>
            }
            {
                 tokenData?.role === "shopOwner" && <HomePageShopOwner/>
            }
        </div>
    );
};

export default HomePage;
