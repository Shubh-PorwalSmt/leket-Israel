import { Card, Chip } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridActionsCellItem } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Security, FileCopy } from '@mui/icons-material'
import { useEffect, useCallback } from 'react';
import moment from 'moment/moment';
// import { useCallback } from 'react';

const DataTable = ({ rows, setRows, originalRows, density, searchText, cropKind, optionArea, optionCareStatus, optionMoreFilters, sortMethod }) => {
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
      renderCell: params => (<Status label={params.value} />),
    },
    {
      field: 'lastUpdate',
      headerName: 'עדכון אחרון',
      // width: 90,
      editable: false,
    },
    {
      field: 'actions',
        type: 'actions',
        // width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Security />}
            label="Action 1"
            // form of actions
            // onClick={toggleAdmin(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<FileCopy />}
            label="Action 2"
            // form of actions
            // onClick={duplicateUser(params.id)}
            showInMenu
          />,
        ],
    },
    
    
  ];

  // Make filter functions for more filters and more crop kinds

  const applyFilterSearch = () => {
    const filteredRows = originalRows.filter(row => {
      return row.fieldName.toLowerCase().includes(searchText.toLowerCase());
    });

    setRows(filteredRows);
  };

  // TODO: need to check this again (why is it called filtering? can't filter by last update?) maybe sorting?
  const checkMoreFilters = (moreFilters, row) => {
    switch(moreFilters) {
      case 'רמת בשלות':

        break;
      case 'מדד אטרקטיביות':

        break;
      case 'מספר חקלאי':

        break;
      default:
        return true;
    }
  }

  const applyFilteringAndSorting = () => {
    // first sort, then from the sorted rows filter...
    var R = originalRows.slice();
    var sortedRows = null;

    switch (sortMethod) {
      case 'אטרקטביות':
        sortedRows = R.sort((a, b) => b.attractionScale - a.attractionScale);
        break;
      case 'דירוג':
        sortedRows = R.sort((a, b) => b.NSVIScale - a.NSVIScale);
        break;
      case 'מיקום':
        const order = ['צפון', 'דרום', 'מרכז'];
        const sortByOrder = order.reduce((obj, item, index) => {
          return {
            ...obj,
            [item]: index,
          };
        }, {});

        sortedRows = R.sort((a, b) => sortByOrder[a.area] - sortByOrder[b.area]);
        break;
      case 'עדכון אחרון':
        sortedRows = R.sort((a, b) => new moment(b.lastUpdate.replaceAll('.', '/'), "DD/MM/YYYY").diff(new moment(a.lastUpdate.replaceAll('.', '/'), "DD/MM/YYYY")));
        break;
      default:
        sortedRows = R;
        break;
    }
    
    const filteredRows = sortedRows.filter(row => {
      return (cropKind.length > 0 ? cropKind.includes(row.cropKind.toLowerCase()) : true)
        && (optionArea !== 'הכל' ? optionArea.toLowerCase() === row.area.toLowerCase() : true)
        && (optionCareStatus !== 'הכל' ? optionCareStatus.toLowerCase() === row.status.toLowerCase() : true);
        // && (checkMoreFilters(optionMoreFilters, row));
    });

    setRows(filteredRows);
  }
  
  useEffect(applyFilterSearch, [originalRows, searchText, setRows]);
  useEffect(applyFilteringAndSorting, [originalRows, setRows, cropKind, optionArea, optionCareStatus, optionMoreFilters, sortMethod]);

  // TODO: setup themes!
  const theme = createTheme({
    // TODO: need to orgenize colors
    palette: {
      one: {
        ligntGreen: '#DEF9E0',
      },
      two: {
        ligntBlue: '#EBF2FF',
      },
      three: {
        ligntRed: '#FFDADA'
      },
    },
  });
  // Form of actions
  // const deleteUser = useCallback(id => () => {
  //     setTimeout(() => {
  //       setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  //     });
  //   },
  // [],);

  const paginationNavigator = {
    '.css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar': {
      direction: 'ltr'
    }
  }

  const Status = ({ label }) => {
    return (
      // <ThemeProvider theme={theme}>
        <Chip color={label === 'בטיפול' ? 'success' : label === 'לא בטיפול' ? 'error' : 'primary'}
          label={label} />
      // {/* </ThemeProvider> */}
    )
  };

  const Export = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport sx={{ direction: 'ltr', color: 'success' }} />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Card dir="rtl" sx={{ width: '95%', marginTop: '3%' }}>
        <DataGrid
          rows={rows}
          sx={paginationNavigator}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          autoHeight
          density={density}
          components={{
            Toolbar: Export
          }}
          initialState={{
            filter: {
              filterModel: {
                items: [
                  // {
                    // columnField: 'fieldName',
                    // operatorValue: 'equals',
                    // value: 'Some'
                  // }
                ],
              },
            },
            columns: {
              columnVisibilityModel: {
                id: false
              },
            },
          }}
        />
      </Card>
    </>
  )
}

export default DataTable;
