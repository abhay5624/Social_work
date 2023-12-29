import React,{useState} from 'react'
import styled from 'styled-components'
import { useLocal } from '../store/auth_context';
import '../css/componentcss/updatepopup.css'
import Loader from '../Assets/Image/loader.gif'
import { useNavigate } from 'react-router-dom';
const UpdatePopup = (Props) => {
    const Navigate = useNavigate();
    const [prop, setProp] = useState({
        id: Props.data._id,
        title: Props.data.title,
        description: Props.data.description,
        tags:Props.data.tags,
        popupimg:Props.data.postImg
    });
    const [tagArray, setTagArray] = useState(prop.tags);
    const [tg, setTg] = useState();
    const updateTagAdd = () => {
        setTagArray([...tagArray, tg]);
        setProp({ ...prop, tags: tagArray });
    }
    const UpdateTagsDelete = (e) => {
        e.preventDefault();
        const parentEl = e.target.parentElement;
        const data = tagArray.filter((element) => {
            return element != parentEl.firstElementChild.innerText;
        })
        setTagArray(data);
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
       
        const token = localStorage.getItem("token");
        const respond = await fetch(`http://localhost:3001/api/auth/post`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(prop)
        });
        if (respond.ok) {
            //Navigate(`../profile`);
            console.log(await respond.json());
        } else {
            alert("Error arived");
        }
       
    }
   return (
    <div className='mainpopup'>

    <div className='UpdPop'>
         <div className='updatepopupPost'>
         <h6>Preview</h6>


            <div style={  {backgroundImage: `url(${
                process.env.PUBLIC_URL + (prop.popupimg)?prop.popupimg:Loader})`}} className='updatepopupPostimg'>

                    <img src={prop.popupimg} alt="not found"/>
            </div>
            <div className='popdetails'>

                    <h2>{prop.title}</h2>
                    <p>{prop.description}</p>
                    <div className='poptags' >
                        {
                            tagArray ?tagArray.map((element)=> (
                                <button>{element}</button>
                                )): ""
                            }
                        </div> 
                </div>
        </div>

        <div className='rightpopup'>
        <form onSubmit={(e)=> {onSubmitHandler(e)}}>
                    <h4>Title</h4> 
                    <input type="text" name="title" value={prop.title} onChange={(e) => {setProp({...prop, title: e.target.value})}}/>
                    <h4>Discription</h4> 
                        <input type="text" name="discription" id="discription"  value={prop.description} onChange={(e) => {setProp({...prop, description: e.target.value})}}/>
                     
                    <h4 >Post Images</h4> 
                        <input type="file" name="postImg" id="popuppostImg" accept='.jpeg,.png,.jpg'  />
                        <h4 className="add" onClick={()=>{updateTagAdd()}} >➕</h4>
                        <input type="text" name='tags' placeholder='Enter New Tag'  value={tg} onChange={(e)=>setTg(e.target.value)}/>
                        <div className='poptags' >
                        {
                            tagArray ?tagArray.map((element)=> (
                                <button style={{margin: "5px"}}  ><span>{element}</span><button className='poptagcross' onClick={(e)=>UpdateTagsDelete(e)}>❌</button></button>
                                )): ""
                            }
                        </div>    
                    <button type="submit" style={{gridColumn: "span 2"}} onClick={(e)=> {onSubmitHandler(e)}}>Submit</button>
                </form>
        </div>
       
    </div>
    
    </div>

  )
}

export default UpdatePopup