/* eslint-disable react/prop-types */

function ErrorMessage({ error }) {
	return (
		<div className="text-red-500 text-xs ml-4 -translate-y-3">
			{error && error}
		</div>
	);
}

export default ErrorMessage;
