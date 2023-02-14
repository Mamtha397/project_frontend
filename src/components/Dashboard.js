import React, {useEffect, useState} from "react"
import {Table } from 'react-bootstrap';  
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function Dashboard (props) {
    const [data, setData] = useState([]);

    useEffect(()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://project-backend-nine.vercel.app/api/getAllData", requestOptions)
        .then(response => response.json())
        .then(result => setData(result.message))
        .catch(error => console.log('error', error));
    },[])

    const handleAddDataBtn = ()=>{
        window.location.href = "/create";
    }

    const handleDeleteBtn = (id) =>{
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch("https://project-backend-nine.vercel.app/api/deleteData/"+id, requestOptions)
        .then(response => response.text())
        .then(result => {
            alert("Deleted Successfully")
            window.location.href = "/dashboard"
        })
        .catch(error => console.log('error', error));
    }

    const handleEditBtn = (id) =>{
        window.location.href = "/create?id="+id
    }
  
    return (
        <div className="Dashboard-main">
      <div className="Dashboard-form-container">
            <h1>Dashboard</h1>
          {data.length>0 ?
          (<Table striped bordered hover variant='dark'>  
          <thead>  
            <tr>  
              <th>#</th>  
              <th>Name</th>  
              <th>Sector</th>  
              <th>isAgree</th>  
              <th>Action</th>  
            </tr>  
          </thead>  
          <tbody>  
            {data.map((d)=>{
                return (<tr>  
                    <td>{d.id}</td>  
                    <td>{d.name}</td>  
                    <td>{d.sector}</td>  
                    <td>{d.isAgree === 1 ? "True": "False"}</td>  
                    <td><AiFillEdit onClick={()=>handleEditBtn(d.id)}/>  <AiFillDelete onClick={()=>handleDeleteBtn(d.id)}/></td>  
                  </tr> )
            })}  
          </tbody>  
        </Table>):(<div>
            No Data Available
            <br />
        </div>
            )
          }
          <br />
          <button type="button" className="btn btn-primary" onClick={handleAddDataBtn}>
                Add Data
              </button>
      </div>
        </div>
    )
  }
