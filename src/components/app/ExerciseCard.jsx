import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';


export default function ExerciseCard({ exercise, onAdd }) {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={exercise.gif_url}
        alt={exercise.name}
        loading="lazy"
        objectFit="contain"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {exercise.name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {exercise.category}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="Aggiungi">
            <AddBoxIcon sx={{ height: 38, width: 38 }} onClick={() => onAdd(exercise)} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}