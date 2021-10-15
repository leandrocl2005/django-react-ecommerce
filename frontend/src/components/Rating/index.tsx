import React from 'react'

type RatingProps = {
    value: number;
    text: string;
    color: string;
}

type StarProps = {
    value: number;
    firstValue: number;
    secondValue: number;
    color: string;
}

const Star = ({value, firstValue, secondValue, color}: StarProps) => {
    return (
        <span>
            <i style={{ color }} className={
                value >= firstValue
                    ? 'fas fa-star'
                    : value >= secondValue
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
            }>

            </i>
        </span>
    )
}

function Rating({ value, text, color }: RatingProps) {
    return (
        <div className="rating">
            <Star value={value} firstValue={1} secondValue={0.5} color={color} />
            <Star value={value} firstValue={2} secondValue={1.5} color={color} />
            <Star value={value} firstValue={3} secondValue={2.5} color={color} />
            <Star value={value} firstValue={4} secondValue={3.5} color={color} />
            <Star value={value} firstValue={5} secondValue={4.5} color={color} />
            <br/>
            <span>{text && text}</span>
        </div>
    )
}

export default Rating