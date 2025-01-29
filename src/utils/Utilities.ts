import { isNumericLiteral } from 'typescript';

export function capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
        return inputString; // Handle empty string
    }

    const firstLetter = inputString.charAt(0).toUpperCase();
    const restOfTheString = inputString.slice(1).toLowerCase();

    return firstLetter + restOfTheString;
}

export const dateFormat = (inputFormat: String) => {
    if (inputFormat) {
        let splitVal = inputFormat.split('-', 3);
        // console.log('New date', inputFormat);
        // console.log(
        // 	'New date',
        // 		`${parseInt(splitVal[2])}-${parseInt(splitVal[1])}-${parseInt(splitVal[0])}`
        // );
        const newDate = `${parseInt(splitVal[2])}-${parseInt(splitVal[1])}-${parseInt(splitVal[0])}`.toString();
        console.log('newdate', newDate);
        return newDate;
    }
};

export const parseDateNoForLineChart = (str: string) => {
    const data = str;
    return data.split('-')[2];
};

export const arrayToString = (arr: Array<string>) => {
    if (arr) {
        const dd = arr.join(' ');
        return dd;
    }
};

export const dashboardStatus = (status: string) => {
    switch (status) {
        case 'INI':
            return 'Initiated';
        case 'COMP':
            return 'Completed';
        default:
            return 'Re-Initiated';
    }
};

export const dashboardStartDate = (str: String | any) => {
    if (str) {
        const sp = str.split('T')[0];
        const pv = str.split('T')[1];

        const kj = pv.split('.')[0];

        const mm = sp.split('-');
        const ll = mm.reverse();
        const gh = ll.join('-');

        return gh + '  ' + kj;
    }
};

export const showOnlyDate = (str: String | any) => {
    if (str) {
        const sp = str.split('T')[0];
        const pv = str.split('T')[1];

        const kj = pv.split('.')[0];

        const mm = sp.split('-');
        const ll = mm.reverse();
        const gh = ll.join('-');

        return gh;
    }
};
export const getDate = (str: String | any) => {
    if (str) {
        const sp = str.split(' ')[0];
        // const pv = str.split("T")[1];

        // const kj = pv.split(".")[0];

        const mm = sp.split('-');
        const ll = mm.reverse();
        const gh = ll.join('-');

        return gh;
    }
};

export const getDateAndTime = (str: String | any) => {
    if (str) {
        const sp = str.split(' ')[0];
        const tm = str.split(' ')[1];
        const mm = sp.split('-');
        const ll = mm.reverse();
        const gh = ll.join('-');
        const dd = gh + ' ' + tm;

        return dd;
    }
};
export const fetchCurrentStatus = (status: string) => {
    switch (status) {
        case 'LOAN_APPLICATION':
            return 'Loan Application';
        case 'PERSONAL_DETAILS':
            return 'Personal Detail';
        case 'PERSONALADDR':
            return 'Personal Address';
        case 'EMPLOYMENT_DETAILS':
            return 'Employment Detail';
        case 'EMPLOYMENTADDR':
            return 'Employment Address';
        case 'PAN_OCR':
            return 'Pan OCR';
        case 'PAN_CHECK':
            return 'Pan Check';
        case 'SELFIE':
            return 'Selfie';
        case 'FACEMATCH_CHECK':
            return 'Face Match Check';
        case 'LIVELINESS':
            return 'Liveliness';
        case 'EKYC':
            return 'E-kyc';
        case 'BUREAU':
            return 'Bureau';
        case 'BSA':
            return 'BSA';
        case 'OFFER':
            return 'Offers';
        case 'ESIGN':
            return 'E-Sign';
        case 'ENACH':
            return 'E-Nach';
        case 'REFERENCE':
            return 'References';
        case 'MANAPPR':
            return 'Pending Approval';
        case 'NBFCAPPR':
            return 'NBFC Approval';
        case 'DISBAPPR':
            return 'Disb Approval';
        case 'DISBUTR':
            return 'Pending Disbursement';
        case 'REJECT':
            return 'Rejected';
        case 'CANCEL':
            return 'Cancelled';
        case 'NEGOTIATE':
            return 'Negotiation';
        case 'LOAN_DETAILS':
            return 'Loan Details';
        case 'ELIGIBLE_OFFERS':
            return ' Eligible Offers';
        case 'CRIF':
            return 'CRIF';
        case 'ONBOARDED':
            return 'On-Boarded';
        case 'SYSTEM_REJECT':
            return 'System Reject';
        default:
            return status;
    }
};

