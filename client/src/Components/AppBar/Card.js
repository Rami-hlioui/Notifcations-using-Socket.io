import '../card.css'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { io } from "socket.io-client";

const socket=io.connect("http://localhost:5000")


export default function PostCard({props,user}) {

    const [likedpost,setLiked]=useState(false)
    const handleLike=()=>{
        setLiked(true)
        socket.emit("liked_post",{message:`${user} liked ${props.username} post`})
    }

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

  return (
    <Card className='Card' sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={
          <Avatar {...stringAvatar(props.username)} sx={{ bgcolor: red[500] }} aria-label="recipe" />    
        }
        align="left"
        title={props.username}
        subheader={props.Date}
      />
      <CardMedia
        component="img"
        height="350"
        image={props.postImage}
        alt="Paella dish"
      />
      <CardContent>  
        <Typography align='left'  variant="body1" color="text.secondary">
          {props.postDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={()=>{handleLike()}} aria-label="add to favorites" >
          {likedpost ?(<FavoriteIcon />):(<FavoriteBorderIcon />)}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
   
      </CardActions>
      
    </Card>
  );
}
