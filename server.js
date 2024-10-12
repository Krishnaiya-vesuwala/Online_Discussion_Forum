const express=require('express');
const app=express();
const port=3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// connection
const db=require('./db')
// user registration and login route
const userRoute=require('./routes/user_route')
const categoryRoutes=require('./routes/category_routes')
const postRoutes=require('./routes/post_routes')
const likeRoutes=require('./routes/like_routes')
const CommentRoutes=require('./routes/comment_route')

app.use('/user',userRoute)
app.use('/user',categoryRoutes)
app.use('/user',postRoutes)
app.use('/user',likeRoutes)
app.use('/user',CommentRoutes)

app.listen(port,()=>{
    console.log(`server run at http://localhost:${port}`);
})
