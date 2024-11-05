// npm install exceljs

const ExcelJS = require('exceljs');

// Create a new workbook
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Users');

// Define columns for the sheet
worksheet.columns = [
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Age', key: 'age', width: 10 },
    { header: 'Email', key: 'email', width: 30 }
];

// Add rows to the sheet
worksheet.addRow({ name: 'John Doe', age: 30, email: 'john@example.com' });
worksheet.addRow({ name: 'Jane Smith', age: 25, email: 'jane@example.com' });
worksheet.addRow({ name: 'Bob Johnson', age: 40, email: 'bob@example.com' });

// Save the workbook to a file
workbook.xlsx.writeFile('Users.xlsx')
    .then(() => {
        console.log('Excel file created: Users.xlsx');
    })
    .catch((err) => {
        console.error('Error creating Excel file:', err);
    });
