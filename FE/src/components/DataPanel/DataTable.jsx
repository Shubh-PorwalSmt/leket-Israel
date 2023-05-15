import React from 'react';
import {Button, Card, Checkbox, Chip, TablePagination} from "@mui/material";
import {DataGrid, GridActionsCellItem, GridToolbarContainer, useGridApiContext} from "@mui/x-data-grid";
import {Add, FileCopy, Security} from "@mui/icons-material";
import {createSvgIcon} from "@mui/material/utils";
import CustomStatus from "./CustomStatus";
import {useEffect, useState} from "react";
import AddField from '../../views/AddField';
import moment from "moment/moment";
import * as XLSX from "xlsx/xlsx.mjs";
import RowDetails from "./RowDetails";

import './DataPanel.scss';

const dataGridStyle = {
	".css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate":
		{
			color: "#498758",
		},
	".MuiDataGrid-row": {
		color: "#4a8758"
	},
	".MuiDataGrid-row.Mui-selected": {
		backgroundColor: '#D0EACF'
	},
	".MuiDataGrid-row.Mui-selected:hover": {
		backgroundColor: '#D0EACF'
	},
	".css-f3jnds-MuiDataGrid-columnHeaders": {
		color: "#006400",
	},
	"MuiTablePagination-selectLabel": {
		display: 'none !important'
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

	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	const [showAddField, setShowAddField] = useState(false);
	const [editedRow, setEditedRow] = useState(null);

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handlePageSizeChange = (event) => {
		setPageSize(parseInt(event.target.value, 10));
		setPage(0);
	};

	const columns = [
		{
			field: "id",
			headerName: "ID",
		},
		{
			field: "fieldName",
			headerName: "שם השדה",
			editable: false,
			flex: 2,
		},
		{
			field: "cropKind",
			headerName: "סוג יבול",
			editable: false,
			flex: 1,
		},
		{
			field: "attractionScale",
			headerName: "מדד אטרקטיביות",
			flex: 1,
			editable: false,
		},
		{
			field: "NSVIScale",
			headerName: "NDVI",
			editable: false,
			flex: 1,
			renderCell: (params) => <NDVI label={params.value} />,
		},
		{
			field: "area",
			headerName: "אזור",
			editable: false,
			flex: 1,
		},
		{
			field: "agriculturalNumber",
			headerName: "מספר חקלאי",
			editable: false,
			flex: 1,
		},
		{
			field: "aquaintanceMode",
			headerName: "מצב היכרות",
			editable: false,
			flex: 1,
			// renderCell: (params) => <NDVI label={params.value} />,
		},
		{
			field: "lastUpdate",
			headerName: "עדכון אחרון",
			editable: false,
			flex: 1
		},
		{
			field: "status",
			headerName: "סטטוס",
			width: 140,
			editable: true,
			renderCell: (params) => <CustomStatus label={params.value} />,
		},
		{
			field: "actions",
			type: "actions",
			width: 50,
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
	
	const isStatusColumn = target => {
		let node = target;
		while (node && node.tagName && node.tagName.toLowerCase() !== "body") {
			if(node.getAttribute("status-column") === "true") {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	};

	const handleRowClick = (params) => {
		const statusColumn = isStatusColumn(event.target);
		if(!statusColumn) {
			setEditedRow(params.row);
		}
	};

	const handleClickRowClose = () => {
		setEditedRow(null);
	};

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
		var slicedOriginalRows = originalRows.slice();
		var sortedRows = null;

		switch (sortMethod) {
			case "אטרקטביות":
				sortedRows = slicedOriginalRows.sort(
					(a, b) => b.attractionScale - a.attractionScale
				);
				break;
			case "דירוג":
				sortedRows = slicedOriginalRows.sort(
					(a, b) => b.NSVIScale - a.NSVIScale
				);
				break;
			case "מיקום":
				const order = ["צפון", "דרום", "מרכז"];
				const sortByOrder = order.reduce((obj, item, index) => {
					return {
						...obj,
						[item]: index,
					};
				}, {});

				sortedRows = slicedOriginalRows.sort(
					(a, b) => sortByOrder[a.area] - sortByOrder[b.area]
				);
				break;
			case "עדכון אחרון":
				sortedRows = slicedOriginalRows.sort((a, b) =>
					new moment(b.lastUpdate.replaceAll(".", "/"), "DD/MM/YYYY").diff(
						new moment(a.lastUpdate.replaceAll(".", "/"), "DD/MM/YYYY")
					)
				);
				break;
			default:
				sortedRows = slicedOriginalRows;
				break;
		}

		const filteredRows = sortedRows;

		// const filteredRows = sortedRows.filter((row) => {
		//   // console.log(row.status);
		//   // console.log(row.area);
		//   return optionCareStatus.includes("הכל")
		//     ? optionArea.includes(row.area)
		//     : optionArea.includes("הכל")
		//     ? optionArea.includes(row.area)
		//     : true;
		//   // optionArea.length > 0 ? optionArea.includes(row.area.toLowerCase()) : true;
		// });

		// console.log(filteredRows);

		// const filteredRows = sortedRows.filter((row) => {
		//   console.log(cropKind);
		//   // optionArea.toLowerCase() === row.area.toLowerCase()
		//   // optionCareStatus.toLowerCase() === row.status.toLowerCase()
		//   console.log(optionArea.includes(row.area.toLowerCase()));
		//   return cropKind.length > 0
		//     ? cropKind.includes(row.cropKind.toLowerCase())
		//     : true
		//     && optionArea.length > 0
		//     ? optionArea.includes(row.area.toLowerCase())
		//     : true
		//     && optionCareStatus.length > 0
		//     ? optionCareStatus.includes(row.status.toLowerCase())
		//     : true;
		//   // && (checkMoreFilters(optionMoreFilters, row));
		// });

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
	/*const Status = ({ label }) => {
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
			>
				<Menu
					id="basic-menu"
					dir="rtl"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "right",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					PaperProps={{
						style: {
							maxHeight: !isAdvanced ? ITEM_HEIGHT * 4.4 : "",
						},
					}}
				>
					<MenuItem
						sx={{
							background: options.includes(item) ? "#d0eacf" : "",
							borderRadius: "10px",
							"&:hover": {
								background: options.includes(item) ? "#d0eacf" : "",
							},
						}}
						key={item}
						onClick={handleMenuItemClick}
					></MenuItem>
				</Menu>
			</Chip>
		);
	};*/

	const NDVI = ({ label }) => {
		return <div>{label}</div>;
	};

	const pagingLabel = ({ from, to, count }) => {
		 return (
			 <div style={{padding: '0 20px'}}> שדות {from}–{to}</div>
		 )
	};

	const Toolbar = () => {
		return (
			<div style={{display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
				<CustomExport />

				<div>
					<TablePagination page={page}
					                 labelDisplayedRows={pagingLabel}
					                 count={rows.length}
					                 rowsPerPage={pageSize}
					                 labelRowsPerPage="מספר רשומות בדף:"
					                 rowsPerPageOptions={[5,10,20]}
					                 onPageChange={handlePageChange}
					                 onRowsPerPageChange={handlePageSizeChange} />
				</div>
			</div>
		)
	};

	const onAddArea = () => {
		setShowAddField(true);
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
					ייצא
					<ExportIcon sx={{ paddingRight: "10%" }} />
				</Button>
				<Button onClick={onAddArea} variant="text" elevation={9} sx={addCropStyle}>
					<Add />
					הוספת שטח
				</Button>
			</GridToolbarContainer>
		);
	};

	const CustomCheckBox = () => {
		return <Checkbox color="success" />;
	};

	return (
		<Card
			dir="rtl"
			elevation={10}
			sx={{ marginTop: "3%", borderRadius: "14px" }}
		>

			{ showAddField && <AddField onClose={() => setShowAddField(false)} /> }

			<DataGrid
				rows={rows}
				sx={dataGridStyle}
				onRowClick={handleRowClick}
				columns={columns}
				paginationModel={{ page: page, pageSize: pageSize }}
				checkboxSelection
				disableRowSelectionOnClick
				disableColumnFilter
				hideFooterSelectedRowCount
				hideFooterPagination
				disableSelectionOnClick
				autoHeight
				rowThreshold={0}
				components={{
					Toolbar: Toolbar,
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
			<RowDetails onClose={handleClickRowClose} rowSet={editedRow} />
		</Card>
	);
};

export default DataTable;
