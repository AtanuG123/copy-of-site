import { useDispatch } from "react-redux";
import { profile } from "../state/userprofile";
import { remove } from "../state/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  axios  from "axios";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import "../Pages_css/userprofile.css"
export default  function Userprofile() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.data);
    const Emailid =user.Email
    const [allorder,setallorder]=useState([]);
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_PORT}/user/`, { Emailid})
        .then(result => {
            const reversedData = [...result.data].reverse();
            setallorder(reversedData)            
        })
        .catch(err => console.log(err));
        
    },[Emailid])

    const logoutnotify = () => {
        toast.success("logout succesfull", {
            autoClose: 1500,
        });
    }
    const removeuser = () => {
        dispatch(profile("invalid"));
        dispatch(remove());
        navigate("/");
        logoutnotify();
    }
    
    return (
        <div  style={{marginTop:"80px"}}>
           
           <div  id="orderhead">
                <div>
                    <h4>Past Order Details</h4>
                    <br></br>
                </div>
                <div id='tablebox'>
                    <table >
                        <tr id='detailhead'>
                            <td>ORDER</td>
                            <td>SHIP TO </td>
                            <td >ORDER ID</td>
                            <td>TOTAL AMOUNT</td>
                            <td>DATE & TIME</td>
                        </tr>
                        

                        
                         {/* <tr id='orderitems'> */}
                            {
                                allorder.map((items)=>{
                                    return(
                                        <tr id='orderitems'>
                                            <td></td>
                                        <td>{items.Name}</td>
                                        <td>{items.Orderid}</td>
                                        <td>{items.Amount}</td>
                                        <td>{items.Datetime}</td>
                                        </tr>
                                    )
                                })
                            } 
                            {/* <td>{
                               order.map(item => {
                                    return (
                                        <span>
                                            <img src={item.img}></img>
                                        </span>
                                    )
                                })
                            }</td>

                            <td>{user.Name} </td>

                            

                            <td >{order_id.orderid.slice(9,20)}</td>
                            <td id="sub">{Math.round(subtotal + ((subtotal * 5) / 100))}</td> */}
                        {/* </tr> */}
                    </table>
                    {/* <button onClick={gotoprofile}>Profile</button> */}
                </div>
            </div> 
            <button className="btn btn-primary" onClick={removeuser}>
                Logout
               
            </button>
        </div>
        
    );
}