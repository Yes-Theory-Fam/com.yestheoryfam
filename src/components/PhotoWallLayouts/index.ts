import { PhotoWallLayoutProps, LayoutProps } from './PhotoWallLayoutTypes';
import OneFourLayout, { props as OFLProps } from './OneFourLayout/OneFourLayout';
import DoubleRowLayout, { props as DRLProps } from './DoubleRowLayout/DoubleRowLayout';
import VerticalLeftLayout, { props as VLLProps } from './VerticalLeftLayout/VerticalLeftLayout';
import DoubleColumnLayout, { props as DCLProps } from './DoubleColumnLayout/DoubleColumnLayout';
import DoubleVerticalLayout, { props as DVLProps } from './DoubleVerticalLayout/DoubleVerticalLayout';

const layouts: Array<{ LayoutComponent: React.FC<LayoutProps>, props: PhotoWallLayoutProps }> =
    [
        { LayoutComponent: OneFourLayout, props: OFLProps },
        { LayoutComponent: DoubleRowLayout, props: DRLProps },
        { LayoutComponent: VerticalLeftLayout, props: VLLProps },
        { LayoutComponent: DoubleColumnLayout, props: DCLProps },
        { LayoutComponent: DoubleVerticalLayout, props: DVLProps },
    ];

export default layouts;

export { PhotoWallLayoutProps, OneFourLayout };
