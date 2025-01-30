import React from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import styles from './Summarization.module.css';
import { CitationTree, CitationDetails, LLMChatWindow } from 'components';

const DragHandle = ({ ...props }) => <div {...props} className={styles.dragHandle} />;

const ResizableGridItem = ({ width, onResize, children }) => {
    return (
        <Resizable width={width} height={0} onResize={onResize} draggableOpts={{ enableUserSelectHack: false }} handle={<DragHandle />}>
            <div className={styles.resizableWrapper}>{children}</div>
        </Resizable>
    );
};

const Home = () => {
    const [sizes, setSizes] = React.useState([20, 40, 40]); // Initial percentages

    const handleResize =
        (index) =>
        (e, { size }) => {
            const containerWidth = window.innerWidth - 32;
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
    );
};

export default Home;
