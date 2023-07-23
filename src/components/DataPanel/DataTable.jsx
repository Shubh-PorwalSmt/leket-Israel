import React, {useContext, useState, useEffect} from 'react';
import {Button, Card, Checkbox, TablePagination} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import * as fieldActions from '../../redux/Field/actions';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {DataGrid, GridActionsCellItem, GridToolbarContainer, useGridApiContext} from "@mui/x-data-grid";
import {Add, Delete} from "@mui/icons-material";
import {createSvgIcon} from "@mui/material/utils";
import CustomStatus from "./CustomStatus";
import AddField from '../../views/AddField';
import {confirmAlert} from 'react-confirm-alert';
import * as XLSX from "xlsx/xlsx.mjs";
import RowDetails from "./RowDetails";
import DelayReason from "../DelayReason";
import translator from "../../Utils/translations/translator";
import ContextProvider from "../../hooks/ContextApi";
import {getFieldLastUpdated} from "../../Utils/general";

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

const DataTable = ({rows, onAddField}) => {
	const { page } = useContext(ContextProvider);
	const { setPage } = useContext(ContextProvider);
	const { pageSize } = useContext(ContextProvider);
	const { setPageSize } = useContext(ContextProvider);
	const [editedRow, setEditedRow] = useState(null);
	const dispatch = useDispatch();
	const totalFields = useSelector(state => state.field.fieldCount);

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const confirmDelete = (field) => {
		confirmAlert({
			title: 'מחיקת שטח',
			message: `השטח "${field.row.name}" ימחק. האם להמשיך?`,
			buttons: [
				{
					label: 'כן',
					onClick: () => dispatch(fieldActions.deleteField(field.id))
				},
				{
					label: 'לא',
					onClick: () => {}
				}
			]
		});
	};

	const handlePageSizeChange = (event) => {
		setPageSize(parseInt(event.target.value, 10));
		setPage(0);
	};

	const columns = [
		{
			field: "id",
			headerName: "ID"
		},
		{
			field: "name",
			headerName: "שם השטח",
			editable: false,
			sortable: false,
			flex: 2,
		},
		{
			field: "product_name",
			headerName: "סוג יבול",
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params) => (<div>{translator(params.value)}</div>),
		},
		{
			field: "latest_attractiveness_metric",
			headerName: "מדד אטרקטיביות",
			flex: 1,
			editable: false,
			sortable: false,
			renderCell: (params) => <div>{params.value ? (parseInt(params.value * 100) / 100) : '-'}</div>
		},
		{
			field: "latest_satellite_metric",
			headerName: "NDVI",
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params) => <div>{params.value ? (parseInt(params.value * 100) / 100) : '-'}</div>
		},
		{
			field: "region",
			headerName: "אזור",
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params) => (<div>{translator(params.value)}</div>),
		},
		{
			field: "farmer_id",
			headerName: "מספר חקלאי",
			editable: false,
			sortable: false,
			flex: 1,
		},
		{
			field: "familiarity",
			headerName: "מצב היכרות",
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params) => (<div>{translator(params.value)}</div>),
		},
		{
			field: "status_date",
			headerName: "עדכון סטטוס",
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params) => getFieldLastUpdated(params.row),
		},
		{
			field: "status",
			headerName: "סטטוס",
			width: 140,
			editable: false,
			sortable: false,
			renderCell: (params) => <CustomStatus fieldId={params.id} removeAllOption status={params.value} label={translator(params.value)} />,
		},
		// {
		// 	field: "actions",
		// 	type: "actions",
		// 	width: 50,
		// 	getActions: (params) => [
		// 		<GridActionsCellItem
		// 			icon={<Delete />}
		// 			label="מחק שטח"
		// 			onClick={() => confirmDelete(params)}
		// 			showInMenu
		// 		/>
		// 	],
		// }
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

	const handleRowClick = async (params) => {
		const statusColumn = isStatusColumn(event.target);
		if(!statusColumn) {
			await dispatch(fieldActions.loadFieldHistory(params.row.id));
			setEditedRow(params.row);
		}
	};

	const handleClickRowClose = () => {
		setEditedRow(null);
	};

	const pagingLabel = ({ from, to, count }) => {
		return (
			<span style={{padding: '0 20px'}}> שדות {from}–{to} מתוך {count} </span>
		)
	};

	const Toolbar = () => {
		return (
			<div style={{display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
				<GridHeaderButtons />

				<TablePagination page={page}
				                 component="div"
				                 labelDisplayedRows={pagingLabel}
				                 count={totalFields}
				                 rowsPerPage={pageSize}
				                 labelRowsPerPage="מספר רשומות בדף:"
				                 rowsPerPageOptions={[5,10,20]}
				                 onPageChange={handlePageChange}
				                 onRowsPerPageChange={handlePageSizeChange}
				                 ActionsComponent={TablePaginationActions}

				/>
			</div>
		)
	};

	function TablePaginationActions(props) {
		const { count, page, rowsPerPage, onChangePage } = props;

		const handlePrevButtonClick = () => {
			setPage(page - 1);
		};

		const handleNextButtonClick = () => {
			setPage(page + 1);
		};

		return (
			<>
				<IconButton
					onClick={handlePrevButtonClick}
					disabled={page === 0}
					title="לדף הקודם"
					aria-label="Previous Page"
				>
					<KeyboardArrowRightIcon />
				</IconButton>
				<IconButton
					onClick={handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					title="לדף הבא"
					aria-label="Next Page"
				>
					<KeyboardArrowLeftIcon />
				</IconButton>
			</>
		);
	}

	const GridHeaderButtons = () => {
		const apiRef = useGridApiContext();

		const addFieldStyle = {
			borderRadius: "12px",
			marginRight: "12px",
			backgroundColor: "white",
			color: "#3A6E47",
			fontWeight: "700",
			"&:hover": {
				backgroundColor: "#eaf0ee",
			},
		};

		const exportFieldsStyle = {
			direction: "ltr",
			color: "#5cb85c",
			borderRadius: "10px",
			fontWeight: "bold",
			fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
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
					sx={exportFieldsStyle}
					onClick={() => handleExport({ getRowsToExport: getFilteredRows })}
				>
					ייצא
					<ExportIcon sx={{ paddingRight: "10%" }} />
				</Button>
				<Button onClick={onAddField} variant="text" elevation={9} sx={addFieldStyle}>
					<Add />
					הוספת שטח
				</Button>
			</GridToolbarContainer>
		);
	};

	const CustomNoRowsOverlay = () => (
		<div style={{ textAlign: 'center', padding: '40px', fontSize: '20px' }}>
			אין תוצאות
		</div>
	);

	const CustomCheckBox = () => {
		return <Checkbox color="success" />;
	};

	return (
		<Card
			dir="rtl"
			elevation={10}
			sx={{ marginTop: "3%", borderRadius: "14px" }}
		>

			{ editedRow && <RowDetails onClose={handleClickRowClose} rowSet={editedRow} /> }

			<DataGrid
				rows={rows}
				autoHeight
				sx={dataGridStyle}
				onRowClick={handleRowClick}
				columns={columns}
				paginationModel={{ page: page, pageSize: pageSize }}
				checkboxSelection
				disableRowSelectionOnClick
				disableColumnMenu
				disableColumnFilter
				hideFooterSelectedRowCount
				hideFooterPagination
				disableSelectionOnClick
				rowThreshold={0}
				components={{
					Toolbar: Toolbar,
					Checkbox: CustomCheckBox,
					NoRowsOverlay: CustomNoRowsOverlay
				}}
				initialState={{
					columns: {
						columnVisibilityModel: {
							id: false,
						},
					},
				}}
			/>
		</Card>
	);
};

export default DataTable;
