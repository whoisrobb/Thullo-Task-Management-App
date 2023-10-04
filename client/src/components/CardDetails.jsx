import React, { useEffect, useState } from 'react'
import { useCard } from './CardProvider'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { serverUrl } from '../utils/urls'

const CardDetails = () => {
  const { toggle, cardItem, toggleCard } = useCard()

  const [cardDetails, setCardDetails] = useState(null)
  const [activeDescription, setActiveDescription] = useState(false)
  const [title, setTitle] = useState('')
  const [checklists, setChecklists] = useState([])
  const [newChecklist, setNewChecklist] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (cardItem) {
      setTitle(cardItem.title)
      setContent(cardItem.description)
      setChecklists(cardItem.checklists)
    }
  }, [cardItem])

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${serverUrl}/board/cards/put/${cardItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description: content, checklists })
      })
      const data = await response.json()
      // setCardData(data)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }
  
  const handleAddItem = (e) => {
    e.preventDefault()

    if (newChecklist.trim() !== '') {
      setChecklists([...checklists, { text: newChecklist, checked: false }]);
      setNewChecklist('');
    }
  }

  const handleToggleItem = (index) => {
    const updatedItems = [...checklists]
    updatedItems[index].checked = !updatedItems[index].checked
    setChecklists(updatedItems)
  }

  
  const handleRemoveItem = (index) => {
      const updatedItems = [...checklists]
      updatedItems.splice(index, 1)
      setChecklists(updatedItems)
    }
    

  console.log(checklists)

  return (
    <div
      className='card-details'
      style={toggle ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)' }}
    >
        <header className="head">
          <h3 className="title">{cardItem && cardItem.title}</h3>
          <button onClick={toggleCard}>
            <i className="uil uil-times"></i>
          </button>
        </header>

        {/* <form
          onSubmit={handleSubmit}
        > */}
          <div className='description'>
            <div className='head'>
              <i className="uil uil-file-alt"></i>
              <h3>description</h3>
            </div>
            {activeDescription ? 
              <div className="active-description">
                  <ReactQuill value={content} onChange={(value) => setContent(value)} />
              </div> :
              <div className="content">
                {cardItem.description ? 
                  <div onClick={() => setActiveDescription(true)} className='content' dangerouslySetInnerHTML={{ __html: content }} />
                  :
                  <button onClick={() => setActiveDescription(true)} className='set-active'>input a description</button>
                }
              </div>
            }
          </div>

          <div className="checklists">
            <div className='head'>
              <i className="uil uil-check-square"></i>
              <h3>to do lists</h3>
            </div>
            
            <ul>
              {checklists && checklists.map((item, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggleItem(index)}
                  />
                  {item.text}
                  <button onClick={() => handleRemoveItem(index)}>
                    <i className="uil uil-times"></i>
                  </button>
                </li>
              ))}
            </ul>
            <form>
              <input
                type="text"
                value={newChecklist}
                onChange={(e) => setNewChecklist(e.target.value)}
                placeholder="Add a new item"
              />
              <button onClick={handleAddItem}>Add</button>
            </form>
          </div>
          
          <button onClick={handleSubmit} className='done'>done</button>
        {/* </form> */}
    </div>
  )
}

export default CardDetails