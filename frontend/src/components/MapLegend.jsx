export default function MapLegend() {
  return (
    <div className="map-legend" aria-label="Table status legend">
      <span><i className="legend-dot available-dot" /> Available</span>
      <span><i className="legend-dot occupied-dot" /> Occupied</span>
    </div>
  );
}