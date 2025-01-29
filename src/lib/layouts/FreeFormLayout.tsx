import React from 'react';

export const FreeFormLayout: React.FC<{ title: string; widthStyle: string; children: React.ReactNode }> = ({ widthStyle, children }) => {
    return <div className={`row ${widthStyle}`}>{children}</div>;
};
