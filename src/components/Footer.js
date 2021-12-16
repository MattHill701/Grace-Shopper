import React from "react";

import "./myStyles.css";

const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div id="footer" className="container-fluid text-center text-md-left footer fixed-bottom">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Glorious Proteins</h5>
                <p>Welcome to Glorious Proteins</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">View Github</h5>
                <ul className="list-unstyled">
                    <li><a href="https://github.com/LoganGibler/Grace-Shopper">View Github</a></li>
                    <li><a href="#!"></a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase"></h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Glorious Proteins Link</a></li>
                    <li><a href="#!">Glorious Proteins Link</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>

export default Footer
