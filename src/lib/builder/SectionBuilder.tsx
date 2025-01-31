import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import { evaluateExpression, getWidthStyle, isNil } from '../common';
import { PageContext } from '../context';
import { ControlConfig, SectionConfig } from '../types';
import { ControlBuilder } from './ControlBuilder';
import { SectionLayoutFactory } from './SectionLayoutBuilder';

export const SectionBuilder: React.FC<{ sectionRefName: string; parentPath?: string }> = ({ sectionRefName, parentPath = '' }) => {
    const { state } = useContext(PageContext);
    const section = state.config?.sectionRepository.find((item) => item.refName === sectionRefName) as SectionConfig;

    let sectionDataPath = '';

    if (section?.dataPath) {
        sectionDataPath = section.dataPath;
    } else if (!isNil(parentPath)) {
        sectionDataPath = `${parentPath}.${section?.sectionKey}`;
    }

    if (section.typeCode === 'SEARCH_CRITERIA') {
        sectionDataPath = 'searchCriteria';
    }

    const visibleControls = section.controls.filter((control: ControlConfig) => {
        return !control.hideExpression || !evaluateExpression(control.hideExpression as string, state.data);
    });

    return (
        <SectionLayoutFactory key={sectionDataPath} type={section.typeCode} title={section.title} widthStyle={section.widthStyle}>
            <Grid container spacing={3}>
                {visibleControls
                    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                    .map((control: ControlConfig) => {
                        return (
                            <Grid
                                item
                                key={`row-${sectionDataPath}.${control.key}`}
                                {...getWidthStyle(control.width as string)}
                                sx={{ maxWidth: '100%' }}
                            >
                                <ControlBuilder
                                    key={`${sectionDataPath}.${control.controlKey ? control.controlKey : control.controlRefName}`}
                                    config={control}
                                    parentPath={sectionDataPath}
                                />
                            </Grid>
                        );
                    })}
            </Grid>
        </SectionLayoutFactory>
    );
};
