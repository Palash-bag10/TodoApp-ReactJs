import { useEffect, useState } from 'react';
import './App.css';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FaPenSquare } from 'react-icons/fa';

const getLocalData = () => {
  const lists = localStorage.getItem("mytodo")

  if(lists){
    return JSON.parse(lists)
  }
  else{
    return[];
  }
}

function App() {

  const [inputData, setInputData] = useState("");
  const [addItem, setAddItem] = useState(getLocalData())
  const [editItem, setEditItem] = useState("")
  const [toggleButton, setToggleButton] = useState(false);


  // SHOW ITEMS
  const changeHandler = (e) => {
    setInputData(e.target.value)
  }

  // ADD ITEMS
  const addItemHandler = () => {
    if(!inputData){
      alert("Please Enter Your Items");
    }
    // now EDIT the DATA from input field then click the toggle button which was EDIT BUTTO
    // now we want to show the EDITED DATA in Same list item 
    else if(inputData && toggleButton){
      setAddItem(
        addItem.map((currnetUpdateData) => {
          if(currnetUpdateData.id === editItem){
            return { ...currnetUpdateData, name: inputData};
          }
          return currnetUpdateData;
        })
      )

      //  Now toggle the button from EDIT BUTTON to ADD BUTTON
      setInputData("")
      setEditItem(null)
      setToggleButton(false)
    } 
    else{
      // GET UNIQUE ID
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }

      setAddItem([...addItem, newInputData]);
      setInputData("");
    }
  }

  // DELETE ITEMS 
  const deleteHandler = (index) => {
    const updateData = addItem.filter((currnetData) => {
      return currnetData.id !== index;
    });
    setAddItem(updateData);
  }

  // EDIT ITEMS
  const editHandler = (index) => {
    const updatedEditData = addItem.find((currnetData) => {
      return currnetData.id === index;
    });

    //If we click the edit button we need to show the data in INPUT FIELD for Updateing
    setInputData(updatedEditData.name)

    // For Show UpdatedEditData we create new editItem state in above
    setEditItem(index)

    // when click edit button in input field we toggle the ADD BUTTON to EDIT BUTTON
    setToggleButton(true)
  }


  // DELETE ALL ITEMS
  const deleteAllHandler = () => {
    setAddItem([]);
  }

  // ADD LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("mytodo", JSON.stringify(addItem))
  }, [addItem])



  return (
    <>
      <div className="wrapper w-full h-screen flex items-center">
        <div className="container h-max max-w-[500px] mx-auto bg-transparent flex flex-col justify-center items-center p-4 my-5">

          <div className="heading flex flex-col items-center my-3">
            <h1 className=' font-poppins text-[30px] font-bold text-yellow-50 tracking-[2px]'>TODO APP</h1>
            <p className=' font-poppins text-[15px]  text-yellow-50 '>Make Your Own Lists</p>
          </div>

          <div className="input-field flex w-[75%] items-center">
            <input type="text" 
                   placeholder='Notes...'
                   value={inputData}
                   onChange={changeHandler}
                   className=' relative w-full h-[35px] bg-[#ffffff70] border-gray-200 outline-0 border font-poppins pl-2 pr-6 rounded-md text-[#020211ab] placeholder:text-[#222255ab]'
            />

            {/* when we click edit  button in the list Item we TOGGLE the button from ADD BUTTON to EDIT BUTTON in the input field */}
            {
              toggleButton ? 
              (<FaPenSquare 
              className=' absolute flex w-[30px] right-[75px] top-[117px] cursor-pointer text-[#222255cb]'
              onClick={addItemHandler}
            />) : 
            (<FaPlus
            className=' absolute flex w-[30px] right-[75px] top-[117px] cursor-pointer text-[#222255cb]'
            onClick={addItemHandler} />)
            }
            
          </div>

          {/* Show our Items */}
          <div className="show-items w-[75%] flex flex-col my-5 justify-center">
          {
            addItem.map((currnetData)=> {
                return(
                  <div className="each-item w-full bg-[#e6ee764d] flex justify-between p-[10px] rounded-md items-center mb-4 " key={currnetData.id}>

                  <h2 className='font-poppins text-[17px] font-[400] text-[#202020] overflow-hidden break-words'>{currnetData.name}</h2>

                  <div className="item-buttons flex gap-2">
                  <FaPenSquare fontSize={22} className='hover:text-[#32ff8e] cursor-pointer' 
                               onClick={() => editHandler(currnetData.id)}
                  />
                  <FaTrash fontSize={20} className='hover:text-[#ff4141] cursor-pointer'
                           onClick={() => deleteHandler(currnetData.id)}
                  />
                  </div>
            </div>
                )
            })
          }
          </div>

          {/* button */}
          <div className="remove-item-button">
            <button className='bg-[#564fe1] py-1 px-3 rounded-md font-poppins text-[#d4eaff]'
                    onClick={deleteAllHandler}>
              Remove All
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
