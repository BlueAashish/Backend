const products = [
  {
    id: 1,
    name: "Telemetry System",
    description:
      `
  <div>
    <h1>Industrial Telemetry System</h1>
    <p>
      Our <strong>Industrial Telemetry System</strong> is a compact and intelligent data acquisition unit designed
      for real-time remote monitoring of industrial equipment. It reads data from <strong>MODBUS RTU (RS485)</strong> 
      compatible sensors and instruments and transmits the collected data securely to a cloud server or central control system.
    </p>
    <p>
      This plug-and-play system is ideal for applications such as flow meters, water analyzers, energy meters, pressure sensors, and more.
      With built-in fault detection, data buffering, and power-efficient operation, this unit ensures seamless and accurate data delivery,
      even in harsh field conditions.
    </p>

    <h3>Applications:</h3>
    <ul>
      <li>Groundwater monitoring (CGWA-compliant setups)</li>
      <li>Flow and water quality monitoring systems</li>
      <li>Remote industrial process monitoring</li>
      <li>Agricultural and municipal telemetry</li>
      <li>Energy and utility infrastructure tracking</li>
    </ul>

   
  </div>
`,
    specification: `
    
    
    <h3>Technical Specification:</h3>
    <table border="1" cellpadding="8" cellspacing="0">
      <tr><th>Enclosure</th><td>Waterproof IP65 box</td></tr>
      <tr><th>Network Interface</th><td>GSM/4G, Wi-Fi (as per model)</td></tr>
      <tr><th>Input Protocol</th><td>MODBUS RTU over RS485</td></tr>
      <tr><th>Data Format</th><td>JSON / CSV / XML</td></tr>
      <tr><th>Temperature</th><td>-10°C to +60°C</td></tr>
      <tr><th>Input Voltage</th><td>230 VAC</td></tr>
      <tr><th>Country of Origin</th><td>Made in India</td></tr>
    </table>`,
    images: [
      "http://localhost:5000/images/telemetry-system/image1.JPG",
      "http://localhost:5000/images/telemetry-system/image2.JPG",
      "http://localhost:5000/images/telemetry-system/image3.JPG",
      "http://localhost:5000/images/telemetry-system/image4.JPG",
      "http://localhost:5000/images/telemetry-system/image5.JPG",
    ],
  },
  {
    id: 2,
    name: "Digital Water Level Recorder",
    description:
      `<div>
        <h1>Digital Water Level Recorder (DWLR)</h1>
        <h2>by BlueTrack Technologies</h2>

        <p>
          The <strong>Digital Water Level Recorder (DWLR)</strong> by <strong>BlueTrack Technologies</strong> is a high-precision,
          microcontroller-based monitoring system designed to accurately measure groundwater levels in
          borewells, piezometers, open wells, and other water reservoirs.
        </p>
        <p>
          Equipped with a stainless steel piezometric sensor and a digital display unit, this system delivers real-time,
          error-free data with exceptional reliability.
        </p>
        <p>
          Engineered for CGWA compliance and field durability, it is ideal for use in industries,
          government water monitoring agencies, construction sites, and smart water projects. The DWLR also supports
          remote telemetry, enabling integration with cloud servers for automated reporting.
        </p>

        <h3>Applications:</h3>
        <ul>
          <li>Borewell and groundwater monitoring</li>
          <li>Construction site dewatering monitoring</li>
          <li>Rainwater harvesting system audits</li>
          <li>Industrial and agricultural water usage compliance</li>
          <li>CGWA online monitoring integration</li>
        </ul>
      </div > `,
    specification: `  <h3>Specifications:</h3>
        <table border="1" cellpadding="8" cellspacing="0">
          <tr><th>Material</th><td>Stainless Steel</td></tr>
          <tr><th>Type</th><td>Digital</td></tr>
          <tr><th>Operating Temperature</th><td>-10°C to +60°C</td></tr>
          <tr><th>Brand</th><td>BlueTrack Technologies</td></tr>
          <tr><th>Display</th><td>4.3" TFT screen with real-time readings</td></tr>
          <tr><th>Measuring Range</th><td>Up to 100 meters (customizable)</td></tr>
          <tr><th>Enclosure</th><td>IP65 rated</td></tr>
        </table>`,
    images: [
      "http://localhost:5000/images/digital-water-level-recorder/image1.jpg",
      "http://localhost:5000/images/digital-water-level-recorder/image2.jpg",
      "http://localhost:5000/images/digital-water-level-recorder/image3.jpg",
      "http://localhost:5000/images/digital-water-level-recorder/image4.jpg",
      "http://localhost:5000/images/digital-water-level-recorder/image5.jpg",
      "/images/digital-water-level-recorder/image6.jpg",
    ],
  },
];

module.exports = products;
