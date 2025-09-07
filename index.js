const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
app.use(cors());

let db;

if(process.env.JAWSDB_URL) {
    db = createConnection.mysql.createConnection(process.env.JAWSDB_URL);
}else {
    db = mysql.createConnection({
        user: 'admin',
        host: 'flixforum-db.cdwyjlv3wddo.us-west-2.rds.amazonaws.com',
        password: 'FlixForumDB',
        port: '3306',
        database: 'LoginSystem',
    });
}


// Credit for the password encryption logic found here:
// https://www.youtube.com/watch?v=Ud5xKCYQTjM

app.post("/register", async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
        [username, email, hashedPassword], 
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.status(201).send(result);
        });
    } catch {
        res.status(500).send();
    }
    
});

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, result) => {
            if (err) {
                res.send({err:err});
            }
            // console.log(result)
            if (result.length > 0) {
                if (await bcrypt.compare(password, result[0].password)){
                    res.send(result);
                } else {
                    res.send({message: "Wrong username/password combination!"});
                }
            } else {
                res.send({message: "No such username."});
            }
        });
    } catch {
        res.status(500).send();
    }
});

// retrieves the total amount of likes or dislikes for a specific post
app.post("/totalLikes", async (req, res) => {
    try {
        const post_id = req.body.post_id;
        db.query(
        'SELECT likes FROM posts WHERE post_id = ?',
        [post_id],
        (err, result) => {
            if (err) {
                res.send({err:err});
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: "Couldn't retrieve likes"});
            }
        });
    } catch {
        res.status(500).send();
    }
});
app.post("/totalDislikes", async (req, res) => {
    try {
        const post_id = req.body.post_id
        db.query(
        'SELECT dislikes FROM posts WHERE post_id = ?',
        [post_id],
        (err, result) => {
            if (err) {
                res.send({err:err});
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: "Couldn't retrieve dislikes"});
            }
        });
    } catch {
        res.status(500).send();
    }
});

app.post("/addLike", async (req, res) => {
    try {
        const post_id = req.body.post_id;
        db.query(
        "UPDATE posts SET likes = likes + 1 WHERE post_id = ?", 
        [post_id], 
        (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        });
    } catch {
        res.status(500).send();
    }
    
});

app.post("/subLike", async (req, res) => {
    try {
        const post_id = req.body.post_id
        db.query(
            "UPDATE posts SET likes = likes - 1 WHERE post_id = ?", 
            [post_id], 
            (err, result) => {
                if (err) {
                    console.log(err)
                }
        });
    } catch {
        res.status(500).send();
    }
    
});

app.post("/addDislike", async (req, res) => {
    try {
        const post_id = req.body.post_id
        db.query(
            "UPDATE posts SET dislikes = dislikes + 1 WHERE post_id = ?", 
            [post_id], 
            (err, result) => {
                if (err) {
                    console.log(err)
                }
                console.log(result)
        });
    } catch {
        res.status(500).send();
    }
});

app.post("/subDislike", async (req, res) => {
    try {
        const post_id = req.body.post_id
        db.query(
            "UPDATE posts SET dislikes = dislikes - 1 WHERE post_id = ?", 
            [post_id], 
            (err, result) => {
                if(err) {
                    console.log(err)
                }
                console.log(result)
        });
    } catch {
        res.status(500).send();
    }
    
});

app.post("/buttonStatus", async (req, res) => {
    try {
        const forum_id = req.body.forum_id
        const post_id = req.body.post_id
        const user_id = req.body.user_id
        db.query(
            'SELECT liked, disliked FROM post_likes WHERE forum_id = ? AND post_id = ? AND user_id = ?',
            [forum_id, post_id, user_id],
            (err, result) => {
                if (err) {
                    // if the post_id isn't there, then there should be an error
                    res.send({message: "Couldn't retrieve information"});
                }
                else if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send({message: "Couldn't retrieve information"});
                }
            });
    } catch {
        res.status(500).send();
    }
});

app.post("/updatePostsLikes", async (req, res) => {
    try {
        const like_value = req.body.like_value
        const dislike_value = req.body.dislike_value
        const post_id = req.body.post_id
        const forum_id = req.body.forum_id
        db.query(
            "UPDATE post_likes SET liked = ?, disliked = ? WHERE forum_id = ? AND post_id = ?", 
            [like_value, dislike_value, forum_id, post_id], 
            (err, result) => {
                if(err) {
                    console.log(err)
                }
                console.log(result)
            });
    } catch {
        res.status(500).send();
    }
});

