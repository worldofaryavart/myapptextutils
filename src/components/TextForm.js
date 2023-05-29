import React,{useState} from 'react'

export default function TextForm(props) {
    const [fWord, findWord] = useState("");
    const [rWord, replaceWord] = useState("");

    const [text, setText] = useState("");
    const handleUpClick=()=>{
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("success","Converted to UpperCase")
    };
    const handleOnChange=(event)=>{
        setText(event.target.value);
    };
    const handleLoClick=()=>{
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("success","Converted to LowerCase")
    };
    
    const handleFindChange = (event) => {
        findWord(event.target.value);
    };
    const handleReplaceChange = (event) => {
        replaceWord(event.target.value) ;
    };
    const handleReplaceClick = () => {
        let newText = text.replaceAll(fWord,rWord);
        if(newText.length===0){
            props.showAlert("danger","NO words to replace");
        }
        else{
            setText(newText);
            props.showAlert("success","Replaced Successfully")
        }
    };
    
    const speak = () => {
        let msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
        const toogle = document.getElementById('toggle')
        if (toogle.textContent === "Speak") {
            toogle.innerHTML = "Stop"
            props.showAlert("success","Speaking")
        }
        else {
            toogle.innerHTML = "Speak"
            if (toogle.innerHTML === "Speak"){
                window.speechSynthesis.cancel()
                props.showAlert("warning","Speaking Stopped")
            }
        }
    }

  return (
    <>
    <div>
        <h2>{props.heading}</h2>
        <div className="mb-3">
            <textarea className="form-control my-3" style={{backgroundColor:props.mode==='dark'?'grey':'white',color:props.mode==='dark'?'white':'black'}} value = {text} onChange = {handleOnChange} id="exampleFormControlTextarea1" rows="8"></textarea>
            <p>Type word to find</p>
            <textarea className="form-control my-3" style={{backgroundColor:props.mode==='dark'?'grey':'white',color:props.mode==='dark'?'white':'black'}} value={fWord} onChange = {handleFindChange} id="exampleFormControlTextarea1" rows="1"></textarea>
            <p>Type word to replace</p>
            <textarea className="form-control my-3" style={{backgroundColor:props.mode==='dark'?'grey':'white',color:props.mode==='dark'?'white':'black'}}  value={rWord} onChange = {handleReplaceChange} id="exampleFormControlTextarea1" rows="1"></textarea>
        </div>
        <div>
            <button type="button" className="btn btn-primary mx-2" onClick={handleUpClick}>UpperCase</button>
            <button type="button" className="btn btn-primary mx-2" onClick={handleLoClick}>LowerCase</button>
            <button type="button" className="btn btn-primary mx-2" onClick={handleReplaceClick}>Replace Word</button>
            <button type="submit" onClick={speak} className="btn btn-primary mx-2 my-2" id="toggle">Speak</button>
        </div>
        <div className="container">
            <h1>Your Text Summary</h1>
            <p>{text.split(' ').length} words and {text.length} characters</p>
            <p>{0.008*text.split(' ').length} minutes read</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Enter something to preview"}</p>
        </div>
    </div>
    </>
  )
}
