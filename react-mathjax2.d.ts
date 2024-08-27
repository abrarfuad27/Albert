declare module 'react-mathjax2' {
    import * as React from 'react';
  
    interface MathJaxContextProps {
      input: 'tex' | 'ascii';
      children: React.ReactNode;
    }
  
    interface MathJaxNodeProps {
      children: string;
    }
  
    export class Context extends React.Component<MathJaxContextProps> {}
    export class Node extends React.Component<MathJaxNodeProps> {}
  }