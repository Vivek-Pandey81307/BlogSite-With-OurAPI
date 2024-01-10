import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
dotenv.config();
const app = express();

const port =process.env.PORT || 3100;
const API_URL = process.env.API_URL_VERCEL;
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.get('/',async (req,res)=>{
    try{
        const req_posts = await axios.get(`${API_URL}/posts`);
        res.render('index.ejs',{posts : req_posts.data})

    }catch(error){console.log(error)}
    
})
app.get('/new',(req,res)=>{
   res.render('modify.ejs',{heading : 'New Post',submit : 'Create New Post'})
})

app.get('/edit/:id',async(req,res)=>{
    try{
        const id = parseInt(req.params.id)
        const response = await axios.get(`${API_URL}/posts/${id}`)
        res.render('modify.ejs',{heading :'Edit Post',post:response.data,submit : 'Update Post'})

    }catch(error){console.log(error)}
})

app.post('/api/posts/:id',async(req,res)=>{
    try{
        const postId = parseInt(req.params.id);
        await  axios.patch(`${API_URL}/posts/${postId}`,req.body)
        res.redirect('/');
        
    }catch(error){console.log(error)}
})
app.post('/api/posts',async(req,res)=>{
    try{
        await axios.post(`${API_URL}/posts`,req.body);
        res.redirect('/');
    }catch(error){
        console.log(error)
    }
})

app.get('/api/posts/delete/:id',async(req,res)=>{
    try{
        const id = parseInt(req.params.id)
        await axios.delete(`${API_URL}/posts/${id}`)
        res.redirect('/');
    }catch(error){
        console.log(error)
    }
})
app.listen(port,()=>{
    console.log(`Backend server is running on http://localhost:${port}`)
})