import React, { useContext } from 'react';
import { ControlConfig, ControlProps, SectionConfig } from '../types';
import { ControlBuilder } from '../builder';

export const FreeFormControl: React.FC<ControlProps> = ({ config, parentPath }) => {
    let dataPath = '';

    if (config.dataPath) {
        dataPath = config.dataPath;
    } else if (config.id) {
        dataPath = `${parentPath}.${config.id}`;
    } else {
        dataPath = parentPath;
    }

    return (
        <div className="row g-3">
            {config.controls?.map((control: ControlConfig) => {
                return (
                    <div key={`FreeForm-${dataPath}.${control.id ? control.id : control.controlRefName}`} className={`form-group ${control.width}`}>
                        <ControlBuilder key={`${dataPath}.${control.id}`} config={control} parentPath={dataPath} />
                    </div>
                );
            })}
        </div>
    );
};
