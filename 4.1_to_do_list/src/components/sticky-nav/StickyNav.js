import React, { useEffect, useRef } from 'react';
import './StickyNav.scss';

const StickyNav = ({children}) => {
    const navRef = useRef(null);
    let isSetSticky = useRef(false);

    const handleScroll = () => {
        const header = navRef.current;
        const isSticky = window.pageYOffset > header.offsetTop;

        if (isSticky && !isSetSticky.current) {
            header.style.width = `${header.clientWidth}px`;
        }

        header.classList.toggle('sticky', isSticky);

        isSetSticky.current = isSticky;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="StickyNav" ref={navRef}>
            {children}
        </div>
    )
};

export default StickyNav;