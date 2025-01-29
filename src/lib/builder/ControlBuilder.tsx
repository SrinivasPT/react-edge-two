import React from 'react';

import {
    AutoCompleteControl,
    ButtonControl,
    DateControl,
    FileDownloadControl,
    FileUploadControl,
    FreeFormControl,
    ImageControl,
    LabelControl,
    MultiSelectControl,
    RadioControl,
    RangeControl,
    SectionControl,
    SelectControl,
    SpacerControl,
    SwitchControl,
    TableControl,
    TextControl,
} from '../components';
import { SearchCriteriaControl } from '../components/SearchCriteriaControl';
import { ControlProps } from '../types';

export const ControlBuilder: React.FC<ControlProps> = ({ config, parentPath, additionalProps = {} }) => {
    const controlFactory = {
        AUTO_COMPLETE: AutoCompleteControl,
        BUTTON: ButtonControl,
        ICON_BUTTON: ButtonControl,
        DATE: DateControl,
        FILE_UPLOAD: FileUploadControl,
        FILE_DOWNLOAD: FileDownloadControl,
        FREE_FORM: FreeFormControl,
        IMAGE: ImageControl,
        LABEL: LabelControl,
        MULTI_SELECT: MultiSelectControl,
        RADIO: RadioControl,
        RANGE: RangeControl,
        SEARCH_CRITERIA: SearchCriteriaControl,
        SECTION: SectionControl,
        SELECT: SelectControl,
        SPACER: SpacerControl,
        SWITCH: SwitchControl,
        TABLE: TableControl,
        TABLE_EDITABLE_FULL: TableControl,
        TABLE_EDITABLE_ROW: TableControl,
        TEXT: TextControl,
    };

    const ControlComponent = controlFactory[config.typeCode];
    const configAdditionalParams = config?.additionalProps ? JSON.parse(config?.additionalProps) : {};

    return <ControlComponent config={config} parentPath={parentPath} additionalProps={{ ...additionalProps, ...configAdditionalParams }} />;
};
