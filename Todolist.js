const express = require('express')

const app =express()
app.use(express.json())

const PORT = process.env.PORT || 3010

require('dotenv').config()

let ToDo_List=[
    {
        id: 1,
        task: "To Complete the blog assingment",
        status : "Completed",
        date : "2024-09-06",

    },
    {
        id :2,
        task: "Create a java bank project",
        status :"Viewed / Not Started ",
        date :"2024-10-2",
    }

]

app.get('/Todolist',(req,res)=>{
    res.json(ToDo_List)
})

app.get('/Todolist/:id',(req,res)=>{
    let id =req.params.id
    let found=false

    for(let todo of ToDo_List){
        if(todo['id']==id){
            res.json(todo)
            found=true
            break
        }

    }
    if(found==false){
        res.json({
            message:"No List Found With id : "+id
        })
    }

})


app.post('/tocreate',(req,res)=>{
    let data = req.body

    let newtodo_list={
        id: ToDo_List[ ToDo_List.length -1 ] ["id"] + 1,
        task : data.task,
        status : data.status,
        date : data.date
    }
    ToDo_List.push(newtodo_list)
    res.json({
        message : "List Created Successfully"
    })


})

app.post('/delto/:id',(req,res)=>{
    let id = req.params.id
    for(let i=0;i<ToDo_List.length;i++)
    {
        if(ToDo_List[i]['id']==id)
        {
            ToDo_List.splice(i,1)
        }
    }
    res.json({
        message : "List Deleted Successfully"
    })
})


app.post('/status/:id',(req,res)=>{
    let id = req.params.id
    let data =req.body
    for(let i=0;i<ToDo_List.length;i++)
    {
        if(ToDo_List[i]['id']==id)
        
        {
            ToDo_List[i]['status'] = data.status ? data.status : ToDo_Listt[i]['status']
            ToDo_List[i]['date']=new Date()

            break;
        }

    }

    res.json({
        message:"Status Updated Successfully"
    })


})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
