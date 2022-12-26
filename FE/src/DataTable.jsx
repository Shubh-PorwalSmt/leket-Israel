import { Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = () => {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      // width: 35
    },
    {
      field: 'fieldName',
      headerName: 'שם השדה',
      // width: 80,
      editable: false,
    },
    {
      field: 'cropKind',
      headerName: 'סוג יבול',
      // width: 65,
      editable: false,
    },
    {
      field: 'attractionScale',
      headerName: 'מדד אטרקטיביות',
      type: 'number',
      // width: 115,
      editable: false,
    },
    {
      field: 'maturityLevel',
      headerName: 'רמת בשלות',
      // description: 'This column has a value getter and is not sortable.',
      // width: 85,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'NSVIScale',
      headerName: 'NDVI',
      // width: 52,
      editable: false,
    },
    {
      field: 'area',
      headerName: 'אזור',
      // width: 45,
      editable: false,
    },
    {
      field: 'agriculturalNumber',
      headerName: 'מספר חקלאי',
      // width: 90,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'סטטוס',
      // width: 60,
      editable: false,
    },
  ];

  const rows = [
    { id: 1, fieldName: 'Some', cropKind: 'עגבניה', attractionScale: 9.5, maturityLevel: 'גבוה', NSVIScale: 0.1, area: 'דרום', agriculturalNumber: 123456, status: 'פעיל' },
    { id: 2, fieldName: 'Some', cropKind: 'גמבה', attractionScale: 9.5, maturityLevel: 'גבוה', NSVIScale: 0.3, area: 'צפון', agriculturalNumber: 123456, status: 'פעיל' },
    { id: 3, fieldName: 'Some', cropKind: 'מלפפון', attractionScale: 8.5, maturityLevel: 'גבוה', NSVIScale: 0.2, area: 'מרכז', agriculturalNumber: 123456, status: 'פעיל' },
    { id: 4, fieldName: 'Some', cropKind: 'עגבניה', attractionScale: 9, maturityLevel: 'גבוה', NSVIScale: 0.5, area: 'דרום', agriculturalNumber: 123456, status: 'פעיל' },
    { id: 5, fieldName: 'Some', cropKind: 'מלפפון', attractionScale: 9.5, maturityLevel: 'גבוה', NSVIScale: 0.5, area: 'מרכז', agriculturalNumber: 123456, status: 'פעיל' },
    { id: 6, fieldName: 'Some', cropKind: 'עגבניה', attractionScale: 7, maturityLevel: 'גבוה', NSVIScale: 0.1, area: 'צפון', agriculturalNumber: 123456, status: 'פעיל' },
    { id: 7, fieldName: 'Some', cropKind: 'גמבה', attractionScale: 5, maturityLevel: 'גבוה', NSVIScale: 0.5, area: 'דרום', agriculturalNumber: 123456, status: 'פעיל' },
    { id: 8, fieldName: 'Some', cropKind: 'עגבניה', attractionScale: 5.5, maturityLevel: 'גבוה', NSVIScale: 0.5, area: 'מרכז', agriculturalNumber: 123456, status: 'פעיל' },
    { id: 9, fieldName: 'Some', cropKind: 'מלפפון', attractionScale: 6, maturityLevel: 'גבוה', NSVIScale: 0.6, area: 'צפון', agriculturalNumber: 123456, status: 'פעיל' },
    { id: 10, fieldName: 'Some', cropKind: 'גמבה', attractionScale: 1, maturityLevel: 'גבוה', NSVIScale: 0.5, area: 'צפון', agriculturalNumber: 123456, status: 'פעיל' },
    { id: 11, fieldName: 'Some', cropKind: 'גמבה', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 0.4, area: 'מרכז', agriculturalNumber: 123456, status: 'פעיל' },
  ];

  return (
    <>
      <Card sx={{ width: '90%', marginTop: '3%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
          
          density="comfortable"
        />
      </Card>
    </>
  )
}

export default DataTable;
