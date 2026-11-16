import React from 'react'

function ChartBar(props) {
  const fillHeight = props.maxValue > 0 ? Math.round((props.value / props.maxValue) * 100) : 0;

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div className="chart-bar__fill" style={{ height: `${fillHeight}%` }} />
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </div>
  );
}

export default ChartBar
