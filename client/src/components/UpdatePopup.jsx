import React,{useState} from 'react'
import styled from 'styled-components'
import { useLocal } from '../store/auth_context';
import '../css/componentcss/updatepopup.css'
import Loader from '../Assets/Image/loader.gif'

const UpdatePopup = (Props) => {
    const [prop,setProp] = useState({
        title: Props.data.title,
        description: Props.data.description,
        tags:Props.data.tags,
        popupimg:Props.data.postImg
    });
    // console.log("from data ",Props.data.title)
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
                            prop.tags ?prop.tags.map((element)=> (
                                <button>{element}</button>
                                )): ""
                            }
                        </div> 
                </div>
        </div>

        <div className='rightpopup'>
        <form>
                    <h4>Title</h4> 
                    <input type="text" name="title" value={prop.title} onChange={(e) => {setProp({...prop, title: e.target.value})}}/>
                    <h4>Discription</h4> 
                        <input type="text" name="discription" id="discription"  value={prop.description} onChange={(e) => {setProp({...prop, description: e.target.value})}}/>
                     
                    <h4 >Post Images</h4> 
                        <input type="file" name="postImg" id="popuppostImg" accept='.jpeg,.png,.jpg'  />
                        <h4 className="add"  >➕</h4>
                        <input type="text" name='tags' placeholder='Enter New Tag'  />
                        <div className='poptags' >
                        {
                            prop.tags ?prop.tags.map((element)=> (
                                <button style={{margin: "5px"}}>{element}<button className='poptagcross'>❌</button></button>
                                )): ""
                            }
                        </div>    
                    <button type="submit" style={{gridColumn: "span 2"}}>Submit</button>
                </form>
        </div>
       
    </div>
    
    </div>

  )
}

// const UpdPop = styled.div`
// position: fixed;
// width: 100vw;
// height: 100vh;
// left: 0;
// top: 0;
// z-index: 0;
// display: flex;
// justify-content: center;
// background: white;
// padding: 10%;
// .Grid{
//     display: grid;
//     gap: 15px;
//     grid-template-columns: 30% 70%;
// }
// `;
export default UpdatePopup