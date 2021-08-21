import React from 'react';

const Form = ({docente, setDocente}) => {

    const handleChange = e => {
        setBook({
            ...docente,
            [e.target.name]: e.target.value
        })
    }

    let{CodDocente, Nombres, ApPaterno, ApMaterno, Categoria, Email, Direccion} = docente

    const handleSubmit = () => {
        //validación de los datos
        if (CodDocente === '' || Nombres === '' || ApPaterno === '' || ApMaterno === '' || Categoria === '' || Email === '' || Direccion === '') {
            alert('Todos los campos son obligatorios')
            return
        }

        //consulta
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(docente)
        }
        fetch('http://localhost:5000/api', requestInit)
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
    }

    return ( 
        <form onSubmit={handleSubmit}>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
 
export default Form;