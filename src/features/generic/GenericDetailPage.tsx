import { PageBuilder, PageContext, useFormDetail } from 'lib';
import { useParams } from 'react-router-dom';
import { entityConfig } from './actionConfig';

const GenericDetailPage: React.FC<{ entity: string }> = ({ entity }) => {
    const { id } = useParams();
    const config = entityConfig[entity];
    const { state, dispatch } = useFormDetail(id, { ...config, entity });

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

export default GenericDetailPage;
