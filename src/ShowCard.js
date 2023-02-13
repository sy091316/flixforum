import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, CardMedia } from "@mui/material";

function ShowCard() {
    const [list, setList] = useState([]);
    // fetch('https://netflix-data.p.rapidapi.com/search/?query=&limit_titles=2&limit_suggestions=1', {
//       "method": "GET",
//       "headers": {
//         'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
//         'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       // holds a list of stuff pulled from API
//       const list = data.titles;
//       list.map((item) => {
//         // only continue if data is a show
//         if (item.summary.type == 'show') {
//           console.log("this is a show");
//           console.log(item);
//           const name = item.jawSummary.title;
//           const poster = item.jawSummary.backgroundImage.url;
//           const show = `<li><img src="${poster}"> <h2>${name}</h2></li>`
//           document.querySelector('.movies').innerHTML += show;

//         }
//       })
//     })
//     .catch(err => {
//       console.log(err);
//     })
    return(
        <Card sx={{maxWidth: 345}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    alt="show image"
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle1">
                        Name of Show
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ShowCard;