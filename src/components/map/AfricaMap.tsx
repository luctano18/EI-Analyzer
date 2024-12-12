import React, { useState, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { categories } from '../../data/categories';
import type { EICategory } from '../../types';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/africa.json";

interface CountryData {
  name: string;
  categories: EICategory[];
  description: string;
}

interface Props {
  onCountrySelect?: (country: string, data: CountryData) => void;
}

const countryData: Record<string, CountryData> = {
  "Nigeria": {
    name: "Nigeria",
    categories: ["self-awareness", "empathy"],
    description: "Rich in Yoruba and Igbo wisdom traditions focusing on self-knowledge and community harmony"
  },
  "Kenya": {
    name: "Kenya",
    categories: ["motivation", "social-skills"],
    description: "Maasai and Kikuyu teachings emphasize personal growth and leadership"
  },
  "South Africa": {
    name: "South Africa",
    categories: ["empathy", "self-regulation"],
    description: "Ubuntu philosophy centers on human interconnectedness and emotional balance"
  },
  "Ghana": {
    name: "Ghana",
    categories: ["self-awareness", "motivation"],
    description: "Akan proverbs guide personal development and goal achievement"
  },
  "Ethiopia": {
    name: "Ethiopia",
    categories: ["self-regulation", "social-skills"],
    description: "Ancient wisdom traditions emphasizing emotional control and social harmony"
  },
  "Tanzania": {
    name: "Tanzania",
    categories: ["empathy", "social-skills"],
    description: "Swahili coastal wisdom blending community values with emotional intelligence"
  }
};

const AfricaMap = ({ onCountrySelect }: Props) => {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="relative w-full h-[250px] bg-gradient-to-b from-amber-50/50 to-orange-50/50 rounded-lg shadow-inner">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 225,
          center: [17, 3]
        }}
        className="w-full h-full"
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const country = countryData[countryName];
                const isHighlighted = !!country;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    data-tooltip-id="country-tooltip"
                    data-tooltip-content={
                      country
                        ? `${country.name}\n${country.categories.map(cat => 
                            categories[cat].title
                          ).join(", ")}`
                        : countryName
                    }
                    onMouseEnter={() => {
                      if (country) {
                        setTooltipContent(`
                          <div class="font-medium">${country.name}</div>
                          <div class="text-sm mt-1">${country.description}</div>
                          <div class="text-xs mt-2">
                            Categories: ${country.categories.map(cat => 
                              categories[cat].title
                            ).join(", ")}
                          </div>
                        `);
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => {
                      if (country && onCountrySelect) {
                        onCountrySelect(countryName, country);
                      }
                    }}
                    style={{
                      default: {
                        fill: isHighlighted ? "#D97706" : "#E5E7EB",
                        stroke: "#FFF",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "all 250ms"
                      },
                      hover: {
                        fill: isHighlighted ? "#B45309" : "#D1D5DB",
                        stroke: "#FFF",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: isHighlighted ? "pointer" : "default"
                      },
                      pressed: {
                        fill: "#92400E",
                        stroke: "#FFF",
                        strokeWidth: 0.5,
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <Tooltip
        id="country-tooltip"
        html={tooltipContent}
        className="!bg-white !text-gray-900 !shadow-lg !rounded-lg !p-3 !max-w-xs !opacity-100"
      />

      <div className="absolute bottom-2 left-2 bg-white/90 p-2 rounded-lg shadow-sm">
        <h4 className="text-xs font-medium text-gray-900 mb-1">Legend</h4>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-600 rounded-sm"></div>
          <span className="text-xs text-gray-700">Countries with EI traditions</span>
        </div>
      </div>
    </div>
  );
};

export default memo(AfricaMap);