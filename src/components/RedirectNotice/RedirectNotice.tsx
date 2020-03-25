import * as React from 'react';
import { Link } from 'react-router-dom';
import './Redirect.scss';

interface RedirectNoticeProps {
    url: string;
}

const RedirectNotice: React.FC<RedirectNoticeProps> = ({url}) => {
    return (
        <div className="discordAuth column-center">
            <p>You should have been redirected already!</p>
            <p>Click <Link to={url}>here</Link> to get to where you should have went.</p>
        </div>
    );
}

export default RedirectNotice;
