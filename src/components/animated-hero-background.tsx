'use client';

import { BarChart, LineChart, PieChart, Database, AreaChart, GitBranch } from 'lucide-react';
import { useMemo } from 'react';

const icons = [
    { icon: BarChart, size: 'h-8 w-8' },
    { icon: LineChart, size: 'h-10 w-10' },
    { icon: PieChart, size: 'h-6 w-6' },
    { icon: Database, size: 'h-12 w-12' },
    { icon: AreaChart, size: 'h-9 w-9' },
    { icon: GitBranch, size: 'h-7 w-7' },
];

const animationStyles = [
    'animate-[float_8s_ease-in-out_infinite]',
    'animate-[float_10s_ease-in-out_infinite_2s_reverse]',
    'animate-[float_12s_ease-in-out_infinite]',
    'animate-[float_9s_ease-in-out_infinite_1s]',
    'animate-[float_11s_ease-in-out_infinite_3s_reverse]',
    'animate-[float_13s_ease-in-out_infinite]',
];

export default function AnimatedHeroBackground() {

    const particles = useMemo(() => Array.from({ length: 12 }).map((_, i) => {
        const Icon = icons[i % icons.length].icon;
        const size = icons[i % icons.length].size;
        const animation = animationStyles[i % animationStyles.length];
        const top = `${Math.random() * 80 + 10}%`;
        const left = `${Math.random() * 90 + 5}%`;
        const opacity = `${Math.floor(Math.random() * 4) + 2}0%`; // 20% to 50%
        return {
            id: i,
            Icon,
            size,
            animation,
            style: { top, left, opacity },
        }
    }), []);

    return (
        <div aria-hidden="true" className="absolute inset-0 top-0 z-0 h-full w-full bg-accent/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
             <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(15deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
            `}</style>
            <div className="relative h-full w-full">
                {particles.map(particle => (
                    <particle.Icon
                        key={particle.id}
                        className={`absolute text-primary/30 ${particle.size} ${particle.animation}`}
                        style={particle.style}
                    />
                ))}
            </div>
        </div>
    )
}
