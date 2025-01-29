import { CardLayout, FreeFormLayout, SearchCriteriaLayout } from '../layouts';
import { SectionLayoutType } from '../types';

const sectionLayoutFactory = {
    CARD_WITH_HEADER: CardLayout,
    CARD_WITHOUT_HEADER: CardLayout,
    SEARCH_CRITERIA: SearchCriteriaLayout,
    FREE_FORM: FreeFormLayout,
};

export const SectionLayoutFactory: React.FC<{
    type: SectionLayoutType;
    title?: string;
    widthStyle: string;
    children: React.ReactNode;
}> = ({ type, title, widthStyle, children }) => {
    const LayoutComponent = sectionLayoutFactory[type];

    if (!LayoutComponent) {
        return <div>Invalid layout type</div>;
    }

    return (
        <LayoutComponent title={title as string} widthStyle={widthStyle}>
            {children}
        </LayoutComponent>
    );
};
