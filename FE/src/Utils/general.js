import {toast} from 'react-toastify';

export const validateEmail = (email) => {
	// Regular expression pattern for email validation
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Test the email against the pattern
	return emailPattern.test(email);
};

export const showToast = (msg) => {
	toast.success(msg, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
	});
};