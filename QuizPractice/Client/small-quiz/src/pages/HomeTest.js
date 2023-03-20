import React from "react";
import { Navbar } from "./Navbar";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export default function HomeTest() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>
        {/* Responsive navbar*/}
        {/* Header*/}
        <Navbar />
        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-6">
                <div className="text-center my-5">
                  <h1 className="display-5 fw-bolder text-black mb-2">
                    Quickly find or create anything in your curriculum
                  </h1>
                  <p className="lead text-black-50 mb-4">
                    Motivate every student to mastery with easy-to-customize
                    content combined with tools for inclusive assessment,
                    instruction, and practice.
                  </p>
                  <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                    <Link
                      className="btn btn-primary btn-lg px-4 me-sm-3"
                      to="/quiz"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Features section*/}
        <section className="py-5 border-bottom" id="features">
          <div className="container px-5 my-5">
            <div className="row gx-5">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-collection" />
                </div>
                <h2 className="h4 fw-bolder">About Me</h2>
                <p>
                  {" "}
                  How does sampling gets accomplished with a sensing strip being
                  used for image acquisition?
                </p>
                <a className="text-decoration-none" href="#!">
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-building" />
                </div>
                <h2 className="h4 fw-bolder">About Me</h2>
                <p>
                  By the end of this project, you will be ready to use Quizizz
                  with your students to create gamified quizzes, polls, and
                  lessons. Whether you are teaching online or in the classroom,
                  Quizizz allows you to gather valuable assessment data while
                  your students are actively engaged in a friendly competitive
                  game. Throughout each task, we will set up your Quizizz
                  account and learn how to create your own quizzes as well as
                  use the reporting feature to see how your students are
                  progressing. Engage your students as they learn through
                  Quizizz!.
                </p>
                <a className="text-decoration-none" href="#!">
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
              <div className="col-lg-4">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-toggles2" />
                </div>
                <h2 className="h4 fw-bolder">About Me</h2>
                <p>
                  free education & learning platform, for the global community
                  of students and working professionals, where they can practice
                  1 million+ multiple choice questions & answers (MCQs),
                  tutorials, programs & algorithms in engineering, programming,
                  science, and school subjects. Scroll down for the list of
                  popular topics or search below..
                </p>
                <a className="text-decoration-none" href="#!">
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Pricing section*/}

        {/* Testimonials section*/}
        <section className="py-5 border-bottom">
          <div className="container px-5 my-5 px-5">
            <div className="text-center mb-5">
              <h2 className="fw-bolder">Customer testimonials</h2>
              <p className="lead mb-0">Our customers love working with us</p>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-6">
                {/* Testimonial 1*/}
                <div className="card mb-4">
                  <div className="card-body p-4">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <i className="bi bi-chat-right-quote-fill text-primary fs-1" />
                      </div>
                      <div className="ms-4">
                        <p className="mb-1">
                          Thank you for putting together such a great product.
                          We loved working with you and the whole team, and we
                          will be recommending you to others!
                        </p>
                        <div className="small text-muted">
                          - Client Name, Location
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Testimonial 2*/}
                <div className="card">
                  <div className="card-body p-4">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <i className="bi bi-chat-right-quote-fill text-primary fs-1" />
                      </div>
                      <div className="ms-4">
                        <p className="mb-1">
                          The whole team was a huge help with putting things
                          together for our company and brand. We will be hiring
                          them again in the near future for additional work!
                        </p>
                        <div className="small text-muted">
                          - Client Name, Location
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact section*/}
        <section className="bg-light py-5">
          <div className="container px-5 my-5 px-5">
            <div className="text-center mb-5">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i className="bi bi-envelope" />
              </div>
              <h2 className="fw-bolder">Get in touch</h2>
              <p className="lead mb-0">We love you</p>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-6">
              </div>
            </div>
          </div>
        </section>
        {/* Footer*/}
        <footer className="py-5 bg-dark">
          <div className="container px-5">
            <p className="m-0 text-center text-white">SMALL QUÍZ</p>
          </div>
        </footer>
        <ToastContainer />
      </div>
    </>
  );
}
