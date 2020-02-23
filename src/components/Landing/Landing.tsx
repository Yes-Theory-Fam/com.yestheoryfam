import * as React from "react";
import { hot } from 'react-hot-loader';

import ComingSoon from '../ComingSoon/ComingSoon';

export interface LandingProps { compiler: string; framework: string; }

class Landing extends React.Component<LandingProps, {}> {
    render() {
        return <ComingSoon />;
    }
}

export default hot(module)(Landing);
