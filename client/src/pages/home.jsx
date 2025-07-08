import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function Home () {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem('token');
    const [isLog, setIsLog] = useState(!!token);
    const [data, setData] = useState(null);
    const [username, setUsername] = useState('');

    const [review, setReview] = useState('');

    const putReview = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/customer/auth/review/${selectedIndex+1}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    review: review
                })
            });
            const data = await response.json();
            if (response.ok) {
                window.alert(data.message);
                await loadBooks();
            } else {
                window.alert("Error: " + data.message);
            }

        } catch (error) {
            window.alert('error in add review');
        }
    }
    const loadBooks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/');
            const data = await response.json();
            if (response.ok) {
                console.log('books loaded');
            } else {
                window.alert('error loading books');
            }
            setData(Object.values(data.books));

        } catch (error) {
            console.log('error in load books');
        }
    }
    const delReview = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/customer/auth/review/${selectedIndex+1}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                window.alert(data.message);
                await loadBooks();
            } else {
                window.alert("Error: " + data.message);
            }
        } catch (error) {
             console.error('Error deleting review:', error);
            window.alert('Error in deleting review');
        };
    }
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.username);
            } catch (err) {
                console.error('Invalid token', err);
            }   
        } else {
            setUsername('');
        }
    }, [isLog]);

    useEffect( () => {
        loadBooks();
    }, [])

    return (
        <>
        <div className='row'>
            <div className='col-10'>
                <h3>Welcomen{username ? `, ${username}` : ''}!</h3>
            </div>
            <div className='col-2'>
                {isLog
                    ?   <Button onClick={ () => {
                            localStorage.removeItem('token');
                            setIsLog(false);
                        }}>Logout</Button>
                    :   <Button onClick={ () => navigate('/customer/login')}>Logged</Button>
                }
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
                    {
                        isLog
                        ? <Button onClick={()=> delReview()}>Delete your review</Button>
                        : <></>
                    }
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
                        ?   <>
                            <p>you are logged</p>
                            <input
                            value={ review }
                            onChange={ (e) => setReview(e.target.value)}
                            />
                            </>
                        :   <p>you are not logged</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    { isLog 
                        ? <Button onClick={ () => {
                            setShowModal(false);
                            putReview();
                        }}>Save</Button>
                        : <Button onClick={ () => navigate('/customer/login')}>Loggin</Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}