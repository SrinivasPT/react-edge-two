import { fetcher } from 'lib';

export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('YOUR_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.fileUrl; // Assuming the server returns the URL of the uploaded file
};

// export const uploadFiles = async (files: File[]): Promise<string[]> => {
//     const formData = new FormData();
//     files.forEach((file) => {
//         formData.append('files', file);
//     });

//     const response = await fetcher(API_Endpoints.UPLOAD_FILES, {
//         method: 'POST',
//         body: formData,
//     });

//     if (response && response.fileUrls) {
//         return response.fileUrls; // Assuming the server returns an array of file URLs
//     } else {
//         throw new Error('Upload failed or invalid server response');
//     }
// };

export const downloadFile = async (url: string, documentName: string) => {
    const res: any = await fetcher(`${'API_Endpoints.VIEW_DOCUMENT'}?url=${url}`); //TODO: Add the endpoint

    if (res && res.data && res.data.data) {
        const arrayBuffer = res.data.data.docData;
        const contentType = res.data.data.contentType.toLowerCase();
        const mimeType = getMimeType(contentType);

        if (mimeType) {
            const blob = base64toBlob(arrayBuffer, mimeType);
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank');
        } else {
            alert('File format not supported');
        }
    } else {
        throw new Error('Invalid response from server');
    }
};

const getMimeType = (extension: string) => {
    const mimeTypes: { [key: string]: string } = {
        png: 'image/png',
        pdf: 'application/pdf',
        jpeg: 'image/jpeg',
        jpg: 'image/jpg',
        csv: 'text/csv',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };

    return mimeTypes[extension] || null;
};

const base64toBlob = (base64Data: string, mimeType: string): Blob => {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);
        const bytes = new Array(end - begin);

        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }

        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }

    return new Blob(byteArrays, { type: mimeType });
};
