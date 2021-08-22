import React, {Fragment, useState, useEffect} from 'react';
import Navbar from './Components/Navbar'
import BookList from './Components/BookList'
import Form from './Components/Form'

function App() {

  const [docente, setDocente] = useState({
    CodDocente: '',
    Nombres: '',
    ApPaterno: '',
    ApMaterno: '',
    Categoria: '',
    Email: '',
    Direccion: ''
  })

  const [tdocente, setDocentes] = useState([])

  const [listUpdated, setListUpdated] = useState(false)

  useEffect(() => {
    const getBooks = () => {
      fetch('http://localhost:8000/api')
      .then(res => res.json())
      .then(res => setDocentes(res))
    }
    getBooks()
    setListUpdated(false)
  }, [listUpdated])

  return (
    <Fragment>
      <Navbar brand='Library App'/>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h2 style={{textAlign: 'center'}}>Book List</h2>
            <BookList docente={docente} setDocente={setDocente} tdocente={tdocente} setListUpdated={setListUpdated}/>
          </div>
          <div className="col-5">
            <h2 style={{textAlign: 'center'}}>Book Form</h2>
            <Form docente={docente} setDocente={setDocente}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
