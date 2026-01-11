declare module 'react-usa-map' {
    import { ComponentType, MouseEvent } from 'react';

    export interface USAMapProps {
        onClick?: (event: { target: { dataset: { name: string } } }) => void;
        onUSAStateMouseEnter?: (event: MouseEvent<SVGPathElement>) => void;
        onUSAStateMouseLeave?: (event: MouseEvent<SVGPathElement>) => void;
        width?: number | string;
        height?: number | string;
        title?: string;
        defaultFill?: string;
        customize?: Record<string, { fill?: string; stroke?: string; strokeWidth?: number }>;
    }

    const USAMap: ComponentType<USAMapProps>;
    export default USAMap;
}
