const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM tdocente', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO tdocente set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('docente added!')
        })
    })
})

routes.delete('/:CodDocente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM tdocente WHERE CodDocente = ?', [req.params.CodDocente], (err, rows)=>{
            if(err) return res.send(err)
            return res.send('User delete!')
        })
    })
})

routes.put('/:CodDocente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE tdocente set ? WHERE CodDocente = ?', [req.body, req.params.CodDocente], (err, rows)=>{
            if(err) return res.send(err)
            return res.send('User modified!')
        })
    })
})

module.exports = routes