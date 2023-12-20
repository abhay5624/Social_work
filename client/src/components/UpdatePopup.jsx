import React,{useState} from 'react'
import styled from 'styled-components'
import { useLocal } from '../store/auth_context';
const UpdatePopup = (data) => {
    const [prop,setProp] = useState({
        title: data.title,
        description: data.description
    });
    console.log("from data ",data.title)
  return (
    <UpdPop>
        <div>

        </div>
        <div>
        <form  className='Grid' >
                    <h4>Title</h4> 
                    <input type="text" name="title" value={prop.title} onChange={(e) => {setProp({...prop, title: e.target.value})}}/>
                    <h4>Discription</h4> 
                        <textarea type="text" name="discription" id="discription"  value={prop.description} onChange={(e) => {setProp({...prop, description: e.target.value})}}/>
                     
                    <h4 >Post Images</h4> 
                        <input type="file" name="postImg" id="postImg" accept='.jpeg,.png,.jpg'  />
                        <div className="addbtn"  >Add Tags</div>
                        <input type="text" name='tags' placeholder='Enter New Tag'  />
                        <div className='tags' style={{width: "100%",gridColumn: "span 2"}}>
                        {
                            prop.tags ?prop.tags.map((element)=> (
                                <button style={{margin: "5px"}}> <div>X</div>{element}</button>
                            )): ""
                        }
                        </div>    
                    <button type="submit" style={{gridColumn: "span 2"}}>Submit</button>
                </form>
        </div>
    </UpdPop>
  )
}

const UpdPop = styled.div`
position: fixed;
width: 100vw;
height: 100vh;
left: 0;
top: 0;
z-index: 0;
display: flex;
justify-content: center;
background: white;
padding: 10%;
.Grid{
    display: grid;
    gap: 15px;
    grid-template-columns: 30% 70%;
}
`;
export default UpdatePopup