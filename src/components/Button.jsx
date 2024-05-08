/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
function ButtonContainer({ children, event, variant }) {
	return (
		<Button
			type="submit"
			variant={variant || "contained"}
			onClick={event}
			size="large"
		>
			{children}
		</Button>
	);
}

export default ButtonContainer;
