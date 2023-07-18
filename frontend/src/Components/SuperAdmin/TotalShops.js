import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startDeleteShop, startGetAllShops, startVerifyShop } from "../../Redux/Actions/shopsActions"
import Swal from "sweetalert2"

const TotalShops = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetAllShops())
    }, [dispatch])

    const shops = useSelector((state) => {
        return state.shops.allShops
    })

    const pendingVerifyShops = shops.filter(shop => shop.isVerified === false)

    const verifiedShops = shops.filter(shop => shop.isVerified === true)

    const handleVerifyShop = (id) => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Verify',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startVerifyShop(id))
                Swal.fire('Shop is verified!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

    }

    const handleDeleteShop = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteShop(id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <div className="container">
            <div className="row gap-5">
                <h1 className="col-md-4 text text-uppercase badge bg-secondary text-wrap fs-4">Shops Pending to Verified - {pendingVerifyShops.length}</h1>
                <span className="col-md-4"></span>
                {
                    pendingVerifyShops &&
                    pendingVerifyShops.map(shop => {
                        return <div key={shop._id} className="col-md-4 card shadow p-2 fs-5">
                            <blockquote ><span className="fw-bold text-uppercase">Name : </span>{shop.name}</blockquote>
                            <blockquote ><span className="fw-bold text-uppercase">Address : </span>{shop.address}</blockquote>
                            <blockquote ><span className="fw-bold text-uppercase">Contact Number : </span> {shop.contactNumber}</blockquote>
                            <blockquote ><span className="fw-bold text-uppercase">Website : </span>{shop.website}</blockquote>

                            <button className="btn btn-success my-2 p-2"
                                onClick={() => { handleVerifyShop(shop._id) }}>
                                <span className="fw-bold">Verify</span></button>

                            <button className="btn btn-danger" onClick={() => { handleDeleteShop(shop._id) }}>
                                <span className="fw-bold">Decline</span>
                            </button>
                        </div>
                    })
                }
            </div>
            <div className="my-5"></div>
            <div className="row gap-5">
                <h1 className="col-md-4 text text-uppercase badge bg-secondary text-wrap fs-4">Verified Shops - {verifiedShops.length}</h1>
                <span className="col-md-4"></span>
                {
                    verifiedShops &&
                    verifiedShops.map(shop => {
                        return <div key={shop._id} className="col-md-4 card shadow p-2 fs-5">
                            <blockquote ><span className="fw-bold text-uppercase">Name : </span>{shop.name}</blockquote>
                            <blockquote ><span className="fw-bold text-uppercase">Address : </span>{shop.address}</blockquote>
                            <blockquote ><span className="fw-bold text-uppercase">Contact Number : </span>{shop.contactNumber}</blockquote>
                            <blockquote ><span className="fw-bold text-uppercase">Website : </span>{shop.website}</blockquote>

                            <button className="btn btn-danger" onClick={() => { handleDeleteShop(shop._id) }}>
                                <span className="fw-bold">Decline</span>
                            </button>
                        </div>
                    })
                }
            </div>
        </div>
    )
}


export default TotalShops