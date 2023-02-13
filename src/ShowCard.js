import React, { useRef, useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import "./ShowCard.css";

function ShowCard() {
    const [list, setList] = useState([]);
    fetch('https://netflix-data.p.rapidapi.com/search/?query=&limit_titles=4&limit_suggestions=1', {
      "method": "GET",
      "headers": {
        'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
        'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
      }
    })
    .then(response => response.json())
    .then((json) => {
        const convert_list = json.titles;
        setList(convert_list);
    })
    .catch(err => {
      console.log(err);
    })
    return(
        <div className="list">
            <div className="wrapper">
                <div className="container">
                    {list.map((show) => (
                        <Card sx={{width: 225, height: 120, ml: 1}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={show.jawSummary.backgroundImage.url}
                                    height='110'
                                    alt="show image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle1">
                                        {show.jawSummary.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
        // <Grid container spacing={3}>
        //     <Grid container item spacing={2}>
        //     {list.map((show) => (
        //         <Grid item sx={{ml: 1}} key={show.jawSummary.id}>
        //             <Card sx={{maxWidth: 345}}>
        //                 <CardActionArea>
        //                     <CardMedia
        //                         component="img"
        //                         height="140"
        //                         image={show.jawSummary.backgroundImage.url}
        //                         alt="show image"
        //                     />
        //                     <CardContent>
        //                         <Typography gutterBottom variant="subtitle1">
        //                             {show.jawSummary.title}
        //                         </Typography>
        //                     </CardContent>
        //                 </CardActionArea>
        //             </Card>
        //         </Grid>
        //     ))}
        //     </Grid>
        // </Grid>
    );
}

export default ShowCard;