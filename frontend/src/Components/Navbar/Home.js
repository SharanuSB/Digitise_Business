import decode from "jwt-decode"
import HomePageSuperAdmin from '../SuperAdmin/HomePageSuperAdmin';
import HomePageShopOwner from '../shopOwner/HomePageShopOwner';
import HomeCustomer from "../Customers/HomeCustomer";

const HomePage = () => {
    const token = localStorage.getItem("token")

    let tokenData
    if (token) {
        tokenData = decode(token)
    }


    return (
        <div className="container">
            {
                tokenData.role === "customer" && <HomeCustomer/>
            }
            {
                tokenData.role === "superAdmin" && <HomePageSuperAdmin/>
            }

            {
                 tokenData.role === "shopOwner" && <HomePageShopOwner/>
            }

        </div>
    );
};

export default HomePage;
