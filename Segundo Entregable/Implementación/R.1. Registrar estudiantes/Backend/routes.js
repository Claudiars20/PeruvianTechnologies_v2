const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM testudiante', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO testudiante set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('estudiante added!')
        })
    })
})

routes.delete('/:CodDocente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM testudiante WHERE CodEstudiante = ?', [req.params.CodDocente], (err, rows)=>{
            if(err) return res.send(err)
            return res.send('User delete!')
        })
    })
})

routes.put('/:CodDocente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE testudiante set ? WHERE CodEstudiante = ?', [req.body, req.params.CodEstudiante], (err, rows)=>{
            if(err) return res.send(err)
            return res.send('User modified!')
        })
    })
})

module.exports = routes