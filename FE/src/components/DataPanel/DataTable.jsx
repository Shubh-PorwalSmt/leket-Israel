import { Card, Chip, Button, Checkbox } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  useGridApiContext,
} from "@mui/x-data-grid";
import { Security, FileCopy, Add } from "@mui/icons-material";
import { createSvgIcon } from "@mui/material/utils";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import * as XLSX from "xlsx/xlsx.mjs";
import RowDetails from "./RowDetails";

const dataGridStyle = {
  ".css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
    direction: "ltr",
  },
  ".css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate":
    {
      color: "#498758",
    },
  ".MuiDataGrid-row": {
    color: "#4a8758",
  },
  ".css-f3jnds-MuiDataGrid-columnHeaders": {
    color: "#006400",
  },
};

const DataTable = ({
  rows,
  setRows,
  originalRows,
  searchText,
  cropKind,
  optionArea,
  optionCareStatus,
  moreCropKinds,
  optionMoreFilters,
  sortMethod,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      // width: 35
    },
    {
      field: "fieldName",
      headerName: "שם השדה",
      // width: 80,
      editable: false,
    },
    {
      field: "cropKind",
      headerName: "סוג יבול",
      // width: 65,
      editable: false,
    },
    {
      field: "attractionScale",
      headerName: "מדד אטרקטיביות",
      width: 115,
      editable: false,
    },
    {
      field: "maturityLevel",
      headerName: "רמת בשלות",
      // description: 'This column has a value getter and is not sortable.',
      // width: 85,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: "NSVIScale",
      headerName: "NDVI",
      // width: 52,
      editable: false,
      renderCell: (params) => <NDVI label={params.value} />,
    },
    {
      field: "area",
      headerName: "אזור",
      // width: 45,
      editable: false,
    },
    {
      field: "agriculturalNumber",
      headerName: "מספר חקלאי",
      // width: 90,
      editable: false,
    },
    {
      field: "status",
      headerName: "סטטוס",
      width: 140,
      editable: false,
      renderCell: (params) => <Status label={params.value} />,
    },
    {
      field: "lastUpdate",
      headerName: "עדכון אחרון",
      // width: 90,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
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

  //#region Popup
  const [open, setOpen] = useState([false, null]);

  const handleClickRowOpen = (params) =>
    setOpen([true, Object.entries(params)[0][1]]);

  const handleClickRowClose = () => setOpen([false, null]);
  //#endregion

  //#region Filters
  const applyFilterSearch = () => {
    const filteredRows = originalRows.filter((row) => {
      return row.fieldName.toLowerCase().includes(searchText.toLowerCase());
    });

    setRows(filteredRows);
  };

  // TODO: Need to check this again (why is it called filtering? can't filter by last update?) maybe sorting?
  // const checkMoreFilters = (moreFilters, row) => {
  //   switch(moreFilters) {
  //     case 'רמת בשלות':

  //       break;
  //     case 'מדד אטרקטיביות':

  //       break;
  //     case 'מספר חקלאי':

  //       break;
  //     default:
  //       return true;
  //   }
  // }

  const applyFilteringAndSorting = () => {
    // first sort, then from the sorted rows filter...
    var R = originalRows.slice();
    var sortedRows = null;

    switch (sortMethod) {
      case "אטרקטביות":
        sortedRows = R.sort((a, b) => b.attractionScale - a.attractionScale);
        break;
      case "דירוג":
        sortedRows = R.sort((a, b) => b.NSVIScale - a.NSVIScale);
        break;
      case "מיקום":
        const order = ["צפון", "דרום", "מרכז"];
        const sortByOrder = order.reduce((obj, item, index) => {
          return {
            ...obj,
            [item]: index,
          };
        }, {});

        sortedRows = R.sort(
          (a, b) => sortByOrder[a.area] - sortByOrder[b.area]
        );
        break;
      case "עדכון אחרון":
        sortedRows = R.sort((a, b) =>
          new moment(b.lastUpdate.replaceAll(".", "/"), "DD/MM/YYYY").diff(
            new moment(a.lastUpdate.replaceAll(".", "/"), "DD/MM/YYYY")
          )
        );
        break;
      default:
        sortedRows = R;
        break;
    }

    const filteredRows = sortedRows.filter((row) => {
      return (
        (cropKind.length > 0
          ? cropKind.includes(row.cropKind.toLowerCase())
          : true) &&
        (optionArea !== "הכל"
          ? optionArea.toLowerCase() === row.area.toLowerCase()
          : true) &&
        (optionCareStatus !== "הכל"
          ? optionCareStatus.toLowerCase() === row.status.toLowerCase()
          : true)
      );
      // && (checkMoreFilters(optionMoreFilters, row));
    });

    setRows(filteredRows);
  };

  useEffect(applyFilterSearch, [originalRows, searchText, setRows]);
  useEffect(applyFilteringAndSorting, [
    originalRows,
    setRows,
    cropKind,
    optionArea,
    optionCareStatus,
    optionMoreFilters,
    sortMethod,
  ]);
  //#endregion

  // TODO: Form of actions
  // const deleteUser = useCallback(id => () => {
  //     setTimeout(() => {
  //       setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  //     });
  //   },
  // [],);

  //#region CustomComponents
  const Status = ({ label }) => {
    return (
      <Chip
        label={label}
        sx={{
          backgroundColor:
            label === "בטיפול"
              ? "#def9e0"
              : label === "לא בטיפול"
              ? "#FFDADA"
              : label === "לא עדכני"
              ? "#a2c0fa"
              : label === "בטיפול רכז"
              ? "#f9ecde"
              : label === "דורש בדיקה"
              ? "#fca9a8"
              : "#ebf2ff",
        }}
      />
    );
  };

  const NDVI = ({ label }) => {
    return <div>{label}</div>;
  };

  const CustomExport = () => {
    const apiRef = useGridApiContext();

    const addCropStyle = {
      borderRadius: "12px",
      marginRight: "12px",
      backgroundColor: "white",
      color: "#3A6E47",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#eaf0ee",
      },
    };

    const getFilteredRows = ({ apiRef }) => {
      const cRows = apiRef.current.getSelectedRows();
      const sRows =
        cRows.size > 0 ? Array.from(cRows, (entry) => entry[1]) : rows;

      /* TODO: need to add an option in Settings page to select in which file type we want to download the data
      (currently it exports into excel file, but it can also be exported as csv file as well) */

      // for CSV
      // new CsvBuilder("fields.csv")
      //   .addRows(sRows.map(rowData => columns.map(col => rowData[col.field])))
      //   .exportFile();

      // for EXCEL
      const worksheet = XLSX.utils.json_to_sheet(sRows);
      const workBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workBook, worksheet, "fields");

      XLSX.writeFile(workBook, "field.xlsx");
    };

    const handleExport = (options) => {
      try {
        apiRef.current.exportDataAsCsv(options);
      } catch (e) {}
    };

    const ExportIcon = createSvgIcon(
      <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
      "SaveAlt"
    );

    return (
      <GridToolbarContainer>
        <Button
          variant="text"
          sx={{
            direction: "ltr",
            color: "#5cb85c",
            borderRadius: "10px",
            fontWeight: "bold",
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            "&:hover": {
              backgroundColor: "#eaf0ee",
            },
          }}
          onClick={() => handleExport({ getRowsToExport: getFilteredRows })}
        >
          <ExportIcon sx={{ paddingRight: "10%" }} />
          ייצא
        </Button>
        <Button variant="text" href="/addfield" elevation={9} sx={addCropStyle}>
          הוספת שטח
          <Add />
        </Button>
      </GridToolbarContainer>
    );
  };

  const CustomCheckBox = () => {
    return <Checkbox color="success" />;
  };
  //#endregion

  return (
    <Card
      dir="rtl"
      elevation={10}
      sx={{ marginTop: "3%", borderRadius: "14px" }}
    >
      <DataGrid
        rows={rows}
        sx={dataGridStyle}
        onRowClick={handleClickRowOpen}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        hideFooterSelectedRowCount
        disableSelectionOnClick
        autoHeight
        rowThreshold={0}
        components={{
          Toolbar: CustomExport,
          Checkbox: CustomCheckBox,
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
      />
      <RowDetails onClose={handleClickRowClose} rowSet={open} />
    </Card>
  );
};

export default DataTable;