export const addStyleToStatus = (status: string | null) => {
    if (status) {
        return {};
    }
};

// to add commas to numbers
// export const numberWithCommas = (x: string | any): string => {
//     if (x) {
//         return x.toLocaleString();
//         // .toString()
//         // .replace(/\D/g, '')
//         // .replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, '$1,');
//     } else {
//         return x;
//     }
// };

// Working on CRIF Report
// export const balHistory = (str : String) => {

// 	const str = "Jun:2021,105034608|May:2021,114160365|Apr:2021,126844978|Mar:2021,135899719|Feb:2021,148193986|Jan:2021,XXX|Dec:2020,192837649|Nov:2020,XXX|Oct:2020,XXX|Sep:2020,XXX|Aug:2020,291817590|Aug:2020,291817590"

// let splitVal = str.split("|")
// let month = []
// let year = []
// let amount = []
// splitVal.map((data) => {
//     let splitNo = data.split(",");
//     let SplitYear = data.split(":")
//     console.log("splitNo", splitNo, SplitYear);
//     console.log("Data", data);
// })

// console.log("Welcome to Programiz!", splitVal);
// }

// export const numberWithCommas = (number: any) => {
//   //return number.toString().replace(/(?!^)(?=(?:\d{2})*\d{3}(?:\.|$))/g, ',')
//   switch (typeof number) {
//     case "number":
//       if (number - Math.floor(number) !== 0) {
//         const nummmm = number.toFixed(2);
//         return parseFloat(
//           number.toString().replace(/(?!^)(?=(?:\d{2})*\d{3}(?:\.|$))/g, ",")
//         );
//       }
//       else
//         return `${number
//           .toString()
//           .replace(/(?!^)(?=(?:\d{2})*\d{3}(?:\.|$))/g, ",")}.00`;
//       break;

//     case "string":
//       const StrToNum = +number;
//       if (StrToNum - Math.floor(StrToNum) !== 0) {
//         const nummmm = StrToNum.toFixed(2);
//         return parseFloat(
//           StrToNum.toString().replace(/(?!^)(?=(?:\d{2})*\d{3}(?:\.|$))/g, ",")
//         );
//       }
//       else
//         return `${StrToNum.toString().replace(
//           /(?!^)(?=(?:\d{2})*\d{3}(?:\.|$))/g,
//           ","
//         )}.00`;
//       break;

//     default:
//       return number;
//   }
// };

export const numberWithCommas = (number: any) => {
    switch (typeof number) {
        case 'number':
            return number.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

        case 'string':
            const StrToNum = +number;
            return StrToNum.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

        default:
            return number;
    }
};

//convert input $ , . into string in submit
export const amountToNumber = (value: string): string => {
    const amt = value?.replace(/([,₹])/g, '');
    return amt;
};

export const appstr = (value: String): String => {
    switch (value) {
        case 'Y':
            return 'Yes';
            break;
        case 'N':
            return 'No';
            break;
        default:
            return 'Not Initiated';
            break;
    }
};

//format YYYY-MM-DD to DD-MM-YYYY

export const reportDateFormatDDMMYYYY = (inputFormat: String) => {
    if (inputFormat) {
        let splitVal = inputFormat.split('-', 3);
        // console.log('New date', inputFormat);
        // console.log(
        // 	'New date',
        // 		`${parseInt(splitVal[2])}-${parseInt(splitVal[1])}-${parseInt(splitVal[0])}`
        // );
        const newDate = `${splitVal[2]}-${splitVal[1]}-${splitVal[0]}`.toString();
        return newDate;
    }
};

