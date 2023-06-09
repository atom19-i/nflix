import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import "./home.scss";
import { useEffect, useState } from "react";
import { API_URL } from "../../helper";
import axios from "axios";

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  
  useEffect(() => {
    const getRandomLists = async ()=> {
      try{
        const res = await axios.get(
          `${API_URL}/lists${type ? "?type=" + type : ''}${
            genre ? "&genre="+ genre : ''
          }`, {
            headers: {
              token:"Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch(err){
        console.log(err);
      }
    };
    getRandomLists();
  },[type, genre]);
  
  //console.log(lists)
  return (
    <div className="home">
      <Navbar/>
      <Featured type={type} setGenre={setGenre}/>
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;