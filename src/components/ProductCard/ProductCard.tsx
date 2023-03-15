import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { SpecificationLine } from './SpecificationLine';
import { Product } from '../../store/products/types';
import s from './styles.module.scss';

interface ProductCardProps extends Product {}

export const ProductCard: React.FC<ProductCardProps> = (props) => (
  <Card className={s.card} component="a" href="." target="_blank">
    <CardMedia
      component="img"
      alt="product pictuare"
      className={s.icon}
      image={props.icon}
    />
    <CardContent className={s.content}>
      <Typography className={s.title} gutterBottom variant="h6" component="h6">
        {props.title}
      </Typography>
      <Typography variant="body2" className={s.description}>
        {props.description}
      </Typography>
      <SpecificationLine title="Color" value={props.color} />
      <SpecificationLine
        title="Price"
        value={`${props.currency}${props.price}`}
      />
      <SpecificationLine title="Raiting" value={props.rating.toString()} />
    </CardContent>
  </Card>
);
