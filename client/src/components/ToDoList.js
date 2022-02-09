import React, {useState} from "react";
import Axios from "axios";
import AddArea from "./AddArea";

function ToDoList(props){
    //let userIdentity = props.userdata.data._id;
    const [workview, setWorkview] = useState(false);
    const [homeview, setHomeview] = useState(false);
    const [homeListItem, setHomeListItem] = useState(props.data.homeList);
    const [workListItem, setWorkListItem] = useState(props.data.workList);
    function onAddHome(newTask){
        setHomeListItem(prevNotes => {
            return [...prevNotes, newTask];
          });
    }
    function onAddWork(newTask){
        setWorkListItem(prevNotes => {
            return [...prevNotes, newTask];
          });
    }
    function deleteHome(id){
        console.log(homeListItem[id]);
        console.log(props.data._id);
        Axios({
            method: "DELETE",
            data: {
              task: homeListItem[id],
              typeOfList: "homeList",
              userID: props.data._id
            },
            withCredentials: true,
            url: "http://localhost:4000/delete"
          }).then((res) => {
            console.log(res);
          });
        setHomeListItem(prevNotes => {
            return prevNotes.filter((items, index) => {
              return index !== id;
            });
        });

        
    }
    function deleteWork(id){
        Axios({
            method: "DELETE",
            data: {
                task: workListItem[id],
                typeOfList: "workList",
                userID: props.data._id
            },
            withCredentials: true,
            url: "http://localhost:4000/delete"
          }).then((res) => {
            console.log(res);
          });
        setWorkListItem(prevNotes => {
            return prevNotes.filter((items, index) => {
              return index !== id;
            });
        });
        
    }
    function handleWorkClick(){
        setWorkview(true);
        setHomeview(false);
    }
    function handleHomeClick(){
        setWorkview(false);
        setHomeview(true);
    }
    function ListView(p){
        //console.log(tasks.tasks.length);
        //return tasks.tasks.map((reptile) => <li>{reptile}</li>);
        if(p.type==="home")
            return homeListItem.map((ele,index) => 
            <div><div><span>{ele}  </span>  <button onClick={() => deleteHome(index)}>Delete</button></div></div> 
            
        );
        else{
            return workListItem.map((ele,index) => 
            <div><span>{ele}  </span>  <button onClick={() => deleteWork(index)}>Delete</button></div> 
            );
        }
    }
    function Layout(){
        if(homeview){
            return(
                <div>< AddArea userdata={props} listType="homeList" onAdd={onAddHome}/><br></br><ListView type="home"/></div>
            );
        }else if(workview){
            return( <div>< AddArea userdata={props} listType="workList" onAdd={onAddWork}/><br></br><ListView type="work"/></div> );
        }else{
            return (<div></div>);
        }
    }
    return (
        <div>
        <button onClick={handleWorkClick}>WORK</button>
        <span></span>
        <button onClick={handleHomeClick}>HOME</button>
        
        <Layout />

        </div>
    );
}

export default ToDoList;