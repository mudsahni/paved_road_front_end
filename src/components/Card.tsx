// src/components/Card.tsx
import React from 'react';
import { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ title, subtitle, description, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Card;