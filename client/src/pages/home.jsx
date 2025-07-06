import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Home () {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const books = Array.from({ length: 9 }, (_, i) => i + 1);
    const [showModal, setShowModal] = useState(false);
    const [isLog, setIsLog] = useState(false);
    const [data, setData] = useState(null);

    useEffect( () => {
        fetch('http://127.0.0.1:3000/')
        .then( (response) => response.json())
        .then( (response) => {
            setData(response);
            console.log(response);
        })
        .catch( (error) => {
            console.log(error, 'erro in load list books')
        })
    })

    return (
        <>
        <div className='row'>
            <h3>Welcomen to Book reviews!</h3>
        </div>

        {/**FILTER ============================================= */}
        <div className="row" style={{ borderWidth:2, border:'solid', padding: 10}}>
            <div className="col-7">
                <label>title</label>
                <input/>
            </div>
            <div className="col-5">
                <button type="button">Search</button>
            </div>
        </div>

        {/** LIST BOOKS ========================================== */}
        <div className="row" >
            <div className='col-9' style={{display:'flex', flexWrap: 'wrap'}}>
                {
                    books.map((item, index)=>{
                        const isSelected = selectedIndex === index;
                        return (
                            <div 
                                style={{backgroundColor: isSelected ? '#a9b7cf': 'grey', margin:5, width: 250, height: 250, borderRadius: 10}}
                                onClick={ () => setSelectedIndex(index) }>
                                <div>
                                    <img key={index} src={`https://picsum.photos/id/${index + 100}/200/300`} alt="figure" style={{ width: '50%', borderRadius: 10}} />
                                </div>
                                <div>
                                    <p style={{ margin: '2px 0' }}>Title: {item}</p>
                                    <p style={{ margin: '2px 0' }}>Author: {item}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            
            {/**INFO BOOK ==================================== */}
            <div className='col-3'>
                <h3>Info book</h3>
                {
                    selectedIndex === null
                    ? 
                    <p>Book Selected</p> 
                    :
                    <>
                    <p>{books[selectedIndex]}</p>
                    <p>Description</p>
                    <p>Reviews:</p>
                    <p>Fecth some reviews</p>
                    <p>Add your review</p>
                    <Button onClick={() => setShowModal(true)}>Add your review</Button>
                    </>
                }
            </div>
        </div>
                    {/**MODAL ========================== */}
            <Modal show={ showModal } onHide={ () => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { isLog
                        ? <>
                            <p>you are logged</p>
                            <input/>
                        </>
                        : <p>you are not logged</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    { isLog 
                        ? <Button onClick={ () => setShowModal(false)}>Save</Button>
                        : <Button onClick={ () => setIsLog(true)}>Loggin</Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}