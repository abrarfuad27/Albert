declare module 'react-katex' {
    import { ComponentType, CSSProperties } from 'react';
  
    export interface KatexProps {
      children?: string;
      math?: string;
      errorColor?: string;
      renderError?: (error: Error) => React.ReactNode;
      settings?: object;
      style?: CSSProperties;
    }
  
    export const InlineMath: ComponentType<KatexProps>;
    export const BlockMath: ComponentType<KatexProps>;
  }
  