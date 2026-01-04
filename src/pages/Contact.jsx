import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Swal from "sweetalert2";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for reaching out. We will get back to you soon.",
      confirmButtonColor: "#38bdf8",
      timer: 2000,
    });
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-base-content/60 max-w-2xl mx-auto font-medium">
            Have questions about StudyMate? We're here to help you find the
            perfect study partner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Contact Info */}
          <div className="space-y-8 p-8 bg-base-100 rounded-3xl shadow-xl border border-base-content/5">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold">Email Us</h4>
                <p className="text-sm opacity-70">rahmanrajdee@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold">Call Us</h4>
                <p className="text-sm opacity-70">+880 1867075117</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold">Our Location</h4>
                <p className="text-sm opacity-70">Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* A small "Office Hours" badge */}
            <div className="mt-8 p-4 bg-base-200 rounded-2xl border border-base-300">
              <p className="text-xs font-black uppercase opacity-40 mb-2">
                Office Hours
              </p>
              <p className="text-sm font-bold">Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-base-100 p-8 rounded-3xl shadow-xl border border-base-content/5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label text-xs font-black uppercase opacity-50">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered bg-base-200 focus:input-primary rounded-xl font-bold"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label text-xs font-black uppercase opacity-50">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered bg-base-200 focus:input-primary rounded-xl font-bold"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label text-xs font-black uppercase opacity-50">
                  Message
                </label>
                <textarea
                  className="textarea textarea-bordered bg-base-200 focus:textarea-primary rounded-xl font-bold h-32"
                  placeholder="How can we help?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block rounded-xl text-white shadow-lg shadow-primary/20 group"
              >
                Send Message
                <Send
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
