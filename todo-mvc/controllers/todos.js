const journalEntry = require('../models/Item')

module.exports = {
    getItems: async (req,res)=>{
        try{
            const todoItems = await journalEntry.find()
            const itemsLeft = await journalEntry.countDocuments({completed: false})
            
            //res.send({todos: todoItems, left: itemsLeft})

            res.send([...todoItems])
            //res.render('todos.ejs', {todos: todoItems, left: itemsLeft})
        }catch(err){
            console.log(err)
        }
    },
    getItemsTest: async (req, res) => {
        try{
        const journalItems = await journalEntry.find();
        const itemsLeft = await journalEntry.countDocuments({completed:false}) 
        res.render('todos.ejs', {todos: journalItems, left: itemsLeft})
        }
        catch (e){
            console.log(e)
        }


    },
    createTodo: async (req, res)=>{
        try{
            await journalEntry.create({todo: req.body.todoItem, text: req.body.todoItem, reminder: false, completed: false})
            console.log('Todo has been added!')
            res.send
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await journalEntry.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await journalEntry.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await journalEntry.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    