import React from 'react';

const BookList = ({docente, setDocente, tdocente, setListUpdated}) => {


    const handleDelete = CodDocente => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:8000/api/' + CodDocente, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        setListUpdated(true)
    }

    let{Nombres, ApPaterno, ApMaterno, Categoria, Email, Direccion} = docente

    const handleUpdate = CodDocente => {
        //validación de los datos
        if (CodDocente === '' || Nombres === '' || ApPaterno === '' || ApMaterno === '' || Categoria === '' || Email === '' || Direccion === '') {
            alert('Todos los campos son obligatorios')
            return
        }

        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(docente)
        }
        fetch('http://localhost:8000/api/' + CodDocente, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //reiniciando state de libro
        setDocente({
            CodDocente: '',
            Nombres: '',
            ApPaterno: '',
            ApMaterno: '',
            Categoria: '',
            Email: '',
            Direccion: ''
        })

        setListUpdated(true)
    }


    return ( 
        <table className="table">
            <thead>
                <tr>
                    <th>CODIGO</th>
                    <th>NOMBRES</th>
                    <th>APELLIDO</th>
                    <th>APELLIDOS</th>
                    <th>CATEGORIA</th>
                    <th>EMAIL</th>
                    <th>Edition</th>
                </tr>
            </thead>
            <tbody>
                {tdocente.map(docente => (
                    <tr key={docente.CodDocente}>
                        <td>{docente.CodDocente}</td>
                        <td>{docente.Nombres}</td>
                        <td>{docente.ApPaterno}</td>
                        <td>{docente.ApMaterno}</td>
                        <td>{docente.Categoria}</td>
                        <td>{docente.Email}</td>
                        <td>{docente.Direccion}</td>
                        <td>
                            <div className="mb-3">
                                <button onClick={() => handleDelete(docente.CodDocente)} className="btn btn-danger">Delete</button>
                            </div>
                            <div className="mb-3">
                                <button onClick={() => handleUpdate(docente.CodDocente)} className="btn btn-dark">Update</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default BookList;