import { PageBuilder, PageContext, useFormList } from 'lib';
import { entityConfig } from './actionConfig';

const GenericListPage: React.FC<{ entity: string }> = ({ entity }) => {
    const config = entityConfig[entity];
    const { state, dispatch } = useFormList({ ...config, entity });

    if (!config) {
        return <div>Configuration not found for {entity}</div>;
    }

    if (state['flags']?.isDataLoading) {
        return <div>Loading Component...</div>;
    }

    return (
        <PageContext.Provider value={{ state, dispatch }}>
            <PageBuilder />
        </PageContext.Provider>
    );
};

export default GenericListPage;
