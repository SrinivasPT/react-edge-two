import React from 'react';
import { SectionLayoutFactory } from '../builder';
import { ControlProps } from '../types';
import { FreeFormControl } from './FreeFormControl';

export const SearchCriteriaControl: React.FC<ControlProps> = ({ config, parentPath }) => {
    return (
        <div className={`form-group ${config.width}`}>
            <SectionLayoutFactory key={`section_${config.id}`} type={config.type} title={config.title} widthStyle={config.width as string}>
                <>
                    <FreeFormControl config={config} parentPath="searchCriteria" />
                    {/* <ButtonControl /> */}
                </>
            </SectionLayoutFactory>
        </div>
    );
};
