import React, { useState, useEffect } from "react";
import App from "./App";

const HomePage = () => {
	const [loading, setLoading] = useState(true);
	const [assignmentData, setAssignmentData] = useState([]);

	const getVizDataFromDb = async () => {
		const response = await fetch("/api/data");
		const data = await response.json();
		setAssignmentData(data);
		setLoading(false);
	};

	useEffect(() => {
		console.log("refreshed");
		getVizDataFromDb();
	}, []);

	return (
		<div className="main-container">
			{!loading ? (
				<App assignmentData={assignmentData} />
			) : (
				<div className="loading-card">
					<p>Loading...</p>
				</div>
			)}
		</div>
	);
};

export default HomePage;
