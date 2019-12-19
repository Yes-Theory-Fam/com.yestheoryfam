import * as React from "react";
import { hot } from 'react-hot-loader';

export interface LandingProps { compiler: string; framework: string; }

export class Landing extends React.Component<LandingProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

export default hot(module)(Landing);
