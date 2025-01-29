import React from 'react';
import { ControlProps, SectionConfig } from '../types';
import { FreeFormControl } from './FreeFormControl';
import { SectionLayoutFactory } from '../builder';

export const SectionControl: React.FC<ControlProps> = ({ config, parentPath }) => {
    return <>Under Construction!!</>;
    // const section = state.config?.sectionRepository.find(
    //     (section: SectionConfig) => section.sectionRefName === config.controlRefName
    // ) as SectionConfig;

    // return (
    //     <div className={`form-group ${config.widthStyle}`}>
    //         <SectionLayoutFactory key={`section_${config.id}`} type={section.type} title={section.title} widthStyle={section.widthStyle}>
    //             <FreeFormControl config={config} parentPath={parentPath} />
    //         </SectionLayoutFactory>
    //     </div>
    // );
};
