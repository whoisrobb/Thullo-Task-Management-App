import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { serverUrl } from '../utils/urls'
import DOMPurify from 'dompurify'

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        console.log(searchTerm)
        searchFunctionality(searchTerm)
    }, [searchTerm])
        console.log(searchResults)

    const searchFunctionality = async (query) => {
        try {
            const response = await fetch(`${serverUrl}/board/search?q=${query}`)
            const data = await response.json()
            setSearchResults(data)
        } catch (err) {
            console.error(err)
        }
    }

    const truncateText = (html, maxWords) => {
        const sanitizedHtml = DOMPurify.sanitize(html, {
          ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'li'],
        });
      
        const words = sanitizedHtml.split(' ');
      
        if (words.length <= maxWords) {
          return sanitizedHtml;
        }
      
        const truncatedText = words.slice(0, maxWords).join(' ') + '...';
        return truncatedText;
      };

  return (
    <div className='header'>
        <div className="logo">
            <Link to={`/`}>Thullo</Link>
        </div>
        <div className="search">
            <input 
                type="text"
                className="search__input"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            { searchResults && searchTerm ?
                <div className='search-results'>
                    {/* <button>Yooo</button> */}
                    {searchResults.boards.length > 0 &&
                        searchResults.boards.map((result, index) => (
                            <>
                            {result.title != '' &&
                                <button key={result._id}>
                                    <p>Board</p>
                                    <p>{result.title}</p>
                                </button>
                            }
                            {result.description != '' &&
                                <button key={result._id}>
                                    <p>Board</p>
                                    <p>{truncateText(result.description, 5)}</p>
                                </button>
                            }
                            </>
                        ))
                    }
                    {searchResults.cards.length > 0 &&
                        searchResults.cards.map((result, index) => (
                            <>
                                {result.title != '' ?
                                    <button key={result._id}>
                                        <h3>{result.title}</h3>
                                        <p>Cards</p>
                                    </button>
                                    :
                                    null
                                }
                                {/* {result.description != '' ?
                                    <button key={result._id}>
                                        <h3
                                            dangerouslySetInnerHTML={{
                                            __html: truncateText(result.description, 5),
                                            }}
                                        />
                                        <p>Cards</p>
                                    </button>
                                    :
                                    null
                                } */}
                            </>
                        ))
                    }
                    {searchResults.lists.length > 0 &&
                        searchResults.lists.map((result, index) => (
                            <>
                                {result.title != '' &&
                                    <button key={result._id}>
                                        <p>Lists</p>
                                        <p>{result.title}</p>
                                    </button>
                                }
                            </>
                        ))
                    }
                </div> :
                null
            }
        </div>
        <div className="profile">
            <p>muchiri</p>
        </div>
    </div>
  )
}

export default Header