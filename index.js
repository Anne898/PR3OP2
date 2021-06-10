const express = require("express");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const {sequelize} = require("./config/db");
const {Post} = require("./models/post.model");
const {Comment} = require("./models/comment.model");

const app = express();
const port = 3000;

Post.hasMany(Comment);

sequelize.sync({});
//sequelize.sync({force: true});
app.set("view engine", "ejs");

// Rutas
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {

    (async () => {

       
        let posts = await Post.findAll({
            include: Comment

        });

       let comments = await Comment.findAll();

       /* let comments = await Post.findAll({
            include: Comment,

        });*/

        console.log("COments:", posts);

        res.render("pages/index", {
            posts: posts,
            comments:comments,

        });

    })();


});



app.post("/create", (req, res) => {    

    console.log("Name:", req.body.name);
    console.log("Post", req.body.postContent);

    let name = req.body.name;
    let postContent = req.body.postContent;

    (async () => {
    
        let post = await Post.create({
            name: name,
            postContent: postContent,

        });

        res.redirect('/');

    })();
});

app.get('/detail/:id', (req, res, next) => {
    let id = req.params.id;

    (async () => {
        let post = await Post.findByPk(id);

        let Comments = await Comment.findAll({
            where: {
                postId: id,
            },
        });

        res.render('pages/detail', {
            post: post,
            Comments: Comments,
        });

    })();
});

app.post('/Comments/create', (req, res, next) => {
    let postId = req.body.postId;
    let username = req.body.username;
    let commentContent = req.body.commentContent;

    (async () => {
        await Comment.create({
            username: username,
            commentContent: commentContent,
            postId: postId,
        });

        res.redirect('/detail/' + postId);

    })();
});



// Not Found
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    let message = err.message;
    let error = err;

    res.status(err.status || 500);
    res.render("pages/error", {
        message,
        error
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});