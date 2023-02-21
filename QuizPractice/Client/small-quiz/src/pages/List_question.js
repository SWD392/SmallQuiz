import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';


export default function List_question() {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    async function getQuestions() {
      const res = await axios.get('http://localhost:8080/admin/listQuestions')
      return res
    }

    getQuestions().then(res => setInfo(res.data))
  }, [])

  console.log(info);



  return (
      <div>
        <div className="main-content">
          <div className="container mt-7">
            {/* Table */}
            <h2 className="mb-5">Question List</h2><div className="row">
              <div className="col">
                <div className="card shadow">
                  <div className="card-header border-0">
                    <h3 className="mb-0">Question List</h3>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center table-flush">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Create Date</th>
                          <th scope="col">
                            <button>
                              View Answer
                            </button>

                          </th>
                        </tr>
                        {
                          info.map((item) => (
                            <tr>
                              <td>{item.id}</td>
                              <td>{item.createDate}</td>
                            </tr>
                          ))
                        }
                      </thead>
                      {/* <tbody>
                  <tr>
                    <th scope="row">
                      <div className="media align-items-center">
                        <a href="#" className="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/bootstrap.jpg" />
                        </a>
                        <div className="media-body">
                          <span className="mb-0 text-sm">Argon Design System</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      $2,500 USD
                    </td>
                    <td>
                      <span className="badge badge-dot mr-4">
                        <i className="bg-warning" /> pending
                      </span>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Ryan Tompson">
                 
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Romina Hadid">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-2-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Alexander Smith">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-2-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Jessica Doe">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-4-800x800.jpg" className="rounded-circle" />
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <div className="progress">
                            <div className="progress-bar bg-warning" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: '60%'}} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="dropdown">
                        <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-ellipsis-v" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Another action</a>
                          <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="media align-items-center">
                        <a href="#" className="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/angular.jpg" />
                        </a>
                        <div className="media-body">
                          <span className="mb-0 text-sm">Angular Now UI Kit PRO</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      $1,800 USD
                    </td>
                    <td>
                      <span className="badge badge-dot">
                        <i className="bg-success" /> completed
                      </span>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Ryan Tompson">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-1-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Romina Hadid">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-2-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Alexander Smith">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-3-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Jessica Doe">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-4-800x800.jpg" className="rounded-circle" />
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">100%</span>
                        <div>
                          <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="dropdown">
                        <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-ellipsis-v" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Another action</a>
                          <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="media align-items-center">
                        <a href="#" className="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/sketch.jpg" />
                        </a>
                        <div className="media-body">
                          <span className="mb-0 text-sm">Black Dashboard</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      $3,150 USD
                    </td>
                    <td>
                      <span className="badge badge-dot mr-4">
                        <i className="bg-danger" /> delayed
                      </span>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Ryan Tompson">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-1-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Romina Hadid">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-2-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Alexander Smith">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-3-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Jessica Doe">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-4-800x800.jpg" className="rounded-circle" />
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">72%</span>
                        <div>
                          <div className="progress">
                            <div className="progress-bar bg-danger" role="progressbar" aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} style={{width: '72%'}} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="dropdown">
                        <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-ellipsis-v" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Another action</a>
                          <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="media align-items-center">
                        <a href="#" className="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/react.jpg" />
                        </a>
                        <div className="media-body">
                          <span className="mb-0 text-sm">React Material Dashboard</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      $4,400 USD
                    </td>
                    <td>
                      <span className="badge badge-dot">
                        <i className="bg-info" /> on schedule
                      </span>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Ryan Tompson">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-1-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Romina Hadid">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-2-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Alexander Smith">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-3-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Jessica Doe">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-4-800x800.jpg" className="rounded-circle" />
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">90%</span>
                        <div>
                          <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} style={{width: '90%'}} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="dropdown">
                        <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-ellipsis-v" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Another action</a>
                          <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="media align-items-center">
                        <a href="#" className="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/vue.jpg" />
                        </a>
                        <div className="media-body">
                          <span className="mb-0 text-sm">Vue Paper UI Kit PRO</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      $2,200 USD
                    </td>
                    <td>
                      <span className="badge badge-dot mr-4">
                        <i className="bg-success" /> completed
                      </span>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Ryan Tompson">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-1-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Romina Hadid">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-2-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Alexander Smith">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-3-800x800.jpg" className="rounded-circle" />
                        </a>
                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Jessica Doe">
                          <img alt="Image placeholder" src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/team-4-800x800.jpg" className="rounded-circle" />
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">100%</span>
                        <div>
                          <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="dropdown">
                        <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-ellipsis-v" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Another action</a>
                          <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody> */}
                    </table>
                  </div>
                  <div className="card-footer py-4">
                    <nav aria-label="...">
                      <ul className="pagination justify-content-end mb-0">
                        <li className="page-item disabled">
                          <a className="page-link" href="#" tabIndex={-1}>
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            {/* Dark table */}

          </div>
        </div>
        <footer className="footer">
          <div className="row align-items-center justify-content-xl-between">
            <div className="col-xl-6 m-auto text-center">
              <div className="copyright"><p>Made with <a href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">Argon Dashboard</a> by Creative Tim</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
}
