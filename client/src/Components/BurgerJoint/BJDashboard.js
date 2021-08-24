import React, {useEffect, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import getProxy from "../../proxyConfig";
export default function BJDashboard(){


    return <div>
        <div id="colorlib-main">
            <section className="ftco-section pt-4 mb-5 ftco-intro">
                <div className="container-fluid px-3 px-md-0">



                    <h3 style={{color: "#0c5460"}}>Modify the Burgers</h3>
                    <div className="row mt-3 mb-3">

                        <div className="col-md-2">
                            <button type="button" className="btn btn-info" ><i className="far fa-file-alt"></i>Generate Report</button>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="card w-75">
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-3">
                                        <input type="text" className="form-control" type={"text"}  placeholder={"all"}  id={"name"}/>
                                    </div>

                                    <div className="col-md-2">
                                        <button type="button" name="search" className="btn btn-primary" >Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                            <tr>

                                <th scope="col">Burger Type</th>
                                <th scope="col">Price</th>

                                <th scope="col">Ingredients</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>

                        </table>
                    </div>

                </div>

            </section>
        </div>
    </div>
}