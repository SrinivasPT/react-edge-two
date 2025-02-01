import React, { useEffect } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';
import styles from './Summarization.module.css';
import CitationDetails from './components/CitationDetails';
import LLMChatWindow from './components/LLMChatWindow';
import { DispatchEvent, FormState, initialState, PageContext, pageReducer } from 'lib';
import { useImmerReducer } from 'use-immer';
import { useQuery } from '@tanstack/react-query';
import { useSummarization } from './use-summarization';
import CitationTree from './components/CitationTree';
import { useParams } from 'react-router-dom';
import { ActionBar } from './components/ActionBar';
import { Footer } from './components/Footer';

interface DragHandleProps extends React.HTMLAttributes<HTMLDivElement> {}

interface ResizableGridItemProps {
    width: number;
    onResize: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
    children: React.ReactNode;
}

const DragHandle: React.FC<DragHandleProps> = ({ ...props }) => <div {...props} className={styles.dragHandle} />;

const ResizableGridItem: React.FC<ResizableGridItemProps> = ({ width, onResize, children }) => {
    return (
        <Resizable
            width={width}
            height={Infinity}
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
            handle={<DragHandle />}
        >
            <div className={styles.resizableWrapper}>
                <div className={styles.sectionContent}>{children}</div>
            </div>
        </Resizable>
    );
};

const Summarization: React.FC<{ entity: string }> = ({ entity }) => {
    const { id } = useParams();
    const [state, dispatch] = useImmerReducer<FormState, DispatchEvent>(pageReducer, { ...initialState, internal: { treeData: [] } });
    const [sizes, setSizes] = React.useState([20, 40, 40]);
    const { dataLoader } = useSummarization();

    // Add enabled condition to ensure id exists
    const { data, isPending, error } = useQuery({
        queryKey: ['summarization', id],
        queryFn: () => dataLoader({ id: id! }),
        enabled: !!id, // Only run query when id is available
    });

    useEffect(() => {
        if (!isPending && data) {
            dispatch({ type: 'INITIALIZE_DATA', payload: { ...data, config: {} } });
        }
    }, [isPending, data, dispatch]); // Added dispatch to dependencies

    if (!id) return <div>No ID provided</div>;
    if (error) return <div>Error loading data: {(error as Error).message}</div>;
    if (isPending) return <div>Loading...</div>;

    const handleResize =
        (index: number) =>
        (e: React.SyntheticEvent, { size }: ResizeCallbackData) => {
            const containerWidth = document.querySelector(`.${styles.container}`)?.clientWidth ?? window.innerWidth - 32;
            const newPercentage = (size.width / containerWidth) * 100;
            const oldPercentage = sizes[index];
            const difference = newPercentage - oldPercentage;

            // Don't allow sections to be smaller than 10%
            if (newPercentage < 10) return;

            const newSizes = [...sizes];

            // Determine which adjacent section to adjust
            if (index < sizes.length - 1) {
                // Adjust the section to the right
                if (sizes[index + 1] - difference < 10) return; // Prevent adjacent section from becoming too small
                newSizes[index] = newPercentage;
                newSizes[index + 1] = sizes[index + 1] - difference;
            } else {
                // Adjust the section to the left
                if (sizes[index - 1] - difference < 10) return; // Prevent adjacent section from becoming too small
                newSizes[index] = newPercentage;
                newSizes[index - 1] = sizes[index - 1] - difference;
            }

            setSizes(newSizes);
        };

    return (
        <PageContext.Provider value={{ state, dispatch }}>
            <div className={styles.pageWrapper}>
                <ActionBar />
                <div className={styles.mainContent}>
                    <div className={styles.container}>
                        {/* First Section - Citation Tree */}
                        <div style={{ width: `${sizes[0]}%` }} className={styles.section}>
                            <ResizableGridItem width={(sizes[0] / 100) * (window.innerWidth - 32)} onResize={handleResize(0)}>
                                <CitationTree />
                            </ResizableGridItem>
                        </div>

                        {/* Second Section - Citation Details */}
                        <div style={{ width: `${sizes[1]}%` }} className={styles.section}>
                            <ResizableGridItem width={(sizes[1] / 100) * (window.innerWidth - 32)} onResize={handleResize(1)}>
                                <CitationDetails />
                            </ResizableGridItem>
                        </div>

                        {/* Third Section - LLM Chat Window */}
                        <div style={{ width: `${sizes[2]}%` }} className={styles.section}>
                            <ResizableGridItem width={(sizes[2] / 100) * (window.innerWidth - 32)} onResize={handleResize(2)}>
                                <LLMChatWindow />
                            </ResizableGridItem>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </PageContext.Provider>
    );
};

export default Summarization;
