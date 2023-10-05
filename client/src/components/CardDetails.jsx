import React, { useEffect, useState } from 'react'
import { useCard } from './CardProvider'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { serverUrl } from '../utils/urls'


const labelColours = ['#FDD6CE', '#BCECD7', '#CACDFF', '#FBE2AA']

const CardDetails = () => {
  const { toggle, cardItem, toggleCard, access } = useCard()

  const [cardDetails, setCardDetails] = useState(null)
  const [activeDescription, setActiveDescription] = useState(false)
  const [activeLabelInput, setActiveLabelInput] = useState(false)
  const [title, setTitle] = useState('')
  const [labels, setLabels] = useState([])
  const [newLabel, setNewLabel] = useState({
    name: '',
    color: labelColours[0],
  })
  const [checklists, setChecklists] = useState([])
  const [newChecklist, setNewChecklist] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (cardItem) {
      setTitle(cardItem.title)
      setContent(cardItem.description)
      setLabels(cardItem.labels)
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
        body: JSON.stringify({ title, description: content, checklists, labels })
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
  
  const handleAddLabel = () => {
    if (newLabel.name.trim() !== '') {
      setLabels([...labels, { ...newLabel }])
      setNewLabel({ name: '', color: labelColours[0] })
    }
  }
  
  const handleNameChange = (event) => {
    const newName = event.target.value
    setNewLabel({ ...newLabel, name: newName })
  }

  const handleColorChange = (event) => {
    const newColor = event.target.value
    setNewLabel({ ...newLabel, color: newColor })
  }

  const handleRemoveLabel = (index) => {
    const updatedLabels = [...labels]
    updatedLabels.splice(index, 1)
    setLabels(updatedLabels)
  }

  // console.log(checklists)
  // console.log(cardItem)
  console.log(access)

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

          <div className="labels">
            <div className="head">
              <i className="uil uil-tag"></i>
              <h3>labels</h3>
            </div>
            <button onClick={() => setActiveLabelInput(prevValue => !prevValue)} className="add-label"><i className="uil uil-plus"></i></button>
            {activeLabelInput &&
              <div className="label-input">
                <input
                  type="text"
                  value={newLabel.name}
                  onChange={handleNameChange}
                  placeholder="Label Name"
                />
                <select value={newLabel.color} onChange={handleColorChange}>
                  {labelColours.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                <button onClick={handleAddLabel}>Add Label</button>
              </div>
            }
            <ul>
              { labels && labels.map((label, index) => (
                  <li key={index} className="tag">
                    <span style={{ backgroundColor: label.color }}>
                      {label.name}
                      <button onClick={() => handleRemoveLabel(index)}>
                        <i className="uil uil-times"></i>
                      </button>
                    </span>
                  </li>
              ))}
            </ul>
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
          
        <form
          onSubmit={handleSubmit}
        >
          {/* <button onClick={handleSubmit} className='done'>done</button> */}
          <button type='submit' className='done'>done</button>
        </form>
    </div>
  )
}

export default CardDetails