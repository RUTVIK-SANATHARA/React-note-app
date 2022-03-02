import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './notes.css';

const getdata=()=>{

    let note=localStorage.getItem("notes");
    // console.log(JSON.parse(localStorage.getItem("notes")));
    if(note){
        return JSON.parse(localStorage.getItem("notes"));
    }else{
        return [];
    }
}



const Notes = () => {

    const [val, setVal] = useState("");
    const [data, setData] = useState(getdata());
    const [show,setShow]=useState(false);
    const change = (e) => {
        // console.log(e.target.value);
        setVal(e.target.value);

    }

    //to add a data
    const add = () => {
      const allinp={id:new Date().getTime().toString(),name:val}
        if(!val){
            toast.warn("please fill", {
                position: "top-center",
                autoClose:500,
            });
        }else{
            setData([...data,allinp]);
            setVal('');
        }
        // setShow(true);
    }

// ADD  TO LOCALSTORAGE 
    useEffect(() => {
      
     localStorage.setItem("notes",JSON.stringify(data));
     
    }, [data])
    
    // if(localStorage.getItem('notes')==null){
    //     localStorage.setItem("notes","[]");
    // }
    // let oldnotes=JSON.parse(localStorage.getItem("notes"));
    // oldnotes.push(data);
    // localStorage.setItem("notes",JSON.stringify(oldnotes));
    const del = (index) => {
        let newdata = data.filter((curele) => {
            return index !== curele.id;
        })
        toast.success("Delete Successfully", {
            position: "top-center",
            autoClose: 500,
        });
        setData(newdata);

    }
    const remove = () => {
        // alert("dele")
        setData([]);
    }

    const edit=(index)=>{
       
        let newinp=data.find((ele)=>{
            return index === ele.id;
        });
        // console.log(newinp.name);
        setVal(newinp.name);
        del(newinp.id);
    }
    return (
        <>
            <div className="container">
                <div className="mb-3 my-5">
                    <label htmlfor="exampleFormControlTextarea1" className="form-label">Enter Something</label>
                    <textarea className="form-control" id="inp" rows="3" value={val} onChange={change}></textarea>
                </div>
                <button className="btn btn-primary" onClick={add}>Add Notes</button>

                <div className="display my-5">
                    {/* <p>{data}</p> */}


                    {
                        data.map((cur, index) => {
                            return (
                                <>
                                    <div className="card mb-3" >
                                        <div className="card-body">
                                            <h5 className="card-title">Note {index+1}</h5>
                                            {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                                            <p className="card-text" key={index}>{cur.name}</p>
                                            <button className="btn btn-info me-3" onClick={()=>edit(cur.id)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => del(cur.id)}>Delete</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
                {
                    show && <button className="btn btn-warning mx-auto text-center" onClick={remove}>Remove All</button>
                }
                
                <ToastContainer />
            </div>
        </>
    )
}

export default Notes;