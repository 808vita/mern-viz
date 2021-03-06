// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/geo
import React, { memo } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import worldData from "./world_countries.json";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveChoropleth = ({
	countriesMap /* see data tab */,
	countrySelection,
}) => {
	// console.log(countriesMap);
	const data = countriesMap;
	return (
		<ResponsiveChoropleth
			data={data}
			features={worldData.features}
			margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
			onClick={(feature) => {
				try {
					countrySelection(feature.data.id);
				} catch {
					console.log("oof no object");
					countrySelection("reset");
				}

				// console.log(feature.data);
			}}
			colors="nivo"
			domain={[0, 10]}
			unknownColor="#666666"
			label="properties.name"
			valueFormat=".2s"
			projectionTranslation={[0.5, 0.5]}
			projectionRotation={[0, 0, 0]}
			enableGraticule={true}
			graticuleLineColor="#dddddd"
			borderWidth={0.5}
			borderColor="#152538"
			legends={[
				{
					anchor: "bottom-left",
					direction: "column",
					justify: true,
					translateX: 20,
					translateY: -100,
					itemsSpacing: 0,
					itemWidth: 94,
					itemHeight: 18,
					itemDirection: "left-to-right",
					itemTextColor: "#444444",
					itemOpacity: 0.85,
					symbolSize: 18,
					effects: [
						{
							on: "hover",
							style: {
								itemTextColor: "#000000",
								itemOpacity: 1,
							},
						},
					],
				},
			]}
		/>
	);
};

export default memo(MyResponsiveChoropleth);
