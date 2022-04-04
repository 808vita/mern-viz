import React, { useState } from "react";
// import _ from "underscore";
import _ from "lodash";

import "./App.css";
import ReactTooltip from "react-tooltip";

import MyResponsiveChoropleth from "./MyResponsiveChoropleth";
import { TagCloud } from "react-tagcloud";

import { data } from "./mapData";

import assignmentData from "./assignmentData.json";

let uniqueCountries = [...new Set(assignmentData.map((e) => e.id))];
let uniqueTopics = [...new Set(assignmentData.map((e) => e.topic))];
let uniqueSectors = [...new Set(assignmentData.map((e) => e.sector))];
let uniqueRegions = [...new Set(assignmentData.map((e) => e.region))];
let uniquePestles = [...new Set(assignmentData.map((e) => e.pestle))];
let uniqueSources = [...new Set(assignmentData.map((e) => e.source))];
let uniqueYears = [...new Set(assignmentData.map((e) => e.year))];

console.log("unique countries array " + uniqueCountries);
// console.log(uniqueTopics);
// console.log(uniqueSectors);
// console.log(uniqueRegions);
// console.log(uniquePestles);
// console.log(uniqueSources);
// console.log(uniqueYears);

const countriesObj = {};
const countriesArray = [];
console.log(
	uniqueCountries.map((e) =>
		countriesArray.push(
			(countriesObj["id"] = { id: e, value: Math.random() * 10 })
		)
	)
);

console.log(countriesArray);

const topicsArrayCount = [];
console.log(
	uniqueTopics.map((e) =>
		topicsArrayCount.push(
			(countriesObj["id"] = { id: e, count: Math.random() * 20 })
		)
	)
);

console.log(topicsArrayCount);

let filteredByYear = _.groupBy(assignmentData, "year");

console.log(filteredByYear);

let result = _.groupBy(filteredByYear[2017], "topic");

console.log(result);

function App() {
	const [content, setContent] = useState("");
	const customRenderer = (tag, size, color) => (
		<span
			key={tag.id}
			className="tag-cloud-tag"
			style={{
				animation: "blinker 5s ease-in-out infinite",
				animationDelay: `${Math.random() * 60}s`,
				fontSize: `${size / 2}em`,

				margin: "3px",
				padding: "3px",
				display: "inline-block",
			}}
		>
			{tag.id}
		</span>
	);

	return (
		<div className="main-container">
			<div>
				{uniqueYears.map((item) => (
					<button key={item} onClick={(e) => console.log(e.target.innerText)}>
						{item}
					</button>
				))}
			</div>
			<div className="clouds">
				<TagCloud
					tags={topicsArrayCount}
					minSize={1}
					maxSize={3}
					renderer={customRenderer}
					className="simple-cloud"
					onClick={(tag) => console.log(`'${tag.id}' was selected!`)}
				/>
			</div>
			<div className="container">
				<MyResponsiveChoropleth countriesArray={countriesArray} />
			</div>

			<div className="card-box">
				{assignmentData.map(
					(item) =>
						item.topic === "oil" && (
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
