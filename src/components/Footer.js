import React from "react";

import "./myStyles.css";

const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div id="footer" className="container-fluid text-center text-md-left footer fixed-bottom">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Footer stuff</h5>
                <p>continued footer content</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="https://github.com/LoganGibler/Grace-Shopper">View Github</a></li>
                    <li><a href="#!">Link 2</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Link 1</a></li>
                    <li><a href="#!">Link 2</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>

export default Footer