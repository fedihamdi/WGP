import React, { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';
import { Layout } from '@components'; // Adjust import based on your Layout component location
import { srConfig } from '@config';   // Adjust based on your srConfig location
import sr from '@utils/sr';           // Adjust based on your ScrollReveal utility location

const StyledInvestmentsSection = styled.section`
  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .tradingview-widget-container {
    width: 100%;
    height: 1000px;
    position: relative;
    margin-bottom: 50px;
  }

  .tradingview-widget-container__widget {
    position: absolute;
  }

  .tradingview-widget-graph {
    width: 100%;
    position: relative;
  }
  
`;

const InvestmentsPage = ({ location }) => {
  const revealContainer = useRef(null);
  const tickerTapeContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());

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

    const overviewScript = document.createElement("script");
    overviewScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    overviewScript.type = "text/javascript";
    overviewScript.async = true;
    overviewScript.innerHTML = JSON.stringify({
      "symbols": [
        ["Apple", "AAPL|1M"],
        ["Google", "GOOGL|1M"],
        ["Microsoft", "MSFT|1M"]
      ],
      "chartOnly": false,
      "width": "100%",
      "locale": "en",
      "colorTheme": "dark",
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
      "wickDownColor": "#f7525f",
      "button": "#d6dae6",
    });

    if (revealContainer.current) {
      revealContainer.current.appendChild(overviewScript);
    } else {
      console.error('Overview container ref is null');
    }

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
    <Layout location={location}>
      <StyledInvestmentsSection id="investments">
        <div className="tradingview-widget-container" ref={tickerTapeContainer}>
          {/* Ticker Tape Widget */}
        </div>
        <div className="tradingview-widget-container" ref={revealContainer}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </StyledInvestmentsSection>
    </Layout>
  );
};

export default memo(InvestmentsPage);
