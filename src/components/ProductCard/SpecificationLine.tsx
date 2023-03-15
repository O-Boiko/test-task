import React from 'react';
import Typography from '@mui/material/Typography';
import s from './styles.module.scss';

interface SpecificationLineProps {
  title: string;
  value: string;
}

export const SpecificationLine: React.FC<SpecificationLineProps> = ({
  title,
  value
}) => (
  <div className={s.parameter}>
    <Typography component="span" className={s.title}>
      {title}
    </Typography>
    <Typography component="span" className={s.value}>
      {value}
    </Typography>
  </div>
);
