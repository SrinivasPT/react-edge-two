export type ControlType = 'TEXT' | 'SELECT' | 'FREE_FORM' | 'BUTTON' | 'ICON_BUTTON';
export type SectionLayoutType = 'CARD_WITH_HEADER' | 'FREE_FORM';
import { DispatchEvent, FormState } from './PageContextTypes';

export interface ControlProps {
    config: ControlConfig;
    parentPath: string;
    additionalProps?: any;
}

export interface ControlConfig {
    key: string;
    refName: string;
    label: string;
    typeCode: ControlType;
    dataPath?: string;
    value?: any;
    visibilityTypeCode: string;
    displayOrder?: number;
    parentId: string;
    domainCategoryCode: string;
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    hideExpression?: string;
    requiredExpression?: string;
    width?: string;
    controls?: ControlConfig[];
    [key: string]: any;
}

export type FormConfig = {
    refName: string;
    dataPath: string;
    title: string;
    subTitle: string;
    urlPath: string;
    sections: string[];
    sectionRepository: SectionConfig[];
    buttons: string;
};

export type SectionConfig = {
    refName: string;
    dataPath: string;
    sectionKey: string;
    title: string;
    typeCode: 'COMPLEX_CONTROL' | 'SECTION_WITH_HEADER' | 'SECTION_WITHOUT_HEADER' | 'GRID' | any;
    widthStyle: string;
    hideExpression: string;
    controls: ControlConfig[];
};

export type Domain = {
    categoryCode: string;
    domainCode: string;
    displayText: string;
    parentCode: string;
};

export type ButtonAction = {
    parentPath: string;
    config: ControlConfig;
    additionalProps: any;
    state: FormState;
    dispatch: (dispatchEvent: DispatchEvent) => void;
};
