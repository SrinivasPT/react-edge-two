export interface TableConfig {
    isRowEditable: boolean;
    allRowsEditable: boolean;
    showRowActions: boolean;
    showPagination: boolean;
    showFilters: boolean;
    showAddNew: boolean;
    showRowDelete: boolean;
}

export type TableConfigType = {
    [key: string]: TableConfig;
};

export const TABLE_CONFIG: any = {
    TABLE_EDITABLE_FULL: {
        isRowEditable: true,
        allRowsEditable: true,
        showRowActions: true,
        showPagination: false,
        showFilters: false,
        showAddNew: true,
        showRowDelete: true,
    },
    TABLE_EDITABLE_ROW: {
        isRowEditable: true,
        allRowsEditable: false,
        showRowActions: true,
        showPagination: false,
        showFilters: true,
        showAddNew: true,
        showRowDelete: true,
    },
    TABLE: {
        isRowEditable: false,
        allRowsEditable: false,
        showRowActions: false,
        showPagination: false,
        showFilters: true,
        showAddNew: false,
        showRowDelete: true,
    },
};