//format DD-MM-YYYY to YYYY-MM-DD
export const reportDateFormatYYYYMMMDD = (inputFormat: String) => {
    if (inputFormat) {
        let splitVal = inputFormat.split('-', 3);
        const newDate = `${splitVal[0]}-${splitVal[1]}-${splitVal[2].slice(0, 2)}`.toString();
        return newDate;
    }
};

export const IsDecimal = (data: String): String => {
    if (Number.isInteger(data)) {
        return `${data}.00`;
    } else {
        return data.toString();
    }
};

export const titleCase = (str: string): string => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
};

export const accountTypeOptions = [
    {
        paramType: 'S',
        paramValue: 'Saving',
    },
    {
        paramType: 'C',
        paramValue: 'Current',
    },
    {
        paramType: 'R',
        paramValue: 'Cash credit',
    },
    {
        paramType: 'O',
        paramValue: 'Overdraft',
    },
];
export const bankAnalysisStatus = (status: string) => {
    switch (status) {
        case 'I':
            return 'Initiated';
        case 'C':
            return 'Initiated';
        default:
            return 'Not Initiated';
    }
};

export const ODCaseStatus = (status: string) => {
    switch (status) {
        case 'REQ':
            return 'Requested';
        case 'REJ':
            return 'Rejected';
        case 'APR':
            return 'Approved';
        case 'DSB':
            return 'Disbursed';
        default:
            return 'No Status';
    }
};

export const subStatus = (status: string) => {
    switch (status) {
        case 'PAN_OCR':
            return 'Pan';
        case 'PERSONAL_DETAILS':
            return 'Personal Details';
        case 'EMPLOYMENT_DETAILS':
            return 'Employement Details';
        case 'SELFIE':
            return 'Selfie';
        case 'FACEMATCH_CHECK':
            return 'Face Match';
        case 'LIVELINESS':
            return 'Liveliness';
        case 'EKYC':
            return 'E-kyc';
        case 'BSA':
            return 'BSA';
        case 'ESIGN':
            return 'E-Sign';
        case 'ENACH':
            return 'E-Nach';
        case 'REFERENCE':
            return 'References';
        case 'LOAN_DETAILS':
            return 'Loan Details';
        case 'ELIGIBLE_OFFERS':
            return ' Eligible Offers';
        case 'CRIF':
            return 'CRIF';
        default:
            return 'No Status';
    }
};

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
}

export const checkIfNumber = (str: any) => {
    if (str.toString().length <= 9) {
        return str;
    }
    return;
};

export const addPercentageSymbol = (data: any) => {
    return `${data}%`;
};

export const genderCode = (genderCode: string | any) => {
    if (genderCode === 'M') {
        return 'Male';
    } else {
        return 'Female';
    }
};

export const eKycStatus = (data: boolean | undefined) => {
    switch (data) {
        case true:
            return 'Yes';
        case false:
            return 'No';
        case undefined:
            return 'Not Initiated';
    }
};

export function calculateAge(dateOfBirth: string | any) {
    if (dateOfBirth) {
        const parts = dateOfBirth.split('-');
        const reversedString = parts.reverse().join('-');
        const dob = new Date(reversedString);
        const age = new Date().getFullYear() - dob.getFullYear();
        return age;
    } else {
        return;
    }
}

export const displayFullName = (first: string | null, middle: string | null, last: string | null) => {
    if (first && middle && last) {
        return `${first} ${middle} ${last}`;
    } else if (first && last) {
        return `${first} ${last}`;
    } else if (first) {
        return `${first}`;
    } else {
        return null;
    }
};

export const bsaStatus = (value: string): string => {
    switch (value) {
        case 'PASS':
            return 'Pass';
        case 'FAIL':
            return 'Fail';
        case 'NOT_APPLICABLE':
            return 'Not Applicable';
        default:
            return '-';
    }
};

export const pageAccess = (status: string | null) => {
    switch (status) {
        case 'REJECT':
            return true;
        default:
            return false;
    }
};

