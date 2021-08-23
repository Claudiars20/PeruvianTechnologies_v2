import MotionHoc from "./MotionHoc";
import {Container, FormControl,InputLabel,Input,Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MaterialTable from "material-table";
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const themes = createTheme({
  typography: {
    fontFamily: 'Georama', 
  },
});
const useStyles = makeStyles((theme) => ({  
  table: {
    minWidth: 700,
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  name:{
    marginTop: theme.spacing(5),
    textAlign: 'center',
  },
  as:
  {
    position: 'relative',
    margin: '#fff',
  },
  mainGrid: {
    flex : 1,
  },
  main:{
    width:'100%',
  },
  containers:{
    backgroundColor: '#fff',
    marginTop: '40px',
  },
  titulo:{
    backgroundColor: '#554c59',
    color: '#fff',
    paddingBottom: theme.spacing(10),
    paddingTop: theme.spacing(4),
    justifyContent: 'center',
    textAlign:'center',
  },
  containerdatos:{
    margin: theme.spacing(5),
    widht: '300px',
    fontFamily: 'fontFamily',
  },
  Button:{
    marginTop: theme.spacing(2),
    backgroundColor:'#000',
    color: '#fff',
  },
  ContainerTabla:{
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(10),
  },
}));

const columnas = [
  {
    title:'CodEstudiante',
    field:'CodEstudiante'
  },
  {
    title:'Nombres',
    field:'Nombres'
  },
  {
    title:'ApPaterno',
    field:'ApPaterno'
  },
  {
    title:'ApMaterno',
    field:'ApMaterno'
  },
  {
    title:'Email',
    field:'Email'
  },
  {
    title:'Direccion',
    field:'Direccion'
  },
  {
    title:'Celular',
    field:'Celular'
  },
]
function validateEmail(email){
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}



const HomeComponent = () => {
  const classes = useStyles();
  const [books, setBooks] = useState([]); //table data
  const [CodEstudiante,setCodEstudiante] = useState("")
  const [Nombres,setNombres] = useState("")
  const [ApPaterno,setApellidoP] = useState("")
  const [ApMaterno,setApellidoM] = useState("")
  const [Email,setEmail] = useState("")
  const [Direccion,setDireccion] = useState("")
  const [Celular,setCelular] = useState("")

  useEffect(()=>{
    const getBooks = () =>{
      fetch('http://localhost:10000/api')
      .then(res=>res.json())
      .then(res=>setBooks(res))
    }
    getBooks()
  },[])

  const handleDelete = (aux) => {
    const requestInit = {
        method: 'DELETE'
    }
    fetch('http://localhost:10000/api/' + aux, requestInit)
    .then(res => res.text())
    .then(res => console.log(res))

    //setListUpdated(true)
  }
  const handleSubmit = () => {
        //validación de los datos
        if (CodEstudiante === '' || Nombres === '' || ApPaterno === '' || ApMaterno === '' || Email === '' || Direccion === '' || Celular === '') {
            alert('Todos los campos son obligatorios')
            return
        }
        let datos = {CodEstudiante,Nombres,ApPaterno,ApMaterno,Email,Direccion,Celular}
        //consulta
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        }
        fetch('http://localhost:10000/api', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //reiniciando state de libro
    }
  return(<div className={classes.main}>
    <Container maxWidth="lg">
    <Grid container spacing={1} className={classes.containers}>
        <ThemeProvider theme={themes}>
        <Grid item xs={12} className={classes.titulo}>
        <h1>Registro de Estudiantes</h1>
        </Grid>
        <Grid item xs={4}  align="center">
          <Grid container spacing={1} className={classes.containerdatos}>
          <Typography variant="h6" gutterBottom>
            Datos del Estudiante
          </Typography>
            <Grid item sm={12}>
                <TextField
                  required
                  id="CodEstudiante"
                  name="CodEstudiante"
                  label="Codigo de estudiante"
                  fullWidth
                  autoComplete="name"
                  onChange={(e)=>{
                    setCodEstudiante(e.target.value)
                  }}
                />
              </Grid>
            <Grid item sm={12}>
                <TextField
                  required
                  id="Nombres"
                  name="Nombres"
                  label="Nombres"
                  fullWidth
                  autoComplete="name"
                  onChange={(e)=>{
                    setNombres(e.target.value)}}
                />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="ApPaterno"
                name="ApPaterno"
                label="Apellido Paterno"
                fullWidth
                autoComplete="apellido"
                onChange={(e)=>{
                  setApellidoP(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                 required
                 id="ApMaterno"
                 name="ApMaterno"
                 label="Apellido Materno"
                 fullWidth
                 autoComplete="apellido2"
                 onChange={(e)=>{
                  setApellidoM(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="Email"
                name="Email"
                label="Email"
                fullWidth
                autoComplete="correo1"
                onChange={(e)=>{
                  setEmail(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="Direccion"
                name="Direccion"
                label="Dirección"
                fullWidth
                autoComplete="Direccion"
                onChange={(e)=>{
                  setDireccion(e.target.value)}}
              />
            </Grid>
            <Grid item sm={9}>
                <TextField
                  required
                  id="Celular"
                  name="Celular"
                  label="Celular"
                  fullWidth
                  autoComplete="celular"
                  onChange={(e)=>{
                    setCelular(e.target.value)}}
                />
              </Grid>
          <Grid item xs={12}>
          <Button className={classes.Button}
          type = "submit" onClick={handleSubmit}
          fullWidth variant="contained" color="primary" >Agregar</Button>
          </Grid>
          </Grid>
          </Grid>

        <Grid item xs={7}  align="center"className={classes.ContainerTabla}>
      <MaterialTable
       columns={columnas} 
       data={books} 
       title="Docentes Registrados"
       icons= {tableIcons}
       actions = {[{        
         icon:DeleteOutline,
         tooltip:'Eliminar Alumno',
         onClick: (e,rowData)=>{alert("¿Deseas eliminar al alumno "+rowData.CodEstudiante+" ?")
          let a = rowData.CodEstudiante
          handleDelete(a)
          }
      }
       ]}
       localization={{
         header:{
           actions:"Acciones",
         },
       }}
       />
    </Grid>
        <Grid item xs={3}></Grid>
        </ThemeProvider>
      </Grid>
      </Container>
  </div>)
};

const Home = MotionHoc(HomeComponent);

export default Home;
