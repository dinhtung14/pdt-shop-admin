import React from 'react'
import './statusCard.scss'

export default function StatusCard({card}) {
    return (
        <div className={`status-card bg-${card.color}`}>
            <div className={`status-card__icon color-${card.color}`}>
                {card.icon}
            </div>
            <div className="status-card__info">
                <h4>{card.count}</h4>
                <p>{card.title}</p>
            </div>
        </div>
    )
}
