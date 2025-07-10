import React from 'react'

const Shimmer = ({ width = 500, height = 300, className = '' }) => {
    return (
        <div 
            className={`relative overflow-hidden rounded-lg shadow-lg ${className}`}
            style={{ width, height }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2a0f02] via-[#712500] to-[#3d1502]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer-animation"></div>
            </div>
        </div>
    )
}

export default Shimmer

// Add this CSS to your global styles or component styles
const shimmerStyles = `
@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.shimmer-animation {
    animation: shimmer 2s infinite ease-in-out;
}
`

