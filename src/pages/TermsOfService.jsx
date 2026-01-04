import React, { useState } from "react";
import { ShieldCheck, FileText, Lock, Scale, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const TermsOfService = () => {
  const [activeTab, setActiveTab] = useState("terms");

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-base-content mb-4 tracking-tight uppercase">
            Legal <span className="text-primary">Center</span>
          </h1>
          <p className="text-base-content/60 font-medium">
            Last Updated: January 2026
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="join bg-base-100 p-1 shadow-sm border border-base-300 rounded-2xl">
            <button
              onClick={() => setActiveTab("terms")}
              className={`join-item btn btn-md border-none ${
                activeTab === "terms"
                  ? "btn-primary rounded-xl"
                  : "btn-ghost rounded-xl"
              }`}
            >
              <Scale size={18} className="mr-2" /> Terms of Service
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`join-item btn btn-md border-none ${
                activeTab === "privacy"
                  ? "btn-primary rounded-xl"
                  : "btn-ghost rounded-xl"
              }`}
            >
              <ShieldCheck size={18} className="mr-2" /> Privacy Policy
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-base-100 rounded-[2.5rem] shadow-xl border border-base-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-8 md:p-12">
            {activeTab === "terms" ? (
              <div className="prose prose-slate max-w-none text-base-content">
                <h2 className="text-2xl font-black flex items-center gap-3 mb-6">
                  <FileText className="text-primary" /> 1. Acceptance of Terms
                </h2>
                <p className="opacity-70 mb-8 leading-relaxed">
                  By accessing StudyMate, you agree to be bound by these Terms
                  of Service. If you do not agree, please do not use our
                  platform. We provide a space for students to connect; however,
                  users are responsible for their own safety and conduct.
                </p>

                <h2 className="text-2xl font-black flex items-center gap-3 mb-6">
                  <Lock className="text-primary" /> 2. User Accounts
                </h2>
                <p className="opacity-70 mb-8 leading-relaxed">
                  When you create an account using Google or Email, you must
                  provide accurate information. You are responsible for
                  maintaining the security of your account and password.
                </p>

                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-2xl my-8">
                  <h3 className="font-bold text-primary mb-2 italic">
                    Prohibited Conduct:
                  </h3>
                  <ul className="list-disc list-inside opacity-70 space-y-2">
                    <li>Harassment of other study partners.</li>
                    <li>Posting plagiarized academic content.</li>
                    <li>Misrepresentation of your identity or skills.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="prose prose-slate max-w-none text-base-content">
                <h2 className="text-2xl font-black flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-primary" /> Data Collection
                </h2>
                <p className="opacity-70 mb-8 leading-relaxed">
                  We collect your <strong>Email</strong>,{" "}
                  <strong>Display Name</strong>, and <strong>Photo URL</strong>{" "}
                  through Firebase Authentication to create your profile and
                  facilitate study connections.
                </p>

                <h2 className="text-2xl font-black flex items-center gap-3 mb-6">
                  <ChevronRight className="text-primary" /> How We Use Data
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-base-200 rounded-2xl">
                    <p className="font-bold text-sm mb-1">Personalization</p>
                    <p className="text-xs opacity-60">
                      To show your name and avatar on your study profile.
                    </p>
                  </div>
                  <div className="p-4 bg-base-200 rounded-2xl">
                    <p className="font-bold text-sm mb-1">Connections</p>
                    <p className="text-xs opacity-60">
                      To allow partners to request study sessions with you.
                    </p>
                  </div>
                </div>

                <p className="opacity-70 italic text-sm border-t border-base-300 pt-6">
                  StudyMate does not sell your personal data to third parties.
                  All authentication is handled securely by Google Firebase.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Support */}
        <div className="text-center mt-12">
          <p className="text-base-content/50 text-sm">
            Questions about our policies?{" "}
            <Link
              to="/contact"
              className="text-primary font-bold hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
