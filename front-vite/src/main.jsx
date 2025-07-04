import React from "react"
import ReactDOM from "react-dom/client"
import App from "./router/App.jsx"
import "./index.css"
import AppTheme from "./theme/AppTheme.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AppTheme>
			<App />
		</AppTheme>
	</React.StrictMode>
)
