import React from 'react';
import { Link } from 'react-router';

const RestSection = () => {
    return (
      <div>
        {/* 5. Features Section */}
        <section className="py-16 px-4 bg-base-200">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Why Choose StudyMate?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card bg-base-100 shadow-xl p-8">
                <div className="text-primary text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-semibold mb-3">Smart Matching</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Find partners based on subjects, location, and study style.
                </p>
              </div>
              <div className="card bg-base-100 shadow-xl p-8">
                <div className="text-primary text-5xl mb-4">💬</div>
                <h3 className="text-2xl font-semibold mb-3">Stay Connected</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Send requests and track your study connections easily.
                </p>
              </div>
              <div className="card bg-base-100 shadow-xl p-8">
                <div className="text-primary text-5xl mb-4">📈</div>
                <h3 className="text-2xl font-semibold mb-3">
                  Boost Productivity
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Study with accountability and motivation from real peers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Subject Categories */}
        <section className="py-16 px-4 bg-base-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Popular Study Subjects</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Mathematics",
                "Physics",
                "Chemistry",
                "Biology",
                "Computer Science",
                "English",
                "Web Development",
                "Accounting",
              ].map((subject) => (
                <div
                  key={subject}
                  className="badge badge-primary badge-lg py-4 px-6 text-lg font-medium"
                >
                  {subject}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Statistics */}
        <section className="py-20 px-4 bg-primary text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              StudyMate in Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-5xl font-bold">5000+</h3>
                <p className="text-xl mt-2">Active Students</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold">2000+</h3>
                <p className="text-xl mt-2">Study Matches</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold">50+</h3>
                <p className="text-xl mt-2">Subjects Covered</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold">98%</h3>
                <p className="text-xl mt-2">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Newsletter Signup */}
        <section className="py-16 px-4 bg-base-200">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
              Get study tips, new features, and partner recommendations in your
              inbox.
            </p>
            <div className="join max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered join-item w-full"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="py-16 px-4 bg-base-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-xl font-medium">
                  Is StudyMate free?
                </div>
                <div className="collapse-content">
                  <p>
                    Yes! Creating a profile and finding partners is completely
                    free.
                  </p>
                </div>
              </div>
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-xl font-medium">
                  How do I find a study partner?
                </div>
                <div className="collapse-content">
                  <p>
                    Go to "Find Partners", use filters, and send connection
                    requests!
                  </p>
                </div>
              </div>
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-xl font-medium">
                  Can I study offline?
                </div>
                <div className="collapse-content">
                  <p>Absolutely! Many partners meet in libraries or cafes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Final CTA */}
        <section className="py-20 px-4 bg-linear-to-r from-primary to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Ready to Find Your Study Buddy?
            </h2>
            <p className="text-xl mb-10">
              Join thousands of students achieving their goals together.
            </p>
            <Link to={"/find-partners"} className="btn btn-lg btn-primary">
              Get Started Now
            </Link>
          </div>
        </section>
      </div>
    );
};

export default RestSection;