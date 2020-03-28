import * as React from 'react';
import './PhotoWrapper.scss';

const PhotoWrapper: React.FC<{className: string, src: string}> = ({className, src}) => {
    return <div className={className}>
        <img className="fit-container" src={src} />
    </div>
}

export default PhotoWrapper;
