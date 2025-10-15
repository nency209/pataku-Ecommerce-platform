"use client";
import { useState } from "react";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0 py-6">
      {/* Tabs */}
      <div className="flex bg-header justify-center ">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-6 py-2 text-base font-rubik font-light ${
            activeTab === "description" ? " text-black" : "text-muted"
          }`}
        >
          DESCRIPTION
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-6 py-2 text-base font-rubik font-light ${
            activeTab === "reviews" ? "  text-black" : "text-muted"
          }`}
        >
          REVIEWS
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`px-6 py-2 text-base font-rubik font-light ${
            activeTab === "comments" ? " text-black" : "text-muted"
          }`}
        >
          COMMENTS
        </button>
      </div>

      {/* Content */}
      <div className="pt-8 text-muted">
        {activeTab === "description" && (
          <div className="text-[15px] font-light font-rubik">
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>
            <br></br>
            <p>
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and
              1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
              reproduced in their exact original form, accompanied by English
              versions from the 1914 translation by H. Rackham.
            </p>
          </div>
        )}
        {activeTab === "reviews" && (
          <p className="text-[32px] font-bold font-lato text-black mb-2">
            Customer reviews
            <br></br>
            <span className="text-xs font-light font-lato  mb-2">
              Based on 2 reviews Write a review
            </span>
          </p>
        )}
        {activeTab === "comments" && (
          <p>
            John: Does this come in different sizes? <br />
            Sarah: I bought one last week, highly recommend! <br />
            Mike: Shipping was super fast 🚚
          </p>
        )}
      </div>
    </div>
  );
}
