const express = require('express')
const app = express()
const students = require('./students.json')
const morgan = require('morgan');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/students', (req, res) => {
    function callback(input){
        let studentFirstName = input.firstName.toLowerCase();
        let studentLastName = input.lastName.toLowerCase();
        let nameToMatch = req.query.search.toString().toLowerCase()
        return (studentFirstName === nameToMatch || studentLastName === nameToMatch)
    }
    
    if(Object.keys(req.query).length > 0){
        var list = (students.filter(callback)).map((student)=> `${student.firstName}, ${student.lastName}`)
     } else{
        var list = students.map((student)=> `${student.firstName}, ${student.lastName}`)
    }
    res.send(list)
})

app.get('/students/:studentId', (req, res) => {
    function callback(input){
        let student = input.studentId
        let idToMatch = parseInt(req.params.studentId)
        return student === idToMatch
    }
    let student = students.filter(callback)
    if (student.length === 0){
        student = {};
    } else {
        student = student[0]
    }
    res.send(student)
})

app.get('/grades/:studentId', (req, res) => {
    function callback(input){
        let student = input.studentId
        let idToMatch = parseInt(req.params.studentId)
        return student === idToMatch
    }
    let grades = students.filter(callback)[0]?.grades
    res.send(grades)
})

app.post('/grades', (req, res) => {
    if(typeof req.body.grade === 'number' && typeof req.body.studentId === 'number'){
        res.send('success')
    } else {
        res.send('Please post valid data in the form of {grade: <number>, studentId: <number>}')
    }
})

app.post('/register', (req, res) => {
    if(typeof req.body.username === 'string' && typeof req.body.email === 'string'){
        res.send('success')
    } else {
        res.send('Please post valid data in the form of {username: <string>, email: <string>}')
    }
})

const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))