import { useAppDispatch, useAppSelector } from "app/hook";
import Footer from "components/footer";
import Header from "components/header";
import ProductList from "components/project-list";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { getAllProduct } from "redux/product/productThunk";
import { Product } from "redux/product/type";
import { loadingOveride } from "utils/loading";
import 'react-chat-widget/lib/styles.css';
import io from "socket.io-client";
import { Widget, addResponseMessage } from 'react-chat-widget';
import { authState } from "redux/auth/authSlice";
const socket = io("http://localhost:3001");

const HomePage = () => {

    const [message, setMessage] = useState("")
    const selector = useAppSelector(authState);
    const user = selector.user;
    console.log("user",user)
    var isadmin: boolean = ( user.role==="admin"); 
    const [from, setFrom] = useState("")
    console.log("isadmin",isadmin)
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [productList, setProductList] = useState<Product[]>([]);
    const getProductList = async () => {
        const response = await dispatch(getAllProduct());
        setIsLoading(false);
        setProductList(response.payload.products);
    }

    useEffect(() => {
        getProductList();
    }, [])

    function sendMessageToUser(recieverId: string, msg: string) {
        const data = {
          fullname: "Admin",
          to: from,
          message: msg
        }
        console.log("Data: ", data)

        socket.emit("chatMessage", data);
    }

    socket.emit("register", user.user_id);

    // socket.on("isAdmin", (admin: boolean) => {
    //   isadmin = admin;
    // })
  
    socket.on("chatMessage", ({from,fullname, message}) => {
        setFrom(from);
        console.log("fullname",fullname)
        console.log("from",from)
        console.log("message",message)
        setMessage(message);
    })

      function sendMessageToAdmin(msg: string) {
        const data = {
          fullname: "fullname",
          from:user.user_id,
          to: "admin",
          message: msg
        }
        console.log("data",data)
        socket.emit("chatMessage", data);
      }
    const handleNewUserMessage = (newMessage: string) => {
        if(newMessage){
            if(isadmin) {
              sendMessageToUser("recieverId", newMessage);
            }
            else {
              sendMessageToAdmin(newMessage);
            }
          }
      };

      useEffect(()=>{
     if(message.length){
        addResponseMessage(message);
     }
      },[message])
    return (
        <div>
            <Header />
            <BeatLoader
                color={"#D10024"}
                loading={isLoading}
                cssOverride={loadingOveride}
                size={20}
                margin={2}
                speedMultiplier={1}
            />
            <ProductList list={productList} />
            <Widget handleNewUserMessage={handleNewUserMessage} title="Tin nhắn nhanh" 
            senderPlaceHolder="Nhâp tin nhắn" subtitle=""/>
            <Footer />
        </div>
    )
}

export default HomePage;