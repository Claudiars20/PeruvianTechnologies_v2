import React from 'react';

const Form = ({docente, setDocente}) => {

    const handleChange = e => {
        setDocente({
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
        fetch('http://localhost:8000/api', requestInit)
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
            <div className="mb-3">
                <label htmlFor="Codigo" className="form-label">CODIGO</label>
                <input value={CodDocente} name="CodDocente" onChange={handleChange} type="text" id="Codigo" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="Nombres" className="form-label">NOMBRES</label>
                <input value={Nombres} name="Nombres" onChange={handleChange} type="text" id="Nombres" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="ApellidoPaterno" className="form-label">APELLIDO</label>
                <input value={ApPaterno}  name="ApPaterno" onChange={handleChange} type="text" id="ApellidoPaterno" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="ApellidoMaterno" className="form-label">APELLIDOS</label>
                <input value={ApMaterno}  name="ApMaterno" onChange={handleChange} type="text" id="ApellidoMaterno" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="Categoria" className="form-label">CATEGORIA</label>
                <input value={Categoria}  name="Categoria" onChange={handleChange} type="text" id="Categoria" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="Email" className="form-label">EMAIL</label>
                <input value={Email}  name="Email" onChange={handleChange} type="text" id="Email" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="Direccion" className="form-label">Edition</label>
                <input value={Direccion}  name="Direccion" onChange={handleChange} type="text" id="Direccion" className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
 
export default Form;