app.post("/insertPost", async (req, res) => {
    try {
        const post_id = req.body.post_id
        const user_id = req.body.user_id
        const forum_id = req.body.forum_id
        const like_value = req.body.like_value
        const dislike_value = req.body.dislike_value

        db.query(
        "INSERT IGNORE INTO post_likes (forum_id, post_id, user_id, liked, disliked) VALUES (?, ?, ?, ?, ?)", 
        [forum_id, post_id, user_id, like_value, dislike_value], 
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.status(201).send(result);
        });
    } catch {
        res.status(500).send();
    }
    
});

app.post("/newpostmodal", async (req, res) => {
    try {
        const showtitle = req.body.showtitle;
        const season = req.body.season;
        const episode = req.body.episode;

        const userid = req.body.userid;
        const posttitle = req.body.posttitle;
        const postcontent = req.body.postcontent;

        var dbforum_id = "";

        db.query(
            // check if the forum exists in the forums table to see if we need to deploy into both 
            //forums and posts table or just the posts table 
            "SELECT forum_id FROM forums WHERE title = ? AND season = ? AND episode = ?",
            [showtitle, season, episode], 
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result.length === 0) {
                        //console.log("forum not in database yet");
                        // push to the forums table becuase this is the first post under this forum
                        db.query(
                            "INSERT INTO forums (title, season, episode) VALUES (?, ?, ?)",
                            [showtitle, season, episode],
                            (err, result) => {
                                if(err) {
                                    console.log(err);
                                }
                            });
                        // grab from the forums table the newly added forum_id
                        db.query(
                            "SELECT forum_id FROM forums WHERE title = ? AND season = ? AND episode = ?",
                            [showtitle, season, episode],
                            (err, result) => {
                                if(err) {
                                    console.log(err);
                                }
                                dbforum_id = result[0].forum_id;
                                // insert into posts using the forum_id
                                db.query(
                                    "INSERT INTO posts (user_id, forum_id, title, content) VALUES (?, ?, ?, ?)",
                                    [userid, dbforum_id, posttitle, postcontent],
                                    (err, result) => {
                                        if(err) {
                                            console.log(err);
                                        }
                                    }
                                );
                            }
                        );
                    }
                    else {
                        dbforum_id = result[0].forum_id;
                        // console.log("forum in database and forumID = ", dbforum_id);
                        // insert into posts table because the forum_id exists already, it is not the first post under this forum
                        db.query(
                        "INSERT INTO posts (user_id, forum_id, title, content) VALUES (?, ?, ?, ?)",
                        [userid, dbforum_id, posttitle, postcontent],
                        (err, result) => {
                            if(err) {
                                console.log(err);
                            }
                        });
                    }
                }
            });
    } catch {
        res.status(500).send();
    }
});

app.get("/forum", async (req, res) => {
    try {
        const showtitle = req.query.showtitle_forum;
        const season = req.query.season_forum;
        const episode = req.query.episode_forum;
        var posts_list = [{
                title: "",
                content: "",
                user_id: 0,
                user_name: ""
            }];

        db.query(
            "SELECT forum_id FROM forums WHERE title = ? AND season = ? AND episode = ?",
            [showtitle, season, episode], 
            (err, result) => {
                if (err) {
                    console.log("sth went wrong in the first if ");
                }
                else {
                    if (result.length === 0){
                        res.status(200).send();
                        return;
                    }
                    const result_forum_id = result[0].forum_id;
                    db.query(
                        "SELECT title, post_id, content, user_id FROM posts WHERE forum_id = ?",
                        [result_forum_id],
                        (err, result) => {
                            if(err) {
                                console.log("sth went wrong in the second if for title content user id query");
                            } else {
                                result.map((posts) => (
                                    //insert into posts list here 
                                    posts_list.push({forum_id:result_forum_id,post_id:posts.post_id,title:posts.title,content:posts.content,user_id:posts.user_id, user_name:""})
                                ))
                                // once every post is pushed into the posts_list
                                // pull every username and userId from users table 
                                // loop through posts_list and and user result from query to update username based on id 
                                db.query (
                                    "SELECT username, id FROM users",
                                    (err, result) => {
                                        if (err) {
                                            console.log ("something went wrong in username query")
                                        }
                                        else {
                                            for (var i = 0; i < posts_list.length; i++) {
                                                for (var j = 0; j < result.length; j++) {
                                                    if (posts_list[i].user_id == result[j].id) {
                                                        posts_list[i].user_name = result[j].username;
                                                    }
                                                }
                                            }
                                        }
                                        res.status(200).send(posts_list);
                                    } 
                                )
                            }
                        }
                    )
                }
            }
        )
    } 
    catch {
        res.status(500).send();
    }
});

app.listen(3001, () => {
    console.log("running server");
})