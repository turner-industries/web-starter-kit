/** @jsx createElement */
import { createElement } from 'react';
import './footer.scss';

const AppFooter = () => (
  <div id="footer-container">
    <footer id="site-footer">
      <div id="support-bar">
        <p className="text-center" id="call">
          Call <a href="tel:1-800-288-6503">1-800-288-6503</a> for support.
        </p>
      </div>
      <div className="ui container">
        <div id="footer-content">
          <p className="text-center">
            <a href="http://turner-industries.com">
              <img
                id="turner-industries-logo"
                src={require('../img/logo-print.png')}
                alt="Turner Industries"
              />
            </a>
          </p>
          <p className="text-center">
            {
              `© Turner Industries Group, LLC ${new Date().getFullYear()}. All Rights Reserved.`
            }
          </p>
        </div>
      </div>
    </footer>
  </div>
);

export default AppFooter;
