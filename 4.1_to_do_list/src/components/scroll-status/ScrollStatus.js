import React, { useState, useEffect } from 'react';
import './ScrollStatus.scss';

const ScrollStatus = () => {
    const [progress, setProgress] = useState(0);

    const scrollHandler = () => {
        const value = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        setProgress(value);
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };

    }, []);

    return <div className="ScrollStatus">
        <div className="ScrollStatus-progress" style={{ width: `${progress * 100}%` }}></div>
    </div>;


};

/*export class ScrollStatus extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            progress: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    };

    componentDidUpdate() {
        document.title = `${this.state.progress}`;
    }

    handleScroll = () => {
        const value = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        this.setState({ progress: value });
    };

    render() {
        return (
            <div className="ScrollStatus">
                <div className="ScrollStatus-progress" style={{ width: `${this.state.progress * 100}%` }}></div>
            </div>
        );
    }
}*/

export default ScrollStatus;