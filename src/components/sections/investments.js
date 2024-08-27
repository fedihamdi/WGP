import React, { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';

const StyledInvestmentsSection = styled.section`
  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .tradingview-widget-container {
    width: 100%;
    height: 100px; /* Adjust height for ticker tape */
    position: relative; /* Ensure proper positioning */
    margin-bottom: 20px; /* Spacing between ticker tape and graph */
  }

  .tradingview-widget-container__widget {
    width: 100% !important;
    height: 100% !important;
    position: absolute; /* Ensure widget fits the container */
  }

  .tradingview-widget-graph {
    width: 100%;
    height: 400px; /* Adjust height as needed */
    position: relative; /* Ensure proper positioning */
  }
`;

function Investments() {
  const revealContainer = useRef(null);
  const tickerTapeContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());

    // Load Ticker Tape Widget
    const tickerTapeScript = document.createElement("script");
    tickerTapeScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    tickerTapeScript.type = "text/javascript";
    tickerTapeScript.async = true;
    tickerTapeScript.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500 Index" },
        { "proName": "INDEX:CAC40", "title": "CAC 40" },
        { "proName": "FOREXCOM:NSXUSD", "title": "US 100 Cash CFD" },
        { "proName": "FX_IDC:EURUSD", "title": "EUR to USD" },
        { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
        { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" }
      ],
      "showSymbolLogo": true,
      "isTransparent": true,
      "displayMode": "adaptive",
      "colorTheme": "dark",
      "locale": "en"
    });

    if (tickerTapeContainer.current) {
      tickerTapeContainer.current.appendChild(tickerTapeScript);
    } else {
      console.error('Ticker tape container ref is null');
    }

    // Load Symbol Overview Widget
    const overviewScript = document.createElement("script");
    overviewScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    overviewScript.type = "text/javascript";
    overviewScript.async = true;
    overviewScript.innerHTML = JSON.stringify({
      "symbols": [
        ["Apple", "AAPL|1D"],
        ["Google", "GOOGL|1D"],
        ["Microsoft", "MSFT|1D"]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "light",
      "autosize": true,
      "showVolume": true,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "candlesticks",
      "maLineColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "headerFontSize": "small",
      "gridLineColor": "rgba(178, 40, 51, 0.17)",
      "backgroundColor": "rgba(0, 51, 42, 0.24)",
      "widgetFontColor": "rgba(149, 152, 161, 0.97)",
      "lineType": 0,
      "dateRanges": ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
      "downColor": "#f7525f",
      "upColor": "#22ab94",
      "borderUpColor": "#22ab94",
      "borderDownColor": "#f7525f",
      "wickUpColor": "#22ab94",
      "wickDownColor": "#f7525f"
    });

    if (revealContainer.current) {
      revealContainer.current.appendChild(overviewScript);
    } else {
      console.error('Overview container ref is null');
    }

    // Cleanup function to remove script tags when component unmounts
    return () => {
      if (tickerTapeContainer.current) {
        tickerTapeContainer.current.removeChild(tickerTapeScript);
      }
      if (revealContainer.current) {
        revealContainer.current.removeChild(overviewScript);
      }
    };
  }, []);

  return (
    <StyledInvestmentsSection id="investments">
      <div className="tradingview-widget-container" ref={tickerTapeContainer}>
        {/* Ticker Tape Widget */}
      </div>
    </StyledInvestmentsSection>
  );
}

export default memo(Investments);
