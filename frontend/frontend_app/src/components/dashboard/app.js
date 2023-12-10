import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Taskcard from '../taskcard/app';

import './styles.css';
import ai from '../triskele.png';
import profile from '../account.png';

function DashBoard(
    props
) {
    const [task, setTask] = useState({
        title:"",
        description:"",
        body:"",
        user:localStorage.getItem('session'),
    });
    const [subtasks, setSubtasks] = useState([
        {
            title:"",
            description:"",
        },
        {
            title:"",
            description:"",
        },
        {
            title:"",
            description:"",
        }
    ]);

    const [toggle, setToggle] = useState(false);
    const [allTasks, setAllTasks] = useState([]);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:3001/read_task?user=${localStorage.getItem('session')}`,
        {
            withCredentials: true
        })
        .then(response => {
            setAllTasks(response.data);
            console.log("Registration Successful!!! ");
        })
        .catch(error => {
            console.log("Registration Error!!! ", error);
        });
    }, [toggle]);

    const handleLogout = () => {
        localStorage.removeItem('session');
        props.history.push("/");
        props.history.go();
    }

    if(localStorage.getItem('session') === null){
        props.history.push("/");
        props.history.go();
    }

    const handleChangeTask = (e, helper) => {
        if(helper === 'title') setTask({...task, title : e.target.value});
        else if(helper === 'description') setTask({...task, description : e.target.value});
        else setTask({...task, body : e.target.value});
    }

    const handleChangeSubtask = (e, pos, helper) => {
        let updatedList = subtasks.map((item, idx) => {
            if (idx === pos){
                if(helper === 'title') return {...item, title: e.target.value}; 
                else return {...item, description: e.target.value}; 
            }
            else return item; 
        });
    
        setSubtasks(updatedList);
    }

    const handleSubmit = () => {
        axios.post("http://127.0.0.1:3001/create_task", {
            task:task,
            subtasks:subtasks
        }, 
        {
            withCredentials: true
        })
        .then(response => {
            console.log("Registration Successful!!! ", response);
        })
        .catch(error => {
            console.log("Registration Error!!! ", error);
        });

        setTask({
            title:"",
            description:"",
            body:"",
            user:localStorage.getItem('session'),
        });
        setSubtasks([
            {
                title:"",
                description:"",
            },
            {
                title:"",
                description:"",
            },
            {
                title:"",
                description:"",
            }
        ])
        setToggle(!toggle);
    }

    const handleAI = () => {
        axios.post("https://api.openai.com/v1/completions", {
            model: "text-davinci-003",
            prompt: `${task.title} in 3steps, seperated by '|'.`,
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        },{
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        })
        .then(response => {
            console.log("Registration Successful!!! ");

            let allSteps = response.data.choices[0].text.replace(/\n/g, '').split("|");
            let updatedList = subtasks.map((item, idx) => {
                return {...item, title: allSteps[idx]};  
            });
            setSubtasks(updatedList);
        })
        .catch(error => {
            console.log("Registration Error!!! ", error);
        });
    }

    return (
        <div className='dashboard'>
            <div className='left'>
                <div className='top'>
                    <>
                        <span className='discription'>DashBoard</span>
                    </>
                </div>
                <div className='bottom'>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <div className='profile'>
                            <div style={{padding:'10px'}}>
                                <img style={{width:'40px', backgroundColor:'white', borderRadius:'30px', marginRight:'15px'}} src={profile} alt="profile" />
                            </div>
                            <span className='profileName'>{localStorage.getItem('session')}</span>
                        </div>
                    </div>

                    <div>
                        <div className='mainTask'>
                            <input
                                type='title'
                                name='title'
                                placeholder='Title Here...'
                                value={task.title}
                                onChange={(e) => handleChangeTask(e, 'title')}
                                required
                            />     

                            <input
                                type='description'
                                name='description'
                                placeholder='Description Here...'
                                value={task.description}
                                onChange={(e) => handleChangeTask(e, 'description')}
                                required
                            /> 
                        </div> 

                        <div>
                            {subtasks.map((key, idx)=>{
                                return <div 
                                    className='subTask'
                                    key={idx}>
                                    <input
                                        type='title'
                                        name='title'
                                        placeholder={`Step #${idx+1}`}
                                        value={subtasks[idx].title}
                                        onChange={(e) => handleChangeSubtask(e, idx, 'title')}
                                        required
                                    />

                                    {/* <input
                                        type='description'
                                        name='description'
                                        placeholder='description here...'
                                        value={subtasks[idx].description}
                                        onChange={(e) => handleChangeSubtask(e, idx, 'description')}
                                        required
                                    /> */}
                                </div>
                            })}
                        </div>       

                        <div className='button_container'>
                            <div style={{display:'flex'}}>
                                <button className='button' onClick={handleSubmit}>Add...</button>  
                                <button className='button_plus' onClick={handleAI}>
                                    <img style={{width:'23px', marginTop:'2px'}} alt="ai" src={ai} />
                                </button>  
                            </div>
                            <button className='button' onClick={handleLogout}>LogOut</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='right'>
                {(allTasks.length > 0)?(
                    allTasks.map((item, idx)=>{
                        return (
                            <div key={idx}>
                                <Taskcard item={item} />
                            </div>
                        )
                    })
                ):(null)}
            </div>
        </div>
    )
}

export default DashBoard
