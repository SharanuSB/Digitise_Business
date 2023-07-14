import { startAddProductImage } from "../../Redux/Actions/productsAction";
import { useDispatch } from "react-redux"
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'


const DisplayImage = (props) => {

    const dispatch = useDispatch()
    const [photo, setPhoto] = useState("")

    const [open, setOpen] = useState(false)

    const { images, id } = props

    const handleAddImage = async (e, id) => {
        setPhoto(e.target.files[0]);
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        dispatch(startAddProductImage(id, formData))
    }

    return (
        <>
            {
                images.length === 0 ?
                    <>
                        <p>Add Images fror Your Product.</p>
                        <input type="file"
                            accept=".png"
                            className="form-control"
                            onChange={(e) => handleAddImage(e, id)}
                        />
                    </> :
                    <>
                        {
                            images.length < 5 ?
                                <>
                                    <div>
                                        <input type="file"
                                            accept=".png"
                                            className="form-control"
                                            onChange={(e) => handleAddImage(e, id)}
                                        />
                                        <span>({5 - images.length})left</span>
                                        <>
                                           <Carousel showThumbs={false}>
                                            {
                                                images.map(ele=>{
                                                    return <img src = {`http://127.0.0.1:3333/${ele}`} width="400" height="300" alt="HTML tag" style={{maxWidth:"400px", maxHeight:"300px"}}/>
                                                })
                                            }
                                           </Carousel>
                                        </>
                                    </div>

                                </> :
                                <>
                                    <Carousel showThumbs={false}>
                                            {
                                                images.map(ele=>{
                                                    return <img src = {`http://127.0.0.1:3333/${ele}`} width="400" height="300" alt="HTML tag" style={{maxWidth:"400px", maxHeight:"300px"}}/>
                                                })
                                            }
                                           </Carousel>
                                </>
                        }
                    </>
            }
        </>
    )
}

export default DisplayImage