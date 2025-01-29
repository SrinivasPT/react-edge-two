import { fetcher } from 'lib';

export const fetchFormData = async (config: any, id: any) => {
    const getNodeUrls = () => {
        if (id === null) {
            // List page
            return [
                {
                    entity: 'config',
                    method: 'GET',
                    url: `${config.formListConfig}`,
                    typeCode: 'FORM_CONFIG',
                },
                { entity: 'data', method: 'GET', url: `${config.url}`, typeCode: 'FORM_LOAD' },
            ];
        } else if (id === 'new') {
            // New item detail page
            return [
                {
                    entity: 'config',
                    method: 'GET',
                    url: `${config.formDetailConfig}`,
                    typeCode: 'FORM_CONFIG',
                },
            ];
        } else {
            // Existing item detail page
            return [
                { entity: 'data', method: 'GET', url: `${config.url}/${id}`, typeCode: 'FORM_LOAD' },
                {
                    entity: 'config',
                    method: 'GET',
                    url: `${config.formDetailConfig}`,
                    typeCode: 'FORM_CONFIG',
                },
            ];
        }
    };

    console.log('Node URLs:', getNodeUrls());

    const dataResults = await Promise.all(
        getNodeUrls()
            .filter((item: any) => ['FORM_LOAD', 'FORM_CONFIG'].includes(item.typeCode))
            .map(async (node: any) => {
                try {
                    // const response = await fetch(node.url, {
                    //     method: node.method,
                    //     headers: getHeaders(),
                    // });
                    // const data = await response.json();
                    const response = await fetcher.get(node.url);
                    return { key: node.entity, data: response.data };
                } catch (error) {
                    console.error(`Error fetching ${node.entity}:`, error);
                    return { key: node.entity, data: null };
                }
            })
    );

    return dataResults.reduce((acc: any, result: any) => {
        acc[result.key] = result.data;
        return acc;
    }, {});
};
