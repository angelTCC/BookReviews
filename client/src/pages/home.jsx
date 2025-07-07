import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Home () {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const books = Array.from({ length: 9 }, (_, i) => i + 1);
    const [showModal, setShowModal] = useState(false);
    const [isLog, setIsLog] = useState(false);
    const [data, setData] = useState(null);

    // GET INITIAL DATA ========================================
    useEffect( () => {
        fetch('http://127.0.0.1:3000/')
        .then( (response) => response.json())
        .then( (json) => {
            setData(Object.values(json.books));
        })
        .catch( (error) => {
            console.log(error, 'erro in load list books')
        })
    }, [])

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
                { data === null
                    ? <p>Loading data ..</p>
                    : 
                    data.map((item, index)=>{
                        const isSelected = selectedIndex === index;
                        return (
                            <div 
                                style={{backgroundColor: isSelected ? '#a9b7cf': 'grey', margin:5, width: 250, height: 250, borderRadius: 10}}
                                onClick={ () => setSelectedIndex(index) }>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img key={index} src={`https://picsum.photos/id/${index + 100}/200/300`} alt="figure" style={{ width: '50%', borderRadius: 10}} />
                                </div>
                                <div>
                                    <p style={{ margin: '2px 0' }}>Title: {item.title}</p>
                                    <p style={{ margin: '2px 0' }}>Author: {item.author}</p>
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
                    <p>Select one book</p> 
                    :
                    <>
                    <p>Title: {data[selectedIndex].title}</p>
                    <p>Author: {data[selectedIndex].author}</p>
                    <p>Reviews:{JSON.stringify(data[selectedIndex].reviews)}</p>
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
                        : <Button onClick={ () => navigate('/customer/login')}>Loggin</Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}