//calculate total emi
export const calculateTotalEmi = (loanAmount: number, rate: number, loanTenure: number): number => {
    const pow = Math.pow;
    let totalEmi;

    if (rate === 0) {
        totalEmi = loanAmount / loanTenure;
    } else {
        const monthlyInterestRate: number = rate / 12 / 100;
        totalEmi =
            (loanAmount * monthlyInterestRate * pow(1 + monthlyInterestRate, loanTenure)) / (pow(1 + monthlyInterestRate, loanTenure) - 1);
    }

    const roundedEmi = Math.round(totalEmi);

    return roundedEmi;
};

export const filterField = (str: string) => {
    if (str) {
        switch (str) {
            case 'AADHAAR_OCR':
                return 'Aadhar Check';
            case 'BSA':
                return 'BSA Check';
            case 'CRIF':
                return 'Crif Score';
            case 'EKYC':
                return 'Ekyc Check';
            case 'EMAIL':
                return 'Email';
            case 'NAME':
                return 'Name';
            case 'PAN_OCR':
                return 'Pan Check';
            case 'PAN':
                return 'Pan Number';
            case 'PHONENO':
                return 'Mobile Number';
            case 'SALARY':
                return 'Salary';
            case 'USERREG':
                return 'User Registered On';
            default:
                return str;
        }
    }
};

export const filterValue = (str: string) => {
    if (str) {
        switch (str) {
            case 'VERIFIED':
                return 'Verified';
            case 'UNVERIFIED':
                return 'Un-Verified';
            case 'COMPLETE':
                return 'Complete';
            case 'INCOMPLETE':
                return 'Incomplete';
            default:
                return str;
        }
    }
};

export const convertArraytoText = (arr: string[]) => {
    if (arr) {
        const myString = arr.join(', ');
        return myString;
    }
};

export const callOutcome = (str: string) => {
    if (str) {
        switch (str) {
            case 'queued':
                return 'Queued';
            case 'in-progress':
                return 'In-Process';
            case 'completed':
                return 'Completed';
            case 'failed':
                return 'Failed';
            case 'busy':
                return 'Busy';
            case 'no-answer':
                return 'No-Answer';
            default:
                return 'No Outcome';
        }
    }
};

export const fraudCheck = (str: string) => {
    switch (str) {
        case 'CUSTOMER_NAME':
            return 'Customer Name';

        case 'FIRST_NAME':
            return 'First Name';

        case 'MIDDLE_NAME':
            return 'Middle Name';

        case 'LAST_NAME':
            return 'Last Name';

        case 'FULL_MATCH':
            return 'Full Match';

        case 'WITHOUT_VOWEL':
            return 'Without Vowel';

        default:
            break;
    }
};

export const dashboardDate = (str: String) => {
    if (str) {
        const pp = str.split('T')[0];
        const tt = pp.split('-')[2];
        return tt;
    }
};

export function maskNumber(number: string | null, length: number): string {
    const isEnableMaskNumber: boolean = false;

    if (number === null || number.length < length) {
        return ''; // or throw an exception or handle the error as needed
    }

    if (!isEnableMaskNumber) {
        return number;
    }

    // Extract the last four digits
    const lastFourDigits = number.substring(number.length - length);

    // Mask the rest of the digits
    let maskedNumber = '';
    for (let i = 0; i < number.length - length; i++) {
        const c = number.charAt(i);
        // Mask only digits, leave other characters as they are
        if (/\d/.test(c) || /[a-zA-Z]/.test(c)) {
            maskedNumber += 'X';
        } else {
            maskedNumber += c;
        }
    }

    // Append the last four digits
    maskedNumber += lastFourDigits;

    return maskedNumber;
}

function base64toBlob(base64Data: string, mimeType: string) {
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
}

export function openBase64NewTab(base64Pdf: string, type: string): void {
    // console.log('open: ', base64Pdf)
    var blob = base64toBlob(base64Pdf, type);

    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl);
}

export function operation(str: string) {
    if (str) {
        switch (str) {
            case 'BTW':
                return 'Between';
            default:
                return str;
        }
    }
}

// show shorter string
export function truncateString(str: string, maxLength: number) {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.substring(0, maxLength) + '...';
    }
}
