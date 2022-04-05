import React, { useState } from "react";
// import _ from "underscore";
import _ from "lodash";

import "./App.css";
import ReactTooltip from "react-tooltip";

import MyResponsiveChoropleth from "./MyResponsiveChoropleth";
import { TagCloud } from "react-tagcloud";

import { data } from "./mapData";

import assignmentData from "./assignmentData.json";

let filteredByYear = _.groupBy(assignmentData, "year");

// console.log(filteredByYear);
let uniqueYears = [...new Set(assignmentData.map((e) => e.year))];

function App() {
	const [content, setContent] = useState("");

	const [selectedYear, setSelectedYear] = useState(uniqueYears[0]);
	const [selectedYearData, setSelectedYearData] = useState(
		filteredByYear[selectedYear]
	);
	const [selectedTopic, setSelectedTopic] = useState("oil");
	const [selectedCardData, setSelectedCardData] = useState(
		_.groupBy(selectedYearData, "topic")[selectedTopic]
	);

	const [selectedCountry, setSelectedCountry] = useState("All");

	const countrySelection = (id) => {
		if (id === "reset") {
			setSelectedCardData(selectedYearData);
			setCountriesMap(countriesArray);
			return;
		}

		setSelectedCountry(id);
		setSelectedCardData(_.groupBy(selectedYearData, "id")[id]);
		setCountriesMap(_.groupBy(countriesArray, "id")[id]);

		console.log("here///////////");
		console.log(id);
		console.log(_.groupBy(selectedYearData, "id")[id]);
	};
	let uniqueTopics = [...new Set(selectedYearData.map((e) => e.topic))];
	//needed for initial topics

	let uniqueCountries = [...new Set(selectedCardData.map((e) => e.id))];

	let uniqueSectors = [...new Set(selectedYearData.map((e) => e.sector))];
	let uniqueRegions = [...new Set(selectedYearData.map((e) => e.region))];
	let uniquePestles = [...new Set(selectedYearData.map((e) => e.pestle))];
	let uniqueSources = [...new Set(selectedYearData.map((e) => e.source))];

	console.log("unique countries array " + uniqueCountries);
	// console.log(uniqueTopics);
	// console.log(uniqueSectors);
	// console.log(uniqueRegions);
	// console.log(uniquePestles);
	// console.log(uniqueSources);
	// console.log(uniqueYears);

	let filteredByTopic = _.groupBy(selectedYearData, "topic");

	// console.log(filteredByTopic);

	let filteredByCountry = _.groupBy(selectedCardData, "id");

	// console.log(filteredByCountry);

	const countriesObj = {};
	const countriesArray = [];

	uniqueCountries.map((e) =>
		countriesArray.push(
			(countriesObj["id"] = {
				id: e,
				value: Math.round(
					_.meanBy(
						_.groupBy(selectedCardData, "id")[e],
						(item) => item.intensity
					)
				).toFixed(1),
			})
		)
	);
	console.log(countriesArray);

	const [countriesMap, setCountriesMap] = useState(countriesArray);

	const topicsArrayCount = [];

	uniqueTopics.map((e) =>
		topicsArrayCount.push(
			(countriesObj["id"] = {
				id: e,
				count: filteredByTopic[e].length,
			})
		)
	);

	// console.log(topicsArrayCount);

	const customRenderer = (tag, size, color) => (
		<span
			key={tag.id}
			className="tag-cloud-tag"
			style={{
				animation: "blinker 5s ease-in-out infinite",
				animationDelay: `${Math.random() * 20}s`,
				fontSize: `${size / 2}em`,

				margin: "3px",
				padding: "3px",
				display: "inline-block",
			}}
		>
			{tag.id}
		</span>
	);

	const handleYearButton = (e) => {
		setSelectedYear(e.target.innerText);
		setSelectedYearData(filteredByYear[e.target.innerText]);
		setSelectedCardData(filteredByYear[e.target.innerText]);
	};
	const tagSelector = (topic) => {
		console.log(topic);
		const tagFiltered = _.groupBy(selectedCardData, "topic")[topic];
		console.log(tagFiltered);
		let newUniqueCountries = [...new Set(tagFiltered.map((e) => e.id))];
		console.log(newUniqueCountries);

		let newGroupedArray = _.groupBy(tagFiltered, "topic");

		console.log(newGroupedArray);
		const newArray = [];

		newUniqueCountries.map((e) =>
			newArray.push(
				(countriesObj["id"] = {
					id: e,
					value: Math.round(
						_.meanBy(newGroupedArray[topic], (item) => item.intensity)
					).toFixed(1),
				})
			)
		);
		console.log("here////");
		console.log(_.meanBy(newGroupedArray[topic], (item) => item.intensity));
		console.log(newArray);
		setCountriesMap(newArray);
	};
	return (
		<div className="main-container">
			<div className="year-box">
				<div className="selection-box">
					<p>Selected Year :</p>
					<span>{selectedYear}</span>
				</div>
				{uniqueYears.map((item) => (
					<button
						key={item}
						onClick={(e) => {
							handleYearButton(e);
						}}
					>
						{item}
					</button>
				))}
			</div>
			<div className="clouds">
				<div className="selection-box">
					<p>Selected Topic :</p>
					<span>{selectedTopic}</span>
				</div>
				<TagCloud
					tags={topicsArrayCount}
					minSize={1.75}
					maxSize={8}
					renderer={customRenderer}
					className="simple-cloud"
					onClick={
						(tag) => {
							try {
								setSelectedCardData(selectedYearData);
								setSelectedTopic(tag.id);
								setSelectedCountry("All");
								tagSelector(tag.id);
							} catch {
								countrySelection("reset");
							}
						}
						// console.log(`'${tag.id}' was selected!`
					}
				/>
			</div>

			<div className="container">
				<MyResponsiveChoropleth
					countriesMap={countriesMap}
					countrySelection={countrySelection}
				/>
			</div>
			<div className="selection-box">
				<p>Selected Country :</p>
				<span>{selectedCountry}</span>
			</div>
			<div className="card-box">
				{selectedCardData.map(
					(item) =>
						item.topic === selectedTopic && (
							<div key={item.title} className="card">
								<div className="info-box">
									<p>
										<span>Sector : </span> {item.sector}
									</p>
									<p>
										<span>Topic : </span> {item.topic}
									</p>
									<p>
										<span>Pestle : </span> {item.pestle}
									</p>
									<p>
										<span>Region : </span> {item.region}
									</p>

									<p>
										<span>Country : </span>
										{item.country}
									</p>
								</div>

								<div className="data">
									<p>
										<span>Insight : </span>
										{item.insight}
									</p>
									<p> {item.title}</p>
								</div>

								<div className="insight">
									<div className="data-box">
										<span>Relevance</span>
										<p> {item.relevance}</p>
									</div>
									<div className="data-box">
										<span>Likelihood</span>
										<p> {item.likelihood}</p>
									</div>
									<div className="data-box">
										<span>Intensity</span>
										<p> {item.intensity}</p>
									</div>
								</div>
								<div className="info-box source">
									<p>
										<span>Source : </span> {item.source}
									</p>
								</div>
							</div>
						)
				)}
			</div>
		</div>
	);
}

export default App;
