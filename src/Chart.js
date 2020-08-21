// import React from 'react'
// import { Chart } from 'react-charts'
//
// function MyChart(props) {
//     console.log(props.data)
//     const data = React.useMemo(
//         () => [
//             {
//                 label: 'Series 1',
//                 data: [["2020-08-19", 261.388], ["2020-08-29", 265.388]]
//             },
//
//         ],
//         []
//     )
//
//     const axes = React.useMemo(
//         () => [
//             { primary: true, type: 'linear', position: 'left' },
//             { type: 'linear', position: 'bottom' }
//         ],
//         []
//     )
//
//     const lineChart = (
//         // A react-chart hyper-responsively and continuously fills the available
//         // space of its parent element automatically
//         <div
//             style={{
//                 width: '400px',
//                 height: '300px'
//             }}
//         >
//             <Chart data={data} axes={axes} />
//         </div>
//     )
//     return lineChart;
// }
//
//
// export default MyChart